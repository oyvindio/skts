#!/bin/bash
# Creates a XPI from the files in $SRC_DIR.
# Dependencies: bash, rm, sed, grep, zip

NAME="single_key_tab_switch"
SRC_DIR="src"
VERSION=$(grep em:version "$SRC_DIR"/install.rdf | sed -e 's/<[^>]*>//g')
VERSION=${VERSION// /} # trim whitespace

# remove old xpi if it exists
if [ -f "$NAME-$VERSION-fx.xpi" ]
then
    rm -vf "$NAME-$VERSION-fx.xpi"
fi

# create new xpi
if [ -d "$SRC_DIR" ]
then
    pushd $SRC_DIR

    # this is just to keep track of when the xpi was packaged
    pack_date=$(date +%Y%m%d%H%M%S)
    touch packaged-"$pack_date"

    zip -r ../"$NAME-$VERSION-fx.xpi" ./*

    rm -vf packaged-"$pack_date"

    popd
else
    echo "$SRC_DIR not found, exiting."
fi
