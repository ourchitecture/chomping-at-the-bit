#!/bin/bash

set -eu

if ! command -v docker >/dev/null 2>&1; then
    echo "The Docker CLI ('docker') could not be found and must be installed." 1>&2
    exit 1
fi

if [ -z "$NAME" ]; then
    echo "The environment variable NAME is required." 1>&2
    exit 1
fi

container_name="${NAME}"

if [ "$(docker ps --quiet --filter name=${container_name})" ]; then
  echo 'Stopping and removing the container...'
  docker rm --force "${container_name}"
fi

echo 'Website successfully stopped.'
