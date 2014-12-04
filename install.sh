#!/bin/bash
input="slush-rojo2.tgz"

if [ ! -f $input ]; then
  `./tar.sh`
fi

npm install -f -g $input
