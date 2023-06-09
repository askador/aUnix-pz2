#!/bin/bash

APP_DIR=/home/askador/nure/aUnix/pz2/TEST
GIT_REPO=https://github.com/askador/aUnix-pz2.git
CONTAINER_NAMES=("achievementsbot" "dbpostgre" "dbredis")

deploy() {
    if [ -d "$APP_DIR/.git" ]; then
        cd "$APP_DIR"
        git pull origin main
    else
        git clone "$GIT_REPO" "$APP_DIR"
        cd "$APP_DIR"
    fi

    for container in "${CONTAINER_NAMES[@]}"
    do
        if [[ ! "$(docker ps -q -f name=${container})" ]]; then
            docker-compose up -d $container
            echo "Container $container is started"
        fi
    done
}

deploy