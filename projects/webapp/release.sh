#!/bin/bash

set -eu

tool="${TOOL:-docker}"

if ! command -v ${tool} >/dev/null 2>&1; then
    echo "The CLI '${tool}' could not be found and must be installed." 1>&2
    exit 1
fi

target_root="./"
target_path="${target_root}dist/"
release_path="../../docs/"

if [ -d "${target_path}" ]; then
  rm --recursive --force "${target_path}"
fi

mkdir "${target_path}"

if [ "$tool" == "yarn" ]; then
  yarn && yarn build
else
  container_target="production_src"
  container_tag="ourchitecture/chomping-at-the-bit:local-${container_target}"
  container_file_path="./Dockerfile"
  container_context="./"
  container_name="ourchitecture-bit-chomping-release"

  ${tool} build \
    --tag="${container_tag}" \
    --file="${container_file_path}" \
    --target="${container_target}" \
    "${container_context}"

  echo 'Starting production distribution container...'
  ${tool} run \
    --name="${container_name}" \
    --detach \
    --interactive \
    "${container_tag}"
  echo "Production distribution container successfully started with the name \"${container_name}\"."

  container_id=$( \
    ${tool} ps \
      --all \
      --quiet \
      --filter "name=^${container_name}$" \
  )
  echo "Production distribution container id: \"${container_id}\"."

  echo 'Copying production distribution files...'
  ${tool} cp \
    "${container_id}:/tmp/our/src/dist/" \
    "${target_root}"
  echo "Successfully copied production distribution file to \"${target_path}\"."

  echo 'Removing production distribution container...'
  ${tool} rm --force "${container_name}"
  echo 'Successfully removed production distribution container.'
fi

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

# create 404 page for GH pages to handle client-side routing reloads
cp ${release_path}index.html ${release_path}404.html

echo "Successfully released distribution locally to \"${release_path}\"."
