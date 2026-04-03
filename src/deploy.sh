#!/bin/bash
set -e

SERVER="ecs-user@47.243.249.21"
REMOTE_DIR="/var/www/mycoindeck.com"

cd "$(cd "$(dirname "$0")" && pwd)"

echo "Building..."
rm -rf dist && npm run build

echo "Clearing remote directory..."
ssh $SERVER "rm -rf $REMOTE_DIR/*"

echo "Uploading to server..."
scp -r dist/* $SERVER:$REMOTE_DIR/

echo "Done! Verifying..."
ssh $SERVER "ls -lh $REMOTE_DIR/ | head -20"
