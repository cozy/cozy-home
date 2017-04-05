#!/usr/bin/env bash
PATH="./node_modules/.bin:$PATH"

mocha \
    --reporter spec \
    --colors \
    --globals clearImmediate,setImmediate \
    --compilers coffee:coffee-script/register \
    tests
