#!/bin/bash
#
# Stops the QA environment started by start.sh and drops its data: the Stack keeps the files
# inside its container, CouchDB in its container too.
#
#   scripts/qa-environment/stop.sh
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

QA_PROJECT="${QA_PROJECT:-cozy-home-qa}"

# compose interpolates the whole file even to stop it
export QA_STACK_PORT=1 QA_MAIL_PORT=1
docker compose -p "$QA_PROJECT" -f "$SCRIPT_DIR/docker-compose.yaml" down --volumes --remove-orphans
echo "==> QA environment '$QA_PROJECT' stopped"
