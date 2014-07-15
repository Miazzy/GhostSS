#!/bin/bash

test -e var/ghostcms || mkdir -p var/ghostcms
mkdir -p var/www

test -e var/ghostcms/content || cp -R content var/ghostcms
rm -rf var/ghostcms/content/themes
ln -s /themes var/ghostcms/content/themes
test -e var/ghostcms/content/data/ghost-dev.db || cp dbseed/ghost-dev.db  var/ghostcms/content/data

node index
