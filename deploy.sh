#!/bin/bash

set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 

# --------------------------
# --- Run docker compose ---
# --------------------------

cd /var/app

echo "$TRAVIS_USER_PASSWORD" | sudo -SE docker-compose up --force-recreate
