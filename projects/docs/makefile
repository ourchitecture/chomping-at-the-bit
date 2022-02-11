# docker | podman
tool=docker

container_mkdocs_tag:=ghcr.io/ourchitecture/hello-cloud/our-hello-tasks-mkdocs-material:8.1.3

container_docs_name:=catb-docs

container_internal_port=8000
container_host_port:=8000

.DEFAULT_GOAL:=install

all: install

.PHONY: validate-tool
validate-tool:
ifneq ("$(tool)",$(filter "$(tool)","docker" "podman"))
	$(error The "$@" command target only supports "tool=docker" or "tool=podman")
endif

# If you get a "denied" response when pulling the MkDocs base container image, please:
# 1) create a GitHub Personal Access Token (PAT) with "packages:read" permission
# 2) store the PAT in a local file (e.g. `echo "MY_PAT" >> ~/GITHUB_TOKEN_PACKAGES_READER")
# 3) store the path to that file in a variable (e.g. `export GITHUB_TOKEN_PACKAGES_READER_FILE_PATH=~/GITHUB_TOKEN_PACKAGES_READER`)
# 4) store your GitHub username in a variable (e.g. `export GITHUB_USER_NAME=my-github-user-name`)
# 5) login (e.g. `cat $GITHUB_TOKEN_PACKAGES_READER_FILE_PATH | docker login ghcr.io -u $GITHUB_USER_NAME --password-stdin`)
.PHONY: init
init:
	@$(tool) pull $(container_mkdocs_tag) \
	&& $(tool) tag $(container_mkdocs_tag) mkdocs

# "MSYS_NO_PATHCONV" see: https://stackoverflow.com/a/34386471/6258497
.PHONY: install
install: validate-tool init
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--name="$(container_docs_name)" \
		--rm \
		--interactive \
		--tty \
		--volume "$(shell pwd)/../../":/src \
		--workdir /src/projects/docs/ \
		mkdocs \
		build \
			--clean \
			--site-dir ../../docs \
			--config-file ./mkdocs.yml

# "MSYS_NO_PATHCONV" see: https://stackoverflow.com/a/34386471/6258497
.PHONY: start
start: validate-tool init
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--name="$(container_docs_name)" \
		--rm \
		--interactive \
		--tty \
		--volume "$(shell pwd)/../../":/src \
		--workdir /src/projects/docs/ \
		--publish $(container_internal_port):$(container_host_port) \
		mkdocs \
		serve \
			-a 0.0.0.0:$(container_internal_port) \
			--livereload \
			--watch-theme \
			--config-file ./mkdocs.yml
