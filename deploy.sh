#!/bin/bash

set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 

# --- Initialize LetsEncrypt ---

cd /home/travis/app

if [ $PERSONAL_WEBSITE_INIT_CERTIFICATION != "0" ]; then
    # Update the permissions and execute the letsencrypt initialization script
    echo "INITIALIZING LETSENCRYPT..."

    echo "$TRAVIS_USER_PASSWORD" | sudo -S chmod +x init-letsencrypt.sh
    echo "$TRAVIS_USER_PASSWORD" | sudo -SE ./init-letsencrypt.sh

    echo "LETSENCRYPT INITIALIZATION COMPLETE"
fi



# --- Start docker containers ---

echo "STARTING DOCKER IMAGES..."

echo "$TRAVIS_USER_PASSWORD" | sudo -SE docker-compose up -d

echo "DOCKER IMAGES RUNNING"



# --- Cleanup previous image caches ---

echo "CLEANING UP IMAGE CACHE..."

echo "$TRAVIS_USER_PASSWORD" | sudo -S docker image prune -af

echo "IMAGE CACHE CLEANUP COMPLETED..."



# --- Done! ---

echo "COMPLETED DEPLOYMENT!"