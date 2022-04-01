#!/bin/bash

set -eu

tool="${TOOL:-docker}"

if ! command -v ${tool} >/dev/null 2>&1; then
    echo "The CLI '${tool}' could not be found and must be installed." 1>&2
    exit 1
fi

if [ "$tool" == "yarn" ]; then
  echo 'If a server has been started, return to that terminal window and kill the process.'
else
  container_name="ourchitecture-bit-chomping-production"

  if [ "$(${tool} ps --all --quiet --filter name=${container_name})" ]; then
    echo 'Stopping and removing the container...'
    ${tool} rm --force "${container_name}"
  fi

  echo 'Website successfully stopped.'
fi
