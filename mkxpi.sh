#!/bin/bash
XPI="skts.xpi"
SRC_DIR="src"

# delete old xpi
if [ -f "$XPI" ]
then
    rm -vf "$XPI"
fi

# create new xpi
if [ -d "$SRC_DIR" ]
then
    pushd src

    pack_date=$(date +%Y%m%d%H%M%S)
    touch packaged-"$pack_date"

    zip -r ../"$XPI" ./*

    rm -vf packaged-"$pack_date"

    popd
else
    echo "$SRC_DIR not found, exiting."
fi
