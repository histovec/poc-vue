#!/bin/bash
#
# configuration nginx
#
set -e
[ -z "${APP}" -o -z "${dataset}" -o -z "${ES_HOST}" ] && exit 1
(
 cat /etc/nginx/conf.d/default.template | \
 sed "s/<APP>/${APP}/g;s/<dataset>/${dataset}/g;s/<ES_HOST>/${ES_HOST}/g;" | \
 sed "/^server {/a\
error_log /dev/stderr warn;\
access_log /dev/stdout main;
" > /etc/nginx/conf.d/default.conf
) && nginx -g "daemon off;"
