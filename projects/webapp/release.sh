#!/bin/bash

set -eu

if ! command -v docker >/dev/null 2>&1; then
    echo "The Docker CLI ('docker') could not be found and must be installed." 1>&2
    exit 1
fi

target_root="./"
target_path="${target_root}dist/"

if [ -d "${target_path}" ]; then
  rm --recursive --force "${target_path}"
fi

mkdir "${target_path}"

docker_target="production_src"
docker_tag="ourchitecture/chomping-at-the-bit:local-${docker_target}"
docker_file_path="./Dockerfile"
docker_context="./"
docker_name="ourchitecture-bit-chomping-release"

docker build \
  --tag="${docker_tag}" \
  --file="${docker_file_path}" \
  --target="${docker_target}" \
  "${docker_context}"

echo 'Starting production distribution container...'
docker run \
  --name="${docker_name}" \
  --detach \
  --interactive \
  "${docker_tag}"
echo "Production distribution container successfully started with the name \"${docker_name}\"."

container_id=$( \
  docker ps \
    --all \
    --quiet \
    --filter "name=^${docker_name}$" \
)
echo "Production distribution container id: \"${container_id}\"."

echo 'Copying production distribution files...'
docker cp \
  "${container_id}:/tmp/our/src/dist/" \
  "${target_root}"
echo "Successfully copied production distribution file to \"${target_path}\"."

echo 'Removing production distribution container...'
docker rm --force "${docker_name}"
echo 'Successfully removed production distribution container.'

release_path="../../docs/"

echo 'Releasing distribution locally...'

# remove if exists ../../docs/
if [ -d "${release_path}" ]; then
  rm --recursive --force ${release_path}
fi

# create ../../docs/
mkdir ${release_path}

# move ./dist/ to ../../docs/
mv ${target_path}* ${release_path}

# remove ./dist/
rm --recursive --force ${target_path}

echo "Successfully released distribution locally to \"${release_path}\"."
