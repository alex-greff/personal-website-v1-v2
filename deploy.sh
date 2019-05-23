#!/bin/bash

set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 

# Setup ssh client
eval "$(ssh-agent -s)"
# ssh-add ~/.ssh/travis_rsa

# -------------------------------
# --- Stop running containers ---
# ------------------------------- 

# Make sure the stop commands exit 0 even if the container does not exist (which normally returns a non-zero exit code)
docker stop alexgreff/personal-website-nginx || true && docker rm alexgreff/personal-website-nginx || true
docker stop alexgreff/personal-website-client || true && docker rm alexgreff/personal-website-client || true
docker stop alexgreff/personal-website-server || true && docker rm alexgreff/personal-website-server || true

# ----------------------------
# --- Start new containers ---
# ----------------------------

# Start client image
docker run \
    --name "client" \
    alexgreff/personal-website-client:$SHA

# Start server image
docker run \
    --name "api" \
    -e "MONGO_URI=$PERSONAL_WEBSITE_MONGO_URI" \
    -e "MONGO_USERNAME=$PERSONAL_WEBSITE_MONGO_USERNAME" \
    -e "MONGO_PASSWORD=$PERSONAL_WEBSITE_MONGO_PASSWORD" \
    -e "JWT_KEY=$PERSONAL_WEBSITE_JWT_KEY" \
    -e "JWT_TOKEN_EXPIRE_TIME=$PERSONAL_WEBSITE_JWT_TOKEN_EXPIRE_TIME" \
    alexgreff/personal-website-server:$SHA

# Start nginx proxy image
docker run \
    --name "nginx" \
    --restart always \
    -p 80:80 \
    alexgreff/personal-website-nginx:$SHA
