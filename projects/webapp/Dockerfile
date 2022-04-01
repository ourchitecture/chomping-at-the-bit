# Note: `podman` explicitly requires this since multiple registries are
# supported and to ensure it pulls from the expected registry. `docker`
# uses this by default.
ARG STANDARD_IMAGE_HOST_PATH="docker.io/library/"
ARG USER_IMAGE_HOST_PATH="docker.io/"

# https://hub.docker.com/_/alpine
ARG NODE_IMAGE_NAME="node"
ARG NODE_VERSION="16.14.2"
ARG NODE_IMAGE_OS="alpine"
ARG NODE_IMAGE_OS_VERSION="3.14"
ARG NODE_IMAGE_HASH="sha256:ba9c961513b853210ae0ca1524274eafa5fd94e20b856343887ca7274c8450e4"
ARG NODE_IMAGE_SOURCE="${STANDARD_IMAGE_HOST_PATH}${NODE_IMAGE_NAME}"
ARG NODE_IMAGE_TAG="${NODE_VERSION}-${NODE_IMAGE_OS}${NODE_IMAGE_OS_VERSION}"
ARG NODE_IMAGE="${NODE_IMAGE_SOURCE}:${NODE_IMAGE_TAG}@${NODE_IMAGE_HASH}"

ARG NGINX_OS="alpine"
ARG NGINX_IMAGE_NAME="nginx"
ARG NGINX_VERSION="1.21.6"
ARG NGINX_IMAGE="${STANDARD_IMAGE_HOST_PATH}${NGINX_IMAGE_NAME}:${NGINX_VERSION}-${NGINX_OS}"
ARG NGINX_STATIC_SITE_HOSTING_PATH="/usr/share/nginx/html/"

ARG CYPRESS_REPOSITORY="cypress"
ARG CYPRESS_IMAGE_NAME="included"
ARG CYPRESS_VERSION="9.4.1"
ARG CYPRESS_IMAGE_HASH="sha256:270334f9994fa61323432c2e7e25f7ea4b955cfedf69acde0ac1ee05a279b217"
ARG CYPRESS_IMAGE="${USER_IMAGE_HOST_PATH}${CYPRESS_REPOSITORY}/${CYPRESS_IMAGE_NAME}:${CYPRESS_VERSION}@${CYPRESS_IMAGE_HASH}"

################################################################################
# image: yarn, node, npm
################################################################################
FROM ${NODE_IMAGE} as yarn

################################################################################
# image: dependencies
################################################################################
FROM yarn as dependencies

WORKDIR /tmp/our/dependencies/

# ".yarnrc" - yarn version
# "package.json" - npm dependencies
# "yarn.lock" - locked npm dependencies
COPY ./.yarnrc ./package.json ./yarn.lock /tmp/our/dependencies/

# ".yarn/" - yarn version metadata
COPY ./.yarn/ /tmp/our/dependencies/.yarn/

RUN yarn

################################################################################
# image: src files
################################################################################
FROM yarn as src

WORKDIR /tmp/our/src/

COPY ./ /tmp/our/src/

COPY --from=dependencies /tmp/our/dependencies/node_modules/ /tmp/our/src/node_modules/

################################################################################
# image: code styles with linting
################################################################################
FROM src as lint

ENTRYPOINT [ "yarn", "lint" ]

################################################################################
# image: unit tests
################################################################################
FROM src as test_unit

ENTRYPOINT [ "yarn", "test:unit" ]

################################################################################
# image: Cypress browser testing
################################################################################
FROM ${CYPRESS_IMAGE} as cypress

################################################################################
# image: end-to-end (e2e) tests
################################################################################
FROM cypress as test_e2e

COPY --from=src /tmp/our/src/ /e2e

WORKDIR /e2e

# IMPORTANT: Cypress already has a sensible default entrypoint
# ENTRYPOINT [ ... ]

# TODO: research if the Vue CLI e2e command does anything different / extra

################################################################################
# image: build
################################################################################
FROM src as build

ENTRYPOINT [ "yarn", "build" ]

################################################################################
# image: production distribution
################################################################################
FROM src as production_src

RUN yarn build

################################################################################
# image: production
################################################################################
FROM ${NGINX_IMAGE} as production

RUN rm -rf /usr/share/nginx/html/ \
    && mkdir -p /usr/share/nginx/html/chomping-at-the-bit/

COPY --from=production_src /tmp/our/src/dist/ /usr/share/nginx/html/chomping-at-the-bit/
