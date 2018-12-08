#!/bin/bash
set -e
exec 3<>/dev/tcp/localhost/80
echo "GET $1" 1>&3
response="$(cat <&3)"
echo "$response"
