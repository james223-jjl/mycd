#!/bin/bash
set -e

SERVER="ecs-user@47.243.249.21"
REMOTE_DIR="/var/www/mycoindeck.com"

cd "$(cd "$(dirname "$0")" && pwd)"

echo "Building..."
rm -rf .next && npm run build

echo "Uploading to server..."
rsync -avz --delete \
  --exclude node_modules \
  --exclude .git \
  --exclude .DS_Store \
  .next \
  public \
  package.json \
  package-lock.json \
  next.config.ts \
  locales \
  src/i18n \
  $SERVER:$REMOTE_DIR/

echo "Installing dependencies on server..."
ssh $SERVER "cd $REMOTE_DIR && npm install --production"

echo "Done!"
ssh $SERVER "ls -lh $REMOTE_DIR/ | head -20"
