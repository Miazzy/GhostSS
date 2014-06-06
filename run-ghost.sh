#!/bin/bash

if ! test -e var/ghostcms; then
    mkdir -p var/ghostcms
    mkdir -p var/static

    cp -R content var/ghostcms
    rm -rf var/ghostcms/content/themes
    ln -s /themes var/ghostcms/content/themes
    cp dbseed/*.db  var/ghostcms/content/data
fi

node index
