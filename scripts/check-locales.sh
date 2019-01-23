#! /bin/bash

cmp <(jq 'path(..)|[.[]|tostring]|join(".")' src/locales/en.json) <(jq 'path(..)|[[.[]| select(length > 0)]  |tostring]|join(".")' src/locales/fr.json)
