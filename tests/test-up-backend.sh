#!/bin/bash
#
# test de fonctionnement backend
#
set -e

basename=$(basename $0)
echo "# Start test: $basename ${APP} ${APP_VERSION}"

ret=0
container_name=backend-production

if [ -z "${APP}" -o -z "${APP_VERSION}" -o -e "${BACKEND_PORT}" ]; then
 test_result=1
else
 test_result=0
fi
if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: variable manquante: APP|APP_VERSION"
  ret=$test_result
  exit $ret
fi

# tty or not
test -t 1 && USE_TTY="-t"

# test _cluster/health
echo "# backend health"
docker exec -i ${USE_TTY} ${APP}-$container_name /bin/bash -c "curl -s --fail -XGET localhost:${BACKEND_PORT}/${APP}/api/v1/health" | jq -e 'if .status then .status=="ok" else false end'
test_result=$?
if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: backend en erreur"
  ret=$test_result
  exit $ret
fi

set -e
echo "# End test: $basename ${APP} ${APP_VERSION} status($ret)"
exit $ret
