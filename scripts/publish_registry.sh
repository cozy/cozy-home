#!/bin/bash
set -e

# Environnment variables:
#   COZY_APP_VERSION: the version string of the deployed version
#   COZY_APP_SLUG: the slug string of the deployed application
#   COZY_BUILD_URL: the URL of the deployed tarball for your application
#   COZY_BUILD_BRANCH: the name of the build branch from which the script
#                      creates dev releases

[ -z "${COZY_BUILD_BRANCH}" ] && COZY_BUILD_BRANCH="build"
[ -z "${REGISTRY_EDITOR}" ] && REGISTRY_EDITOR="Cozy"

# don't publish on pull requests
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    echo "No deployment: in pull-request"
    exit 0
fi

# Run this publishing script only on CI from the build branch
# and at each update of this branch
if [ "${TRAVIS_BRANCH}" != "${COZY_BUILD_BRANCH}" ]; then
    printf 'No deployment: not in %s branch (TRAVIS_BRANCH=%s TRAVIS_TAG=%s)\n' "${COZY_BUILD_BRANCH}" "${TRAVIS_BRANCH}" "${TRAVIS_TAG}"
    exit 0
fi

# find app manifest
manfile=$(find "${TRAVIS_BUILD_DIR}" \( -name "manifest.webapp" -o -name "manifest.konnector" \) | head -n1)

# if git tag, version = tag, else, version = versionFromManifest-dev.sha256
if [ -z "${COZY_APP_VERSION}" ]; then
    if [ -n "${TRAVIS_TAG}" ]; then
        COZY_APP_VERSION="${TRAVIS_TAG}"
    else
        COZY_APP_VERSION="$(jq -r '.version' < "${manfile}")-dev.${TRAVIS_COMMIT}"
    fi
fi

# get app slug from the manifest
if [ -z "${COZY_APP_SLUG}" ]; then
    COZY_APP_SLUG="$(jq -r '.slug' < "${manfile}")"
fi

# if git tag, get archive url from the tag,
# else, get archive url from the the commit hash
if [ -z "${COZY_BUILD_URL}" ]; then
    url="https://github.com/${TRAVIS_REPO_SLUG}/archive"
    if [ -n "${TRAVIS_TAG}" ]; then
        COZY_BUILD_URL="${url}/${TRAVIS_TAG}.tar.gz"
    else
        COZY_BUILD_URL="${url}/${TRAVIS_COMMIT}.tar.gz"
    fi
fi

# get the sha256 hash from the archive from the url
shasum=$(curl -sSL --fail "${COZY_BUILD_URL}" | shasum -a 256 | cut -d" " -f1)

printf 'Publishing version "%s" from "%s" (%s)\n' "${COZY_APP_VERSION}" "${COZY_BUILD_URL}" "${shasum}"

# publish the application
curl -sS --fail -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Token ${REGISTRY_TOKEN}" \
    -d "{\"editor\": \"${REGISTRY_EDITOR}\", \"version\": \"${COZY_APP_VERSION}\", \"url\": \"${COZY_BUILD_URL}\", \"sha256\": \"${shasum}\", \"type\": \"webapp\"}" \
    "https://int-registry.cozycloud.cc/registry/${COZY_APP_SLUG}"
