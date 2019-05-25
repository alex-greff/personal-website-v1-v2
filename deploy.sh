#!/bin/bash

set -xe # -x print commands, -e exit immediately if non-zero exit code occurs 

# Setup ssh client
# eval "$(ssh-agent -s)"

# chmod 600 ./travis_rsa

# echo -e "Host $DROPLET_IP\nStrictHostKeyChecking no\n" >> ~/.ssh/config

# ssh-add ./travis_rsa

# echo "USERNAME (travis) $PERSONAL_WEBSITE_MONGO_USERNAME"

# ssh -i ./travis_rsa travis@$DROPLET_IP

# echo "USERNAME (droplet): $PERSONAL_WEBSITE_MONGO_USERNAME"



# docker-compose down

# docker-compose up -d 

# -------------------------------
# --- Stop running containers ---
# ------------------------------- 

# Make sure the stop commands exit 0 even if the container does not exist (which normally returns a non-zero exit code)
# docker rm $(docker stop $(docker ps -a -q --filter ancestor="alexgreff/alexgreff/personal-website-nginx" --format="{{.ID}}" )) || true
# docker rm $(docker stop $(docker ps -a -q --filter ancestor="alexgreff/alexgreff/personal-website-client" --format="{{.ID}}" )) || true
# docker rm $(docker stop $(docker ps -a -q --filter ancestor="alexgreff/alexgreff/personal-website-server" --format="{{.ID}}" )) || true

# ----------------------------
# --- Start new containers ---
# ----------------------------

# Start client image
# docker run -d \
#     --name "client" \
#     alexgreff/personal-website-client:$SHA

# # Start server image
# docker run -d \
#     --name "api" \
#     -e "MONGO_URI=$PERSONAL_WEBSITE_MONGO_URI" \
#     -e "MONGO_USERNAME=$PERSONAL_WEBSITE_MONGO_USERNAME" \
#     -e "MONGO_PASSWORD=$PERSONAL_WEBSITE_MONGO_PASSWORD" \
#     -e "JWT_KEY=$PERSONAL_WEBSITE_JWT_KEY" \
#     -e "JWT_TOKEN_EXPIRE_TIME=$PERSONAL_WEBSITE_JWT_TOKEN_EXPIRE_TIME" \
#     alexgreff/personal-website-server:$SHA

# # Start nginx proxy image
# docker run -d \
#     --name "nginx" \
#     --restart always \
#     -p 80:80 \
#     alexgreff/personal-website-nginx:$SHA

cd /var/app

# echo "Travis Pass $TRAVIS_USER_PASSWORD"

# echo "$TRAVIS_USER_PASSWORD\n" | sudo -S -E "docker-compose up -d --force-recreate"
# sudo -E "docker-compose up -d --force-recreate"
# docker-compose up -d --force-recreate

echo "TRAVIS PASS $TRAVIS_USER_PASSWORD"

echo "MONGO USER $PERSONAL_WEBSITE_MONGO_USERNAME"

echo "$TRAVIS_USER_PASSWORD" | sudo -S -E 'docker-compose up -d --force-recreate'
