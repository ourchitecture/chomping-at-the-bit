# docker | podman
tool=docker

container_asciidoctor_tag:=asciidoctor/docker-asciidoctor:1.17

.DEFAULT_GOAL:=install

all: install

.PHONY: validate-tool
validate-tool:
ifneq ("$(tool)",$(filter "$(tool)","docker" "podman"))
	$(error The "$@" command target only supports "tool=docker" or "tool=podman")
endif

.PHONY: init
init:
	@$(tool) pull $(container_asciidoctor_tag) \
	&& $(tool) tag $(container_asciidoctor_tag) asciidoctor

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
			--out-file ./projects/website/src/assets/documents/chomping-at-the-bit.pdf

.PHONY: pdf
pdf: install
