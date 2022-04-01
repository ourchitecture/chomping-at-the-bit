#!/bin/bash

set -eu

tool="${TOOL:-docker}"

if ! command -v ${tool} >/dev/null 2>&1; then
    echo "The CLI '${tool}' could not be found and must be installed." 1>&2
    exit 1
fi

if [ "$tool" == "yarn" ]; then
  yarn && yarn lint
else
  container_file_path="${FILE_PATH:-./Dockerfile}"
  image_tag="${TAG:-ourchitecture/chomping-at-the-bit:local}"
  container_context="${CONTEXT:-./}"
  container_target="lint"
  container_tag="${image_tag}-${container_target}"

  ${tool} build \
    --tag="${container_tag}" \
    --file="${container_file_path}" \
    --target="${container_target}" \
    "${container_context}"

  ${tool} run \
    --name="ourchitecture-bit-chomping-lint" \
    --rm \
    --interactive \
    "${container_tag}"
fi
