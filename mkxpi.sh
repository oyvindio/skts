#!/bin/bash
# Creates a XPI from the files in $SRC_DIR.
# Dependencies: bash, rm, sed, grep, zip

shopt -s extglob 

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

    zip -r ../"$NAME-$VERSION-fx.xpi" !(*.swp|*~|.#*)

    popd
else
    echo "$SRC_DIR not found, exiting."
fi
