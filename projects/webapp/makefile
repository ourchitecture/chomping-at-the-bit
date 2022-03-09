tool:=yarn

.DEFAULT_GOAL:=start

all: check install

.PHONY: check
check:
ifeq '$(tool)' 'yarn'
	@yarn lint \
	&& yarn test:unit \
	&& yarn test:e2e \
		--headless
endif

.PHONY: install
install:
ifeq '$(tool)' 'yarn'
	@yarn build
endif

.PHONY: start
start:
ifeq '$(tool)' 'yarn'
	@yarn serve
endif

test: check
build: install
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
# 	&& rm -rf ./bit-chomping/
