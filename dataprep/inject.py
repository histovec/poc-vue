#! /usr/bin/env python3

import base64
import csv
import gzip
import hashlib
import os
from argparse import ArgumentParser
from enum import Enum

import elasticsearch.helpers as esh
from elasticsearch import Elasticsearch

SWIFT_CONTAINER = "histovec-data"

CSV_FIELDS = ["idv", "ida1", "ida2", "v"]
MANIFEST_EXTENSION = "md5"

ES_HOST = "localhost:9200"
ES_NUM_JOBS = 4
ES_CHUNK_SIZE = 5000
ES_TYPE = "siv"

DeleteMode = Enum('DeleteMode', 'DELETE_AFTER KEEP_FILES')


def download_manifest(name, swift_conn, cache_dir=None):
    """
    Download the given manifest file and return it as an iterable over chunk_specs.
    Store the file if cache_dir is provided.
    """
    resp_headers, obj_contents = swift_conn.get_object(SWIFT_CONTAINER, name)
    if cache_dir:
        with open(os.path.join(cache_dir, name), 'w') as local:
            local.write(obj_contents)
    return csv.DictReader(obj_contents, fieldnames=["size", "md5_sum", "name"], delimiter=' ')


def check_chunk_obj(chunk, chunk_spec):
    """Check the given chunk object w.r.t. the given spec"""
    return len(chunk) == chunk_spec['size'] and hashlib.md5(chunk).hexdigest() == chunk_spec['md5_sum']


def check_file(chunk_spec, cache_dir):
    """Check the cached chunk file designated by the given spec"""
    file_path = os.path.join(cache_dir, chunk_spec['name'])

    # Check presence and size
    if not os.path.isfile(file_path) or os.path.getsize(file_path) != chunk_spec['size']:
        return False

    # Check MD5 sum
    md5_obj = hashlib.md5()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(65536)  # Arbitrary
            if not data:
                break
            md5_obj.update(data)
    return md5_obj.hexdigest() == chunk_spec['md5_sum']


def download_chunk(chunk_spec, swift_conn, cache_dir=None):
    resp_headers, obj_contents = swift_conn.get_object(SWIFT_CONTAINER, chunk_spec['name'])
    if not check_chunk_obj(obj_contents, chunk_spec):
        raise RuntimeError("Downloaded corrupt chunk " + chunk_spec['name'])
    if cache_dir:
        with open(os.path.join(cache_dir, chunk_spec['name']), 'w') as local:
            local.write(obj_contents)
    return csv.DictReader(obj_contents, fieldnames=CSV_FIELDS, delimiter=';', quotechar='"')


def es_action_of_csv_row(op_type, index, row):
    return {
        '_op_type': op_type,
        '_index': index,
        '_type': ES_TYPE,
        '_id': base64.b64encode(hashlib.sha256(row['idv']).digest())[:20],
        'doc': row
    }


def inject_rows(rows, op_type, index, es):
    actions = (es_action_of_csv_row(op_type, index, row) for row in rows)
    # esh.parallel_bulk(es, actions, thread_count=ES_NUM_JOBS, chunk_size=ES_CHUNK_SIZE)
    esh.bulk(es, actions, chunk_size=ES_CHUNK_SIZE)


def inject_file(file, op_type, index, es):
    with gzip.open(file) as csv_file:
        rows = csv.DictReader(csv_file, fieldnames=CSV_FIELDS, delimiter=';', quotechar='"')
        inject_rows(rows, op_type, index, es)


def get_and_inject_chunk(chunk_spec, op_type, index, swift_conn, es, cache_dir=None):
    if cache_dir and check_file(chunk_spec, cache_dir):
        inject_file(os.path.join(cache_dir, chunk_spec['name']), op_type, index, es)
    else:
        rows = download_chunk(chunk_spec, swift_conn, cache_dir)
        inject_rows(rows, op_type, index, es)


def index_direct_load(manifest_name, cache_dir=None):
    es.indices.create(index='siv', body=...)
    chunk_specs = download_manifest(manifest_name, swift_conn, cache_dir)
    es = Elasticsearch(ES_HOST)


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('actions', metavar='ACTION', type=str, nargs='+',
                        help='An action to perform')
    # parser.add_argument("--api", type=str, default="all",
    #                     help="siv or ivt or all")
    parser.add_argument("--keep-files", action="store_true",
                        help="Don't delete files after injecting")
    parser.add_argument("--manifest", type=str,
                        help="Name of the manifest file")
    parser.add_argument("--work-dir", type=str, default=".",
                        help="Where to store downloaded files. Empty string not to store.")

    args = parser.parse_args()

    if args.keep_files and not args.work_dir:
        raise RuntimeError("Cannot --keep-files without a --work-dir")

    return args


def perform_action(action, args):
    if action == "index-direct-load":
        #        apis = ['ivt', 'siv'] if args.api == "all" else [args.api]
        cache_dir = os.path.join(args.work_dir, args.manifest.rstrip("." + MANIFEST_EXTENSION))
        index_direct_load(args.manifest, cache_dir)

    else:
        raise RuntimeError("Unknown action " + action)


def main():
    args = parse_args()
    for action in args.actions:
        perform_action(action, args)


if __name__ == "__main__":
    main()
