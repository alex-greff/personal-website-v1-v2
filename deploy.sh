#!/bin/bash

set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 

# --------------------------
# --- Run docker compose ---
# --------------------------

cd /var/app

echo "SHA $SHA"
echo "MONGO URI $PERSONAL_WEBSITE_MONGO_URI"
echo "MONGO USERNAME $PERSONAL_WEBSITE_MONGO_USERNAME"
echo "MONGO PASS $PERSONAL_WEBSITE_MONGO_PASSWORD"
echo "JWT SECRET $PERSONAL_WEBSITE_JWT_SECRET"
echo "JWT EXPIRE $PERSONAL_WEBSITE_JWT_TOKEN_EXPIRE_TIME"

echo "$TRAVIS_USER_PASSWORD" | sudo -SE docker-compose up -d --force-recreate
