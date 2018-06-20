#!/bin/bash
# This script is used to start the release process. It creates
# a PR containing a checklist that you can follow to successfully
# release Banks web/ios/android.

set -e

echo "Starting the release process..."

current_version=$(cat package.json | jq -rc '.version')
echo "Current version is ${current_version}"
read -p "What is the next version ? " version

branch_name="release-${version}"
echo "Checking out to $branch_name"
git checkout -b $branch_name
git commit --allow-empty -m "chore: starting release ${version}"
git push -u origin HEAD

release_pr_template="./scripts/release-pr-template.txt"
which hub > /dev/null
if [[ $? -ne 0 ]]; then
    echo "You do not have hub, please create the PR manually on GitHub from the PR template"
    echo "$release_pr_template"
else
    echo "Creating PR"
    versioned_release_template="/tmp/release-pr-template"
    cat scripts/release-pr-template.txt | sed "s/\$VERSION/${version}/" > "${versioned_release_template}"
    hub pull-request -F "$versioned_release_template"
    echo "Nice, you can follow the checklist on the PR now"
fi

