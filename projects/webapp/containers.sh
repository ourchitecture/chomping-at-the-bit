#!/bin/bash

set -eu

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# contains(string, substring)
#
# Returns 0 if the specified string contains the specified substring,
# otherwise returns 1.
contains() {
    string="$1"
    substring="$2"
    if test "${string#*$substring}" != "$string"
    then
        return 0    # $substring is in $string
    else
        return 1    # $substring is not in $string
    fi
}

if ! command -v docker >/dev/null 2>&1; then
    echo "The Docker CLI ('docker') could not be found and must be installed." 1>&2
    exit 1
fi

volume_name="our-bit-chomping-data"

docker_image_node="docker.io/library/node:16.14.2-alpine3.14"

volume_exists_output=$((docker volume inspect "${volume_name}" 2>&1 || true) | tr '[:upper:]' '[:lower:]')

if contains "$volume_exists_output" "no such volume"; then
  echo 'Creating shared container volume...'
  docker volume create --name "${volume_name}"
  echo 'Successfully created shared container volume.'
fi

# copy files to "/src/"
echo 'Copying source files...'
docker run \
  --rm \
  --interactive \
  --volume=our-bit-chomping-data:/data/ \
  --volume="${SCRIPT_DIR}":/src/ \
  ${docker_image_node} \
  /bin/ash -c 'rm -rf /data/src/ && mkdir /data/src/ && cp -r /src/* /data/src/ && if [ -d /data/npm/ ]; then cp -r /data/npm/* /src/node_modules/; else mkdir /data/npm/; fi'
echo 'Successfully copied source files.'

# initialize npm dependencies
echo 'Installing npm dependencies...'
docker run \
  --rm \
  --interactive \
  --volume=our-bit-chomping-data:/data/ \
  --workdir=/data/src/ \
  ${docker_image_node} \
  /bin/ash -c 'yarn && cp -r ./node_modules/* /data/npm/'
echo 'Successfully installed npm dependencies.'

# lint
echo 'Checking code styles with linting...'
docker run \
  --rm \
  --interactive \
  --volume=our-bit-chomping-data:/data/ \
  --workdir=/data/src/ \
  ${docker_image_node} \
  yarn lint
echo 'Successfully checked code styles with linting.'

# unit test
echo 'Running unit tests...'
docker run \
  --rm \
  --interactive \
  --volume=our-bit-chomping-data:/data/ \
  --workdir=/data/src/ \
  ${docker_image_node} \
  yarn test:unit
echo 'Successfully ran the unit tests.'

# build
echo 'Building the system...'
docker run \
  --rm \
  --interactive \
  --volume=our-bit-chomping-data:/data/ \
  --workdir=/data/src/ \
  ${docker_image_node} \
  yarn build
echo 'Successfully built the system.'
