#!/bin/bash

set -eu

tool="${TOOL:-docker}"

if ! command -v ${tool} >/dev/null 2>&1; then
    echo "The CLI '${tool}' could not be found and must be installed." 1>&2
    exit 1
fi

if [ "$tool" == "yarn" ]; then
  yarn && yarn test:e2e
else
  container_file_path="${FILE_PATH:-./Dockerfile}"
  image_tag="${TAG:-ourchitecture/chomping-at-the-bit:local}"
  container_context="${CONTEXT:-./}"

  container_target="test_e2e"
  container_tag="${image_tag}-${container_target}"

  # docker complains with cypress builds using buildkit
  DOCKER_BUILDKIT=0 \
  ${tool} build \
    --tag="${container_tag}" \
    --file="${container_file_path}" \
    --target="${container_target}" \
    "${container_context}"

  echo ''
  echo ''
  echo '================================================================================'
  echo ' IMPORTANT: you may safely ignore ERROR:bus.cc and ERROR:gpu_init.cc errors.'
  echo '================================================================================'
  echo ''
  echo ''

  ${tool} run \
    --name="ourchitecture-bit-chomping-e2e" \
    --rm \
    --interactive \
    "${container_tag}"
fi
