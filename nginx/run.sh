#!/bin/bash
#
# configuration nginx
#
set -e
[ -z "${APP}" -o -z "${dataset}" -o -z "${ES_HOST}" -o -z "${API_USER_BURST}" -o -z "${API_GLOBAL_BURST}" \
  -o -z "${API_GLOBAL_LIMIT_RATE}" -o -z "${API_USER_LIMIT_RATE}" -o -z "${API_USER_SCOPE}" ] && exit 1
(
 cat /etc/nginx/conf.d/default.template | \
 sed "s/<APP>/${APP}/g;s/<dataset>/${dataset}/g;s/<ES_HOST>/${ES_HOST}/g;s|<API_USER_BURST>|${API_USER_BURST}|g;s|<API_GLOBAL_BURST>|${API_GLOBAL_BURST}|g;" | \
 sed "/^server {/a\
error_log /dev/stderr warn;\
access_log /dev/stdout main;
" > /etc/nginx/conf.d/default.conf
sed "s|<API_GLOBAL_LIMIT_RATE>|${API_GLOBAL_LIMIT_RATE}|;s|<API_USER_LIMIT_RATE>|${API_USER_LIMIT_RATE}|g;s|<API_USER_SCOPE>|${API_USER_SCOPE}|g" < /etc/nginx/nginx.template > /etc/nginx/nginx.conf
) && nginx -g "daemon off;"
