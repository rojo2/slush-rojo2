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
npm install -g -f slush
npm install -g -f slush-rojo2

# enter in "test" directory
cd "test"

# remove everything from "test" directory
rm -rf *

# execute slush.
slush rojo2 <<< "test





"

# run build script
npm run build
