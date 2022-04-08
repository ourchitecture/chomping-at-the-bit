.DEFAULT_GOAL:=start

all: install

.PHONY: book
book:
	@cd ./projects/book/ \
	&& make

.PHONY: docs
docs:
	@cd ./projects/webapp/ \
	&& make install

.PHONY: install
install: book docs

.PHONY: start
start:
	@cd ./projects/webapp/ \
	&& make start tool=yarn

.PHONY: pr
pr:
	@git-town new-pull-request
