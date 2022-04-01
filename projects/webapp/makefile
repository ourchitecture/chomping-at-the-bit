################################################################################
# READ: https://www.gnu.org/software/make/manual/make.html
#
# Describes the cross-platform automation tasks for the project to be run for:
# - local development builds and testing
# - DevOps pipelines builds and testing
# - production builds
#
# `podman` developer: *recommended
#   Run `make` commands with "tool=podman" e.g. `make check tool=podman`.
#
# `docker` developer:
#   Run `make` commands with "tool=docker" e.g. `make check tool=docker`.
#
# `yarn` and `npm` developers:
#   For consistency, we ask that you use either `podman` or `docker`.
#   Though, you'll find that standard commands should work.
################################################################################

app_port:=80

# tool=[docker|podman]
tool:=docker

# See each stage name listed in the multi-stage dockerfile ("docker_file_path")
docker_target:=production

docker_tag:=ourchitecture/chomping-at-the-bit:local
docker_file_path:=./Dockerfile
docker_context:=./
docker_name:=chomping-at-the-bit
docker_host_port:=8080

.DEFAULT_GOAL:=check

all: build check

.PHONY: build
build:
	@DOCKER_FILE_PATH=$(docker_file_path) \
	TAG=$(docker_tag) \
	CONTEXT=$(docker_context) \
	./build.sh

.PHONY: start
start: build
	@APP_PORT=$(app_port) \
	HOST_PORT=$(docker_host_port) \
	TAG=$(docker_tag) \
	NAME=$(docker_name) \
	./start.sh

.PHONY: stop
stop:
	@NAME="$(docker_name)" \
	RUNTIME_ENV=$(env) \
	./stop.sh

.PHONY: restart
restart: stop start

.PHONY: check-lint
check-lint:
	@DOCKER_FILE_PATH=$(docker_file_path) \
	TAG=$(docker_tag) \
	CONTEXT=$(docker_context) \
	./lint.sh

lint: check-lint
check-styles: check-lint

.PHONY: check-unit-tests
check-unit-tests:
	@DOCKER_FILE_PATH=$(docker_file_path) \
	TAG=$(docker_tag) \
	CONTEXT=$(docker_context) \
	./unit-tests.sh

check-unit: check-unit-tests
unit-tests: check-unit-tests
unit: check-unit-tests

.PHONY: check-e2e-tests
check-e2e-tests:
	@DOCKER_FILE_PATH=$(docker_file_path) \
	TAG=$(docker_tag) \
	CONTEXT=$(docker_context) \
	./e2e-tests.sh

check-e2e: check-e2e-tests
e2e-tests: check-e2e-tests
e2e: check-e2e-tests

check: check-lint check-unit-tests check-e2e-tests

.PHONY: release
release: check
	@./release.sh
