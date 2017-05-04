#!/usr/bin/env bash
PATH="./node_modules/.bin:$PATH"

export PATH="./node_modules/.bin:$PATH"
export NODE_ENV=production

echo "Pull locales from Transifex"
tx pull -a
echo "Locales updated."

echo "Clean previous build..."
rm -rf build/* && mkdir -p build/app
echo "Previous build cleaned."

echo "Build entry point..."

echo "Build locales..."
cp -r ./app/locales ./build/app/
echo "Locales built."

echo "Build client..."
webpack
echo "Client built."
