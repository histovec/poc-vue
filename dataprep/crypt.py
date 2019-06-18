# -*- coding: utf-8 -*-

import base64
from Crypto import Random
from Crypto.Cipher import XOR
from Crypto.Cipher import AES
import hashlib
import logging
from multiprocessing import Pool
import sys, os, re
import traceback
import struct
from datetime import datetime
from dateutil.relativedelta import relativedelta
import pandas as pd
import numpy as np

# Config
SEP=';'
AES_BLOCK_SIZE = 16
CHUNK_SIZE = 20000         # size of each chunk
MAX_INPUT_ROWS = None      # number of lines to process in the recipe, None if no limit
#VERBOSECHUNKSIZE = 10000   # display log every VERBOSECHUNKSIZE line
NUM_THREADS = 2            # number of parallel threads
CRYPT_OPT_DATENAISSANCE=True
CRYPT_OPT_STRONGCODE=False
CRYPT_OPT_CODE=False

COMMON_TRANSFER_SCHEMA = [
    {'name': 'ida1', 'type': 'string'},
    {'name': 'ida2', 'type': 'string'},
    {'name': 'v', 'type': 'string'}
]

TRANSFER_COLUMNS = [c['name'] for c in COMMON_TRANSFER_SCHEMA]

_test_encrypt_decrypt = False


def pad(s):
    """Return a copy of the given string padded with between 1 and `AES_BLOCK_SIZE` characters to make its length a multiple of `AES_BLOCK_SIZE`"""
    padding_length = AES_BLOCK_SIZE - len(s) % AES_BLOCK_SIZE
    return s + padding_length * chr(padding_length).encode('utf8')


def unpad(s):
    """Return a copy of the given string with its padding removed"""
    string = s.decode('utf8')
    padding_length = ord(string[-1])
    return string[0:-padding_length]


def encrypt_string(key, string):
    padded = pad(string.encode('utf8'))
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return (base64.urlsafe_b64encode(iv + cipher.encrypt(padded))).decode('utf8')


def decrypt_string(key, string):
    enc = base64.urlsafe_b64decode(string)
    iv = enc[:16]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(enc[16:]))


def encrypt_df(df):
    """Encrypt the given dataframe in-place"""
    global _test_encrypt_decrypt

    month = datetime.today().strftime('%Y%m')
    prev_month = (datetime.today() - relativedelta(months=1)).strftime('%Y%m')

    df.fillna("", inplace=True)

    df['id_personne'] = df['pers_raison_soc_tit'] + df['pers_siren_tit'] + df['pers_nom_naissance_tit']
    if ('pers_prenom_tit' in list(df)):
        df['id_personne'] = df['id_personne'] + (df['pers_prenom_tit']) #SIV
    if (('pers_date_naissance_tit' in list(df)) and (CRYPT_OPT_DATENAISSANCE)):
        df['id_personne'] = df['id_personne'] + (df['pers_date_naissance_tit'] )
    df['id_vehicle'] = df['plaq_immat']
    if ('numero_formule' in list(df)):
        df['id_vehicle'] = df['id_vehicle'] + df['numero_formule'] #SIV
    else:
        df['id_vehicle'] = df['id_vehicle'] + df['date_emission_ci'] #FNI

    df['idv'] = df['id_personne'] + df['id_vehicle']
    df['ida'] = df['idv'] if CRYPT_OPT_STRONGCODE else df['id_vehicle']
    df['key'] = df['id_vehicle']


    for col in ['idv', 'ida', 'key']:
        df[col]=df[col].str.lower()
        df[col]=df[col].str.replace(r'\W', '')

    df['idv']=df['idv'].apply(lambda x: base64.urlsafe_b64encode(hashlib.sha256((x).encode('utf8','ignore')).digest()).decode('utf8'))
    df['ida1']=df['ida'].apply(lambda x: base64.urlsafe_b64encode(hashlib.sha256((x+month).encode('utf8','ignore')).digest()).decode('utf8'))
    df['ida2']=df['ida'].apply(lambda x: base64.urlsafe_b64encode(hashlib.sha256((x+prev_month).encode('utf8','ignore')).digest()).decode('utf8'))
    df['key']=df['key'].apply(lambda x: hashlib.sha256(x.encode('utf8')).digest())


    if _test_encrypt_decrypt:
        df['v_orig']=df['v']

    df['v']=df.apply(lambda row: encrypt_string(row['key'], row['v']), axis=1)

    if _test_encrypt_decrypt:
#    df['v_crypt']=df.apply(lambda row: encrypt_string(row['hash2'],row['v']), axis=1)
        df['v_decrypt']=df.apply(lambda row: decrypt_string(row['key'],row['v']), axis=1)
        df['v_test']=df.apply(lambda row: (row['v_decrypt'] == row['v_orig']), axis=1)

    df['key']=df['key'].apply(lambda x: base64.b64encode(x).decode('utf8'))

    if CRYPT_OPT_CODE:
        df = df[['ida1', 'ida2', 'v']]
    else:
        df = df[['idv', 'ida1', 'ida2', 'v']]

    return df

def chunk_row_range(chunk_index):
    """Return the index of the first and (maximum) last row of the chunk with the given index, in a string"""
    return "%d-%d" % (chunk_index * CHUNK_SIZE + 1, (chunk_index + 1) * CHUNK_SIZE)


def process_chunk(arg):
    """Encrypt the given chunk in-place and return it (for use with Pool.imap_unordered)"""
    i, df = arg

    try:
        encrypt_df(df)
#        if last_row_index % VERBOSECHUNKSIZE == 0:
        print("chunk {} encrypted".format(chunk_row_range(i)))
    except:
        logging.warning("chunk {} failed:".format(chunk_row_range(i)))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        traceback.print_exception(exc_type, exc_obj, exc_tb)

    # Return i and df for writing to the output dataset
    return i, df


def encrypt_file(input_file, output_file, output_schema=COMMON_TRANSFER_SCHEMA, test_encrypt_decrypt=False):
    global _test_encrypt_decrypt
    _test_encrypt_decrypt = test_encrypt_decrypt

    # Write output schema
    if test_encrypt_decrypt:
        output_schema += [
            {'name': 'v_orig', 'type': 'string'},
            {'name': 'v_decrypt', 'type': 'string'},
            {'name': 'v_test', 'type': 'string'}
        ]

    # Read input dataset as a number of fixed-size dataframes
    chunks = pd.read_csv(input_file, sep=SEP, iterator=True, chunksize=CHUNK_SIZE, encoding='utf8', dtype={'pers_siren_tit': object})

    # Encrypt
    df_list=[encrypt_df(df) for df in chunks]
    # print(df_list)
    output_ds=pd.concat(df_list)
    # print(output_ds)
    output_ds.to_csv(output_file, sep=SEP, compression='gzip', index=False, header=False)

def encrypt_plaq(key, plaintext):
      cipher = XOR.new(key)
      return base64.b64encode(cipher.encrypt(plaintext))

def decrypt_plaq(key, ciphertext):
      cipher = XOR.new(key)
      return cipher.decrypt(base64.b64decode(ciphertext))


if __name__ == '__main__':
    input_dir=sys.argv[1]
    output_dir=sys.argv[2]
    for file in [f for f in os.listdir(input_dir) if re.match(r'.*csv.gz$', f)]:
        print(file)
        encrypt_file(os.path.join(input_dir, file), os.path.join(output_dir, file) )
