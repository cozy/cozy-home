#!/bin/bash
#
# Builds the production bundle of Home (build/) that start.sh installs in the instances, from
# the working tree, in a Node container: the Node and Yarn of the host are not used. The backend
# images are pulled by start.sh.
#
#   scripts/qa-environment/build.sh    # once, and whenever the code under test changes
#
# Yarn keeps its cache and corepack its Yarn under .yarn/, next to node_modules.
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
NODE_IMAGE="node:$(cat "$REPO_DIR/.nvmrc")"

node() {
  docker run --rm --network host -u "$(id -u):$(id -g)" \
    -v "$REPO_DIR:$REPO_DIR" -w "$REPO_DIR" \
    -e HOME=/tmp \
    -e COREPACK_HOME="$REPO_DIR/.yarn/corepack" \
    -e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    -e YARN_ENABLE_GLOBAL_CACHE=false \
    "$NODE_IMAGE" "$@"
}

node corepack yarn install --immutable
node corepack yarn build
