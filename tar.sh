#!/bin/bash
input="slush-rojo2"
output="${input}.tgz"

# go one level up
cd ..

printf "We're creating your tarball, please, be patient\n"

# create the tarball
tar -cvzf $output $input >/dev/null 2>&1

# save the output
result=$?
if [ $result -eq 0 ]; then
  mv $output "${input}/"
  printf "\e[1;95m${output}\e[0m was created successfully!\n"
fi

# return to the original folder
cd $input
