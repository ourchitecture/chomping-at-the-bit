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

# tool=[docker|podman|yarn]
tool:=docker

# See each stage name listed in the multi-stage dockerfile ("container_file_path")
container_target:=production

container_tag:=ourchitecture/chomping-at-the-bit:local
container_file_path:=./Dockerfile
container_context:=./
container_name:=chomping-at-the-bit
container_host_port:=8080

.DEFAULT_GOAL:=check

all: build check

.PHONY: build
build:
	@FILE_PATH=$(container_file_path) \
	TAG=$(container_tag) \
	CONTEXT=$(container_context) \
	TOOL=$(tool) \
	./build.sh

.PHONY: start
start:
	@APP_PORT=$(app_port) \
	HOST_PORT=$(container_host_port) \
	FILE_PATH=$(container_file_path) \
	TAG=$(container_tag) \
	CONTEXT=$(container_context) \
	TOOL=$(tool) \
	./start.sh

.PHONY: serve
serve: start

.PHONY: stop
stop:
	@TOOL=$(tool) \
	./stop.sh

.PHONY: restart
restart: stop start

.PHONY: check-lint
check-lint:
	@FILE_PATH=$(container_file_path) \
	TAG=$(container_tag) \
	CONTEXT=$(container_context) \
	TOOL=$(tool) \
	./lint.sh

.PHONY: lint
lint: check-lint

.PHONY: check-styles
check-styles: check-lint

.PHONY: check-unit-test
check-unit-test:
	@FILE_PATH=$(container_file_path) \
	TAG=$(container_tag) \
	CONTEXT=$(container_context) \
	TOOL=$(tool) \
	./unit-test.sh

.PHONY: check-unit
check-unit: check-unit-test

.PHONY: unit-test
unit-test: check-unit-test

.PHONY: unit
unit: check-unit-test

.PHONY: check-e2e-test
check-e2e-test:
	@FILE_PATH=$(container_file_path) \
	TAG=$(container_tag) \
	CONTEXT=$(container_context) \
	TOOL=$(tool) \
	./e2e-test.sh

.PHONY: check-e2e
check-e2e: check-e2e-test

.PHONY: e2e-test
e2e-test: check-e2e-test

.PHONY: e2e
e2e: check-e2e-test

.PHONY: check
check: check-lint check-unit-test check-e2e-test

.PHONY: test
test: check

.PHONY: release
release: check
	@TOOL=$(tool) \
	./release.sh
