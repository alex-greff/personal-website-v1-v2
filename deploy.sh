#!/bin/bash

set -xe

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/travis_rsa

docker-compose up --build