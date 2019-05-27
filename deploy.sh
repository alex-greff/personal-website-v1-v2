#!/bin/bash

# set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 
set -x # -x print commands

# --------------------------
# --- Run docker compose ---
# --------------------------

cd /home/travis/app

# Update the permissions and execute the letsencrypt initialization script
echo "INITIALIZING LETSENCRYPT..."

echo "$TRAVIS_USER_PASSWORD" | sudo -S chmod +x init-letsencrypt.sh
echo "$TRAVIS_USER_PASSWORD" | sudo -SE ./init-letsencrypt.sh

echo "LETSENCRYPT INITIALIZATION COMPLETE"


# Start the containers
echo "STARTING DOCKER IMAGES..."

echo "$TRAVIS_USER_PASSWORD" | sudo -SE docker-compose up -d --force-recreate

echo "DOCKER IMAGES RUNNING"