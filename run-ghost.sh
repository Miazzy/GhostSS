#!/bin/bash

test -e var/ghostcms || mkdir -p var/ghostcms
mkdir -p var/www
test -e /var/www/index.html || cat > /var/www/index.html <<__EOF__
<html><body>
<p>This Ghost site has been set up successfully, but no content has
been published. Please wait while it is being generated. </p>
</body></html>
__EOF__

test -e var/ghostcms/content || cp -R content var/ghostcms
test -L var/ghostcms/content/themes && rm -rf var/ghostcms/content/themes
mkdir -p var/ghostcms/content/themes
ln -s /themes/* var/ghostcms/content/themes
test -e var/ghostcms/content/data/ghost-dev.db || cp dbseed/ghost-dev.db  var/ghostcms/content/data

rm -rf /var/www_*

bash -c 'sleep 10; /publish-it.sh' &
node index
