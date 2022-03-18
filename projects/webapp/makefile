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
# `yarn` developer:
#   Run `make` commands with "tool=yarn" e.g. `make check tool=yarn`.
#
# `npm` developer:
#   Run `make` commands with "tool=npm" e.g. `make check tool=npm`.
################################################################################

# tool=[yarn|podman|docker]
tool:=yarn

# env=[container|host]
env:=container

# skip_init=[0|1]
# if set to "1", the init task will be skipped
skip_init:=0

docker_file_path:=./docker/Dockerfile
docker_target:=development
docker_tag:=ourchitecture/books/bit-chomping

.DEFAULT_GOAL:=start

all: check install

.PHONY: release
release:
	@rm --recursive --force ../../docs/ \
	&& mkdir ../../docs/ \
	&& cp --recursive ./dist/* ../../docs/

.PHONY: init
init:
ifeq ("$(skip_init)",$(filter "$(skip_init)","0" "no" "false"))
ifeq '$(tool)' 'yarn'
	@yarn \
	&& ./node_modules/cypress/bin/cypress install \
	&& echo 'y' | npx browserslist@latest --update-db
else ifeq ("$(tool)",$(filter "$(tool)","docker" "podman"))
	@$(tool) build \
		--tag="$(docker_tag)" \
		--file="${docker_file_path}" \
		--target="${docker_target}" \
		./
endif
endif

.PHONY: dev
dev:
ifeq '$(env)' 'container'
	$(error Error: The "env" variable must be set to "host" for the target $@)
endif
ifeq ("$(tool)",$(filter "$(tool)","docker" "podman"))
	@make init
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--rm \
		--interactive \
		--tty \
		--volume="$(shell pwd)":/app \
		--workdir=/app \
		$(docker_tag) \
		/bin/bash
endif

.PHONY: check-lint
check-lint: init
ifeq '$(tool)' 'yarn'
	@yarn lint
else ifeq ("$(tool)",$(filter "$(tool)","podman" "docker"))
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--rm \
		--interactive \
		--volume="$(shell pwd)":/app \
		--workdir=/app \
		$(docker_tag) \
		make $@
endif

test-lint: check-lint
lint: check-lint

.PHONY: check-unit
check-unit: init
ifeq '$(tool)' 'yarn'
	@yarn test:unit
else ifeq ("$(tool)",$(filter "$(tool)","podman" "docker"))
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--rm \
		--interactive \
		--volume="$(shell pwd)":/app \
		--workdir=/app \
		$(docker_tag) \
		make $@
endif

test-unit: check-unit
unit: check-unit

.PHONY: check-e2e
check-e2e: init
ifeq '$(tool)' 'yarn'
	@yarn test:e2e --headless
else ifeq ("$(tool)",$(filter "$(tool)","podman" "docker"))
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--rm \
		--interactive \
		--volume="$(shell pwd)":/app \
		--workdir=/app \
		$(docker_tag) \
		make $@
endif

test-e2e: check-e2e
e2e: check-e2e

.PHONY: check
check: init
ifeq '$(tool)' 'yarn'
	@yarn lint \
	&& yarn test:unit \
	&& yarn test:e2e --headless
else ifeq ("$(tool)",$(filter "$(tool)","podman" "docker"))
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--rm \
		--interactive \
		--volume="$(shell pwd)":/app \
		--workdir=/app \
		$(docker_tag) \
		make $@
endif

test: check

.PHONY: install
install: init
ifeq '$(tool)' 'yarn'
	@yarn build
else ifeq ("$(tool)",$(filter "$(tool)","podman" "docker"))
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--rm \
		--interactive \
		--volume="$(shell pwd)":/app \
		--workdir=/app \
		$(docker_tag) \
		make $@
endif

build: install

.PHONY: start
start: init
ifeq '$(tool)' 'yarn'
	@yarn serve
else ifeq ("$(tool)",$(filter "$(tool)","podman" "docker"))
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--rm \
		--interactive \
		--volume="$(shell pwd)":/app \
		--workdir=/app \
		$(docker_tag) \
		make $@
endif

serve: start

# IMPORTANT: one-time task! This task was executed to create the initial project.
# The command is documented here for posterity's sake.
# - `echo 'N' |` to pipe an answer to the prompt "? Create free Ionic account? No"
# - `npm exec ...` to create the new application
# - `shopt -s gotglob` to include "dotfiles" (e.g. ".gitignore") in file operations
# - `mv ...` to move the files out of the sub-directory to the current directory
# - `rm ...` to remove the sub-directory
# .PHONY: create
# create:
# 	@echo 'N' | \
# 	npm exec \
# 		--yes \
# 		-- \
# 		@ionic/cli \
# 			start \
# 			bit-chomping \
# 			--type=vue \
# 			blank \
# 	&& shopt -s dotglob \
# 	&& mv ./bit-chomping/ ./ \
# 	&& rm --recursive --force ./bit-chomping/
