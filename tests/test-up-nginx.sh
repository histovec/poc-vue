#!/bin/bash
#
# test de fonctionnement nginx
#
set -e

basename=$(basename $0)
echo "# $basename ${APP} ${APP_VERSION}"

ret=0
container_name=nginx

echo "# Wait ${APP}-$container_name up"
exit $ret
