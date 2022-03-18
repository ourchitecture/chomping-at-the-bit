.DEFAULT_GOAL:=install

all: install

.PHONY: book
book:
	@cd ./projects/book/ \
	&& make

.PHONY: website
website:
	@cd ./projects/website/ \
	&& make

.PHONY: install
install: book website

.PHONY: start
start:
	@cd ./projects/website/ \
	&& make start

.PHONY: pr
pr:
	@git-town new-pull-request
