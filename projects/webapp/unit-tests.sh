#!/bin/bash

set -eu

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

if ! command -v docker >/dev/null 2>&1; then
    echo "The Docker CLI ('docker') could not be found and must be installed." 1>&2
    exit 1
fi

if [ -z "$DOCKER_FILE_PATH" ]; then
    echo "The environment variable DOCKER_FILE_PATH is required." 1>&2
    exit 1
fi

if [ -z "$TAG" ]; then
    echo "The environment variable TAG is required." 1>&2
    exit 1
fi

if [ -z "$CONTEXT" ]; then
    echo "The environment variable CONTEXT is required." 1>&2
    exit 1
fi

docker_file_path="${DOCKER_FILE_PATH}"
image_tag="${TAG}"
docker_context="${CONTEXT}"

docker_target="test_unit"
docker_tag="${image_tag}-${docker_target}"

docker build \
  --tag="${docker_tag}" \
  --file="${docker_file_path}" \
  --target="${docker_target}" \
  "${docker_context}"

docker run \
  --name="ourchitecture-bit-chomping-unit-tests" \
  --rm \
  --interactive \
  "${docker_tag}"
