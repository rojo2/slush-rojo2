#!/bin/bash

# This script
if [ ! -d "test" ]; then
  mkdir "test"
fi

which slush
if [ $? != 0 ]; then
  npm install -g -f slush slush-rojo2
fi

cd "test"
rm -rf *
slush rojo2 <<< "test





"
npm run build
