#!/bin/bash
#
# test de fonctionnement elasticsearch
#
set -e

basename=$(basename $0)
echo "# Start test: $basename ${APP} ${APP_VERSION}"

ret=0
container_name=elasticsearch

if [ -z "${APP}" -o -z "${APP_VERSION}" -o -z "$dataset" ]; then
 test_result=1
else
 test_result=0
fi
if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: variable manquante: APP|APP_VERSION|dataset"
  ret=$test_result
  exit $ret
fi

# tty or not
test -t 1 && USE_TTY="-t"

# test elasticsearch up and running (status different de red)
echo "# Wait ${APP}-$container_name up"
set +e
timeout=120;
test_result=1
until [ "$timeout" -le 0 -o "$test_result" -eq "0" ] ; do
  docker exec -i ${USE_TTY} ${APP}-$container_name /bin/bash -c "curl -s --fail -XGET localhost:9200/_cluster/health" || echo '{}' | jq -e 'if .status then .status!="red" else false end'
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

# test _cluster/health
echo "# elasticsearch _cluster/health"
docker exec -i ${USE_TTY} ${APP}-$container_name /bin/bash -c "curl -s --fail -XGET localhost:9200/_cluster/health" || echo '{}' | jq -e 'if .status then .status!="red" else false end'
test_result=$?
if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: cluster en erreur"
  ret=$test_result
  exit $ret
fi

# test _cat/allocation disk
echo "# elasticsearch disk _cat/allocation"
test_output=$(docker exec -i ${USE_TTY} ${APP}-$container_name /bin/bash -c 'curl -s --fail -XGET "localhost:9200/_cat/allocation"')
test_result=$?
echo "$test_output"

if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: aucun disk alloue"
  ret=$test_result
  exit $ret
fi

# ERROR si  disk.percent > 85%
echo "$test_output" | awk ' $6 { printf("%s\n",$6) } ' |  awk ' BEGIN { ret=0 }  { if ($1 > 85) { print "ERROR: "$1"%" ; ret=1 ; } else { print "OK: "$1"%" } } END {  exit ret  } '
test_result=$?
if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: disk.percent > 85%"
  ret=$test_result
fi

# test _cat/indices == 1
echo "# elasticsearch _cat/indices"
test_output=$(docker exec -i ${USE_TTY} ${APP}-$container_name /bin/bash -c 'curl -s --fail -XGET "localhost:9200/_cat/indices"')
test_result=$?
if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: _cat/indice"
  echo "ERROR: $test_output"
  ret=$test_result
fi
echo "$test_output"

echo "# elasticsearch _cat/indices == 1"
# test nb indice == 1
nb_indice=$(echo "$test_output" | wc -l)

if [ "$nb_indice" -ne "1" ] ; then
  echo "ERROR: nombre d'indices ($nb_indice) different de 1"
  ret=-1
fi
echo "$test_output"

# test _cat/indices not red
echo "# elasticsearch indices not red"
set +e
timeout=120;
test_result=1
until [ "$timeout" -le 0 -o "$test_result" -eq "0" ] ; do
  if ! (docker exec -i ${USE_TTY} ${APP}-$container_name /bin/bash -c 'curl -s --fail -XGET "localhost:9200/_cat/indices"' | grep "^red" ) ; then
      test_result=0
  fi
  echo "Wait $timeout seconds: /_cat/indices not 'red' $test_result";
  (( timeout-- ))
  sleep 1
done
if [ "$test_result" -gt "0" ] ; then
  ret=$test_result
  echo "ERROR: ${APP}-$container_name en erreur"
  exit $ret
fi

# verification indice en read_only_allow_delete
echo "# elasticsearch indice en read_only_allow_delete ?"
list_indice="$dataset"
test_result=0
for indice in $list_indice ; do
  if ( docker exec -i ${USE_TTY} ${APP}-$container_name curl -s --fail -XGET localhost:9200/$indice | jq -e '.error' || \
       docker exec -i ${USE_TTY} ${APP}-$container_name curl -s --fail -XGET localhost:9200/$indice | jq -e '.'$indice'.settings.index.blocks.read_only_allow_delete!=null' ) ; then
    (( test_result++ ))
     echo "ERROR: $indice en read_only_allow_delete"
  else
    echo "OK: indice $indice"
  fi
done
if [ "$test_result" -gt "0" ] ; then
  echo "ERROR: $test_result indice(s) est en read_only_allow_delete"
  ret=$test_result
fi

set -e
echo "# End test: $basename ${APP} ${APP_VERSION} status($ret)"
exit $ret
