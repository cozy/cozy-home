#!/bin/bash
#
# Starts a long lived Cozy Stack + CouchDB + Mailpit stack with Home installed, for manual or
# agent driven exploratory QA. Each start recreates it from scratch.
#
#   scripts/qa-environment/build.sh    # once, and whenever the code under test changes
#   scripts/qa-environment/start.sh
#   QA_USERS="dave erin" scripts/qa-environment/start.sh   # extra accounts
#
# Accounts (instance / password): alice.cozy.localhost / alice1234, bob.cozy.localhost / bob1234,
# charlie.cozy.localhost / charlie1234, plus QA_USERS (<uid>1234). Home is served on
# http://<uid>-home.cozy.localhost:<port>/.
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

QA_PROJECT="${QA_PROJECT:-cozy-home-qa}"
QA_USERS="${QA_USERS:-}"
# Published on 127.0.0.1 only. The stack listens on the same port inside the network.
export QA_STACK_PORT="${QA_STACK_PORT:-18910}"
export QA_MAIL_PORT="${QA_MAIL_PORT:-18911}"
ROOT_DOMAIN="cozy.localhost"
USERS="alice bob charlie $QA_USERS"
# Installed from the registry next to Home, so that the app list, the add tile and the links of
# Home lead somewhere. Best effort: Home is still tested when the registry is unreachable.
REGISTRY_APPS="${QA_REGISTRY_APPS:-settings drive store}"

# Features of Home hidden behind a flag that work without an external service
FLAGS='{
  "cozy.searchbar.enabled": true,
  "home.apps.folders": true,
  "home.add-tile.add-shortcut": true,
  "home.wallpaper-personalization.enabled": true,
  "home.mainlist.show-logout": true
}'

compose() {
  docker compose -p "$QA_PROJECT" -f "$SCRIPT_DIR/docker-compose.yaml" "$@"
}

stack() {
  compose exec -T cozystack cozy-stack "$@"
}

if [ ! -f "$REPO_DIR/build/manifest.webapp" ]; then
  echo "The build of Home is missing, build it first: scripts/qa-environment/build.sh" >&2
  exit 1
fi

echo "==> Starting the stack as compose project '$QA_PROJECT'"
compose up -d --wait --wait-timeout 300

echo "==> Waiting for cozy-stack"
for _ in $(seq 1 60); do
  if curl -sf "http://127.0.0.1:$QA_STACK_PORT/version" >/dev/null; then
    ready=true
    break
  fi
  sleep 2
done
if [ "${ready:-false}" != "true" ]; then
  echo "cozy-stack did not start within 2 minutes, see: docker compose -p $QA_PROJECT logs" >&2
  exit 1
fi

echo "==> Creating the QA accounts"
for uid in $USERS; do
  domain="$uid.$ROOT_DOMAIN:$QA_STACK_PORT"
  name="${uid^}"
  stack instances add "$domain" \
    --passphrase "${uid}1234" --email "$uid@$ROOT_DOMAIN" --public-name "$name" \
    --locale en --tz Europe/Paris >/dev/null
  stack apps install home file:///app/home --domain "$domain" >/dev/null
  for app in $REGISTRY_APPS; do
    stack apps install "$app" --domain "$domain" >/dev/null \
      || echo "    warning: $app could not be installed from the registry for $uid" >&2
  done
  stack features flags --domain "$domain" "$FLAGS" >/dev/null
  echo "    $uid: http://$uid-home.$ROOT_DOMAIN:$QA_STACK_PORT/ / ${uid}1234"
done

cat <<INFO

==> The QA environment is up

  Home:     http://alice-home.$ROOT_DOMAIN:$QA_STACK_PORT/  (bob-home, charlie-home)
  Login:    http://alice.$ROOT_DOMAIN:$QA_STACK_PORT/auth/login  (alice1234, bob1234, charlie1234)
  Emails:   http://127.0.0.1:$QA_MAIL_PORT  (Mailpit)

From a container (e.g. Playwright), join the network '${QA_PROJECT}_default' and use:
  --host-resolver-rules="MAP *.$ROOT_DOMAIN cozystack"
and open Mailpit at http://mailpit:8025.

Stop it with: scripts/qa-environment/stop.sh
INFO
