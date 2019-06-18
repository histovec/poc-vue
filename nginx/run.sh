#!/bin/bash
#
# configuration nginx
#
#
set -e

SED_REPLACE=`env | sed -e 's#\([^=]*\)=\(.*\)\s*$#s\#<\1>\#\2\#g;#'| tr '\n' ' ' | sed 's/$/\n/'`

[ -z "${APP}" -o -z "${ES_INDEX}" -o -z "${ES_HOST}" -o -z "${ES_PORT}" -o -z "${BACKEND_HOST}" -o -z "${BACKEND_HOST}" -o -z "${API_USER_BURST}" -o -z "${API_GLOBAL_BURST}" \
  -o -z "${API_GLOBAL_LIMIT_RATE}" -o -z "${API_USER_LIMIT_RATE}" -o -z "${API_USER_SCOPE}" \
  -o -z "${API_WRITE_LIMIT_RATE}" -o -z "${API_WRITE_BURST}" ] && exit 1

(
 cat /etc/nginx/conf.d/default.template | \
 sed "${SED_REPLACE}" | \
 sed "/^server {/a\
error_log /dev/stderr warn;\
access_log /dev/stdout main;
" > /etc/nginx/conf.d/default.conf
sed "${SED_REPLACE}" < /etc/nginx/nginx.template > /etc/nginx/nginx.conf
) && nginx -g "daemon off;"
