#! /bin/sh
STATICDIR=var/static
URL=http://127.0.0.1:8080/

rm -rf  var/static/*
wget -r -k -p -np -nH -U 'sandstormpublish' -P $STATICDIR $URL 
find $STATICDIR -name '*\?*' -print0 | xargs -0 -n1 bash -c 'echo "moving $0 to ${0%\?*}";mv "$0" "${0%\?*}"'

