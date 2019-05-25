#!/bin/bash

set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 

# --------------------------
# --- Run docker compose ---
# --------------------------

cd /var/app

# Hardcode in the mongo URI for now
export PERSONAL_WEBSITE_MONGO_URI='personal-cluster-shard-00-00-hujs7.mongodb.net:27017,personal-cluster-shard-00-01-hujs7.mongodb.net:27017,personal-cluster-shard-00-02-hujs7.mongodb.net:27017/personal-website?ssl=true&replicaSet=personal-cluster-shard-0&authSource=admin&retryWrites=true'

echo "SHA $SHA"
echo "MONGO URI $PERSONAL_WEBSITE_MONGO_URI"
echo "MONGO USERNAME $PERSONAL_WEBSITE_MONGO_USERNAME"
echo "MONGO PASS $PERSONAL_WEBSITE_MONGO_PASSWORD"
echo "JWT SECRET $PERSONAL_WEBSITE_JWT_SECRET"
echo "JWT EXPIRE $PERSONAL_WEBSITE_JWT_TOKEN_EXPIRE_TIME"

echo "$TRAVIS_USER_PASSWORD" | sudo -SE docker-compose up -d --force-recreate
