#! /bin/sh
STATICDIR=/var/www
TMPDIR=/var/www_`date +%s%N`
URL=http://127.0.0.1:8080/
REPLACE_URL=http://this-will-be-replaced-by-sandstorm.com

rm -rf $TMPDIR
wget -r -p -np -nH -U 'sandstormpublish' -P $TMPDIR $URL > /dev/null 2>&1
find $TMPDIR -name '*\?*' -print0 | xargs -0 -n1 bash -c 'mv "$0" "${0%\?*}"'
find $TMPDIR -type f -exec sed -i "s|${REPLACE_URL}/|/|g" {} \;
find $TMPDIR -type f -exec sed -i "s|${REPLACE_URL}|/|g" {} \; # URLs without a trailing / need to be changed to point the index

# manually copy images
rm -rf $TMPDIR/content/images
mkdir -p $TMPDIR/content/
cp -r /var/ghostcms/content/images $TMPDIR/content/

mv $STATICDIR ${STATICDIR}_tmp
mv $TMPDIR $STATICDIR
rm -rf ${STATICDIR}_tmp
