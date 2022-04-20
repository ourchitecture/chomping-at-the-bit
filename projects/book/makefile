# docker | podman
tool=docker

container_asciidoctor_tag:=asciidoctor/docker-asciidoctor:1.17

output_file_path:=./projects/webapp/public/assets/book/chomping-at-the-bit.pdf

.DEFAULT_GOAL:=install

all: install

.PHONY: validate-tool
validate-tool:
ifneq ("$(tool)",$(filter "$(tool)","docker" "podman"))
	$(error The "$@" command target only supports "tool=docker" or "tool=podman")
endif

.PHONY: init
init:
ifndef OFFLINE
	@$(tool) pull $(container_asciidoctor_tag)
endif
	@$(tool) tag $(container_asciidoctor_tag) asciidoctor

.PHONY: help
help: validate-tool init
	@$(tool) run \
		--name="$(container_docs_name)" \
		--rm \
		--interactive \
		--tty \
		asciidoctor \
		asciidoctor-pdf --help

# "MSYS_NO_PATHCONV" see: https://stackoverflow.com/a/34386471/6258497
.PHONY: install
install: validate-tool init
	@MSYS_NO_PATHCONV=1 \
	$(tool) run \
		--name="$(container_docs_name)" \
		--rm \
		--interactive \
		--tty \
		--volume "$(shell pwd)/../../":/documents/ \
		--workdir /documents/ \
		asciidoctor \
		asciidoctor-pdf \
			./projects/book/src/index.adoc \
			--out-file $(output_file_path)

.PHONY: pdf
pdf: install
