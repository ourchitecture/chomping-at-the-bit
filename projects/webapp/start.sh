#!/bin/bash

set -eu

tool="${TOOL:-docker}"

if ! command -v ${tool} >/dev/null 2>&1; then
    echo "The CLI '${tool}' could not be found and must be installed." 1>&2
    exit 1
fi

if [ "$tool" == "yarn" ]; then
  yarn && yarn serve
else
  app_port="${APP_PORT:-80}"
  host_port="${HOST_PORT:-8080}"
  container_file_path="${FILE_PATH:-./Dockerfile}"
  image_tag="${TAG:-ourchitecture/chomping-at-the-bit:local}"
  container_context="${CONTEXT:-./}"
  container_target="production"
  container_tag="${image_tag}-${container_target}"

  ${tool} build \
    --tag="${container_tag}" \
    --file="${container_file_path}" \
    --target="${container_target}" \
    "${container_context}"

  ${tool} run \
    --name="ourchitecture-bit-chomping-production" \
    --detach \
    --interactive \
    --publish="${host_port}:${app_port}" \
    "${container_tag}"

  echo ''
  echo "Website running at: http://localhost:${host_port}/chomping-at-the-bit/"
fi
