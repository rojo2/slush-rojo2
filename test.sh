#!/bin/bash

# Create slush-rojo2.tgz
./tar.sh

# Install slush-rojo2.tgz
./install.sh

# Create "test" directory if doesn't exists
if [ ! -d "test" ]; then
  mkdir "test"
fi

# check if slush exists, if not
# then install slush globally and also
# install slush-rojo2
which slush
if [ $? != 0 ]; then
  npm install -g -f slush
fi

# enter in "test" directory
cd "test"

# remove everything from "test" directory
rm -rf *

# This answers the questions from slush
# automaticly
slush rojo2 <<< "test





"

# run build script
npm run build
