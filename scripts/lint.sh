#!/usr/bin/env bash
PATH="./node_modules/.bin:$PATH"

./node_modules/.bin/standard "**/*.js" "**/*.jsx"
