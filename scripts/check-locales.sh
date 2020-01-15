#! /bin/bash

en_paths=$(mktemp "/tmp/check-locales-XXX")
fr_paths=$(mktemp "/tmp/check-locales-XXX")

echo "Comparing locales for differences"
jq '[path(..)|map(tostring)|join(".")]|sort' src/locales/en.json > $en_paths
jq '[path(..)|map(tostring)|join(".")]|sort' src/locales/fr.json > $fr_paths

git diff -- $en_paths $fr_paths
diff_status=$?

rm -f $en_paths $fr_paths

if [[ $diff_status != 0 ]]; then
  echo "Locales en and fr mismatch, see diff above"
  exit 1
else
  echo "Locales have the same keys, everything OK"
fi
