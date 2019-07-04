#! /bin/bash

errormessage=`cmp <(jq 'path(..)|map(tostring)|join(".")' src/locales/en.json) <(jq 'path(..)|map(select(length > 0)|tostring)|join(".")' src/locales/fr.json) 2>&1`

if [ ! -z "$errormessage" ]; then
  echo "Locales en and fr mismatch: $errormessage"
  exit 1
fi
