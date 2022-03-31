#!/bin/bash

set -eu

if ! command -v docker >/dev/null 2>&1; then
    echo "The Docker CLI ('docker') could not be found and must be installed." 1>&2
    exit 1
fi

if [ -z "$APP_PORT" ]; then
    echo "The environment variable APP_PORT is required." 1>&2
    exit 1
fi

if [ -z "$HOST_PORT" ]; then
    echo "The environment variable HOST_PORT is required." 1>&2
    exit 1
fi

if [ -z "$TAG" ]; then
    echo "The environment variable TAG is required." 1>&2
    exit 1
fi

if [ -z "$NAME" ]; then
    echo "The environment variable NAME is required." 1>&2
    exit 1
fi

app_port="${APP_PORT}"
host_port="${HOST_PORT}"
image_tag="${TAG}"
container_name="${NAME}"

docker run \
  --name="${container_name}" \
  --detach \
  --interactive \
  --publish="${host_port}:${app_port}" \
  "${image_tag}"

echo ''
echo "Website running at: http://localhost:${host_port}/chomping-at-the-bit/"
