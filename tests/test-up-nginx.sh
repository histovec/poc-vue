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
set +e
timeout=120;
test_result=1
dirname=$(dirname $0)
docker cp $dirname/fake-curl.sh ${APP}-$container_name:/tmp/
until [ "$timeout" -le 0 -o "$test_result" -eq "0" ] ; do
  docker exec -i ${USE_TTY} ${APP}-$container_name /bin/bash /tmp/fake-curl.sh /histovec/home | grep '<!DOCTYPE html>'
  test_result=$?
  echo "Wait $timeout seconds: ${APP}-$container_name up $test_result";
  (( timeout-- ))
  sleep 1
done
if [ "$test_result" -gt "0" ] ; then
  ret=$test_result
  echo "ERROR: ${APP}-$container_name en erreur"
  exit $ret
fi


exit $ret
