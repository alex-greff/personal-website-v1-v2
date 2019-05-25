#!/bin/bash

set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 

# --------------------------
# --- Run docker compose ---
# --------------------------

cd /var/app

echo "$TRAVIS_USER_PASSWORD" | sudo -S -E docker-compose up -d --force-recreate
