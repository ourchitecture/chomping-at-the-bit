.DEFAULT_GOAL:=start

tool:=yarn

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
	&& make start tool=$(tool)

.PHONY: sync
sync:
	@git-town sync

.PHONY: main
main:
	@git checkout main
	@make sync
	@git-town prune-branches

.PHONY: pr
pr:
	@git-town new-pull-request
