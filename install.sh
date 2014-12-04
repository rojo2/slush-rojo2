#!/bin/bash
input="slush-rojo2.tgz"

if [ ! -f $input ]; then
  ./tar.sh
elif [ "$1" = "force" ]; then
  ./tar.sh
fi

printf "Installing \e[1;95mslush-rojo2.tgz\e[0m\n"
npm install -f -g $input
if [ $? -ne 0 ]; then
  printf "There was some errors installing \e[1;95mslush-rojo2.tgz\e[0m\n"
fi
