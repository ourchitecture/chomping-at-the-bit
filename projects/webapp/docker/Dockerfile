################################################################################
# READ: https://docs.docker.com/develop/develop-images/multistage-build/
#
# Describes the steps to build one or more containers necessary to execute
# the application on any Open Container Initiative (OCI) capable platform for:
# - local development
# - DevOps pipelines
# - production builds
#
# Conventions:
# - https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# - Version whenever possible and as specifically as possible
################################################################################

# Note: `podman` explicitly requires this since multiple registries are
# supported and to ensure it pulls from the expected registry. `docker`
# uses this by default.
ARG IMAGE_HOST_PATH="docker.io/library/"

ARG LOCALE="en_US"
ARG CHARSET="UTF-8"
ARG TIMEZONE_FILE_PATH="/usr/share/zoneinfo/America/New_York"

ARG APT_QUIET_LEVEL="1"

# Ubuntu apt-get package versions
# See: https://packages.ubuntu.com/
# After installing, Ubuntu package versions can be retrieved with:
#   $ apt-cache policy $PACKAGE_NAME
ARG APT_VERSION_APT_TRANSPORT_HTTPS="2.0.2ubuntu0.2"
ARG APT_VERSION_BUILD_ESSENTIAL="12.8ubuntu1"
ARG APT_VERSION_CA_CERTIFICATES="20210119~20.04.2"
ARG APT_VERSION_CURL="7.68.0-1ubuntu2.7"
ARG APT_VERSION_GIT="1:2.25.1-1ubuntu3.2"
ARG APT_VERSION_LOCALES="2.31-0ubuntu9.7"
ARG APT_VERSION_TZDATA="2021e-0ubuntu0.20.04"
ARG APT_VERSION_UNZIP="6.0-25ubuntu1"
ARG APT_VERSION_ZIP="3.0-11build1"

# packages installed after setting the locale
ARG APT_VERSION_ASOUND2="1.2.2-2.1"
ARG APT_VERSION_ASOUND2_DATA="1.2.2-2.1"
ARG APT_VERSION_ATK1="2.35.1-1ubuntu2"
ARG APT_VERSION_ATK_BRIDGE2="2.34.1-3"
ARG APT_VERSION_LIBGCONF_2_4="3.2.6-6ubuntu1"
ARG APT_VERSION_LIBGBM_DEV="21.2.6-0ubuntu0.1~20.04.2"
ARG APT_VERSION_LIBGBM1="21.2.6-0ubuntu0.1~20.04.2"
ARG APT_VERSION_LIBGTK_2="2.24.32-4ubuntu4"
ARG APT_VERSION_LIBGTK_3="3.24.18-1ubuntu1"
ARG APT_VERSION_LIBNOTIFY_DEV="0.7.9-1ubuntu2"
ARG APT_VERSION_LIBNSS3="2:3.49.1-1ubuntu1.6"
ARG APT_VERSION_LIBXSS1="1:1.2.3-1"
ARG APT_VERSION_XSS1="1:1.2.3-1"
ARG APT_VERSION_XTST6="2:1.2.3-1"
ARG APT_VERSION_XAUTH="1:1.1-0ubuntu1"
ARG APT_VERSION_XVFB="2:1.20.13-1ubuntu1~20.04.2"

# https://hub.docker.com/_/ubuntu
ARG DEVELOPMENT_IMAGE_NAME="ubuntu"
ARG DEVELOPMENT_IMAGE_OS_VERSION="20.04"
ARG DEVELOPMENT_IMAGE_HASH="sha256:8ae9bafbb64f63a50caab98fd3a5e37b3eb837a3e0780b78e5218e63193961f9"
ARG DEVELOPMENT_IMAGE_SOURCE="${IMAGE_HOST_PATH}${DEVELOPMENT_IMAGE_NAME}"
ARG DEVELOPMENT_IMAGE_TAG="${DEVELOPMENT_IMAGE_OS_VERSION}"
ARG DEVELOPMENT_IMAGE="${DEVELOPMENT_IMAGE_SOURCE}:${DEVELOPMENT_IMAGE_TAG}@${DEVELOPMENT_IMAGE_HASH}"

# node version manager
ARG NVM_VERSION="0.39.1"
ARG NVM_INSTALL_URL="https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh"
ARG NVM_DIR_PATH="/root/.nvm/"
ARG NVM_SCRIPT_PATH="${NVM_DIR_PATH}nvm.sh"

# https://hub.docker.com/_/node
ARG PRODUCTION_IMAGE_NAME="node"
# https://hub.docker.com/_/alpine
ARG PRODUCTION_IMAGE_OS="alpine"
ARG PRODUCTION_IMAGE_OS_VERSION="3.15"
ARG PRODUCTION_IMAGE_NODE_VERSION="16.14.0"
ARG PRODUCTION_IMAGE_HASH="sha256:2c6c59cf4d34d4f937ddfcf33bab9d8bbad8658d1b9de7b97622566a52167f2b"
ARG PRODUCTION_IMAGE_SOURCE="${IMAGE_HOST_PATH}${PRODUCTION_IMAGE_NAME}"
ARG PRODUCTION_IMAGE_TAG="${PRODUCTION_IMAGE_NODE_VERSION}-${PRODUCTION_IMAGE_OS}${PRODUCTION_IMAGE_OS_VERSION}@${PRODUCTION_IMAGE_HASH}"
ARG PRODUCTION_IMAGE="${PRODUCTION_IMAGE_SOURCE}:${PRODUCTION_IMAGE_TAG}"

################################################################################
# base for development
################################################################################
FROM ${DEVELOPMENT_IMAGE} as development_base

################################################################################
# core middleware (software tools) for development
################################################################################
FROM development_base as development_middleware_core

ARG APT_QUIET_LEVEL

ARG APT_VERSION_APT_TRANSPORT_HTTPS
ARG APT_VERSION_BUILD_ESSENTIAL
ARG APT_VERSION_CA_CERTIFICATES
ARG APT_VERSION_CURL
ARG APT_VERSION_GIT
ARG APT_VERSION_LOCALES
ARG APT_VERSION_TZDATA
ARG APT_VERSION_UNZIP
ARG APT_VERSION_ZIP

ARG LOCALE
ARG CHARSET
ARG TIMEZONE_FILE_PATH

# install os packages
RUN apt-get update \
      --quiet=${APT_QUIET_LEVEL} \
    && DEBIAN_FRONTEND=noninteractive \
    apt-get install \
      --quiet=${APT_QUIET_LEVEL} \
      --no-install-recommends \
      --assume-yes \
        apt-transport-https=${APT_VERSION_APT_TRANSPORT_HTTPS} \
        # includes GNU Make (`make`)
        build-essential=${APT_VERSION_BUILD_ESSENTIAL} \
        # installs standard network certificate authority certificates
        ca-certificates=${APT_VERSION_CA_CERTIFICATES} \
        # `curl` network utility
        curl=${APT_VERSION_CURL} \
        git=${APT_VERSION_GIT} \
        # support for `locale-gen`
        locales=${APT_VERSION_LOCALES} \
        tzdata=${APT_VERSION_TZDATA} \
        unzip=${APT_VERSION_UNZIP} \
        zip=${APT_VERSION_ZIP} \
    # clean up docker layer:
    # https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run
    && rm --recursive --force \
      /var/lib/apt/lists/* \
      /var/cache/apt/*

# Set locale and timezone
RUN locale-gen ${LOCALE}.${CHARSET} \
    && ln --force --symbolic \
      ${TIMEZONE_FILE_PATH} \
      /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata

################################################################################
# node for development
################################################################################
FROM development_middleware_core as development_node

ARG NVM_INSTALL_URL
ARG NVM_DIR_PATH
ARG NVM_SCRIPT_PATH

ARG PRODUCTION_IMAGE_NODE_VERSION

# avoid million NPM install messages
ENV npm_config_loglevel warn

# allow installing when the main user is root
ENV npm_config_unsafe_perm true

# install nvm and node
# upgrade npm and install yarn
# bash is used to properly scope the nvm installs for later
# use via `docker run ...`
RUN curl -o- ${NVM_INSTALL_URL} | bash \
    && chmod --recursive +x "${NVM_DIR_PATH}" \
    && bash -c ' \
        source ${NVM_SCRIPT_PATH} \
        && nvm install "v${PRODUCTION_IMAGE_NODE_VERSION}" \
        && nvm use "v${PRODUCTION_IMAGE_NODE_VERSION}" \
        && npm install --global npm@latest --force \
        && npm install --global yarn@latest --force \
      '

################################################################################
# end-to-end (e2e) testing
################################################################################
FROM development_node as development_e2e

ARG APT_QUIET_LEVEL

ARG APT_VERSION_ASOUND2
ARG APT_VERSION_ASOUND2_DATA
ARG APT_VERSION_ATK1
ARG APT_VERSION_ATK_BRIDGE2
ARG APT_VERSION_LIBGCONF_2_4
ARG APT_VERSION_LIBGBM_DEV
ARG APT_VERSION_LIBGBM1
ARG APT_VERSION_LIBGTK_2
ARG APT_VERSION_LIBGTK_3
ARG APT_VERSION_LIBNOTIFY_DEV
ARG APT_VERSION_LIBNSS3
ARG APT_VERSION_LIBXSS1
ARG APT_VERSION_XSS1
ARG APT_VERSION_XTST6
ARG APT_VERSION_XAUTH
ARG APT_VERSION_XVFB

# install os packages that depend on locale setting
RUN apt-get update \
      --quiet=${APT_QUIET_LEVEL} \
    && DEBIAN_FRONTEND=noninteractive \
    apt-get install \
      --quiet=${APT_QUIET_LEVEL} \
      --no-install-recommends \
      --assume-yes \
        # ----------------------------------------------------------------------
        # The following packages are required for end-to-end (e2e) testing...
        # ----------------------------------------------------------------------
        libasound2=${APT_VERSION_ASOUND2} \
        libasound2-data=${APT_VERSION_ASOUND2_DATA} \
        libatk1.0-0=${APT_VERSION_ATK1} \
        libatk-bridge2.0-0=${APT_VERSION_ATK_BRIDGE2} \
        libgconf-2-4=${APT_VERSION_LIBGCONF_2_4} \
        libgbm1=${APT_VERSION_LIBGBM1} \
        libgbm-dev=${APT_VERSION_LIBGBM_DEV} \
        libgtk2.0-0=${APT_VERSION_LIBGTK_2} \
        libgtk-3-0=${APT_VERSION_LIBGTK_3} \
        libnotify-dev=${APT_VERSION_LIBNOTIFY_DEV} \
        libnss3=${APT_VERSION_LIBNSS3} \
        libxss1=${APT_VERSION_XSS1} \
        libxtst6=${APT_VERSION_XTST6} \
        xauth=${APT_VERSION_XAUTH} \
        libxss1=${APT_VERSION_LIBXSS1} \
        xvfb=${APT_VERSION_XVFB} \
        # ----------------------------------------------------------------------
    # clean up docker layer:
    # https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run
    && rm --recursive --force \
      /var/lib/apt/lists/* \
      /var/cache/apt/*

# good colors for most applications
ENV TERM xterm

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

################################################################################
# development image
################################################################################
FROM development_e2e as development

# run post-install
COPY ./docker/context/development/post-install.sh /tmp/post-install.sh
RUN chmod +x /tmp/post-install.sh \
    && bash -c 'source /tmp/post-install.sh' \
    && rm /tmp/post-install.sh

COPY ./docker/context/development/entrypoint.sh /usr/bin/entrypoint.sh

ENTRYPOINT [ "/usr/bin/entrypoint.sh" ]

################################################################################
# image containing code package dependencies
################################################################################
# FROM base as dependencies

# WORKDIR /dependencies

# # copy only the files required to install dependencies
# COPY package.json yarn.lock .yarnrc /dependencies/
# COPY .yarn/ /dependencies/.yarn/

# # install dependencies
# RUN yarn --frozen-lockfile

################################################################################
# production image
################################################################################
FROM ${PRODUCTION_IMAGE} as production
