LGBT_ECHO := ./scripts/toolz.sh lgbt_echo


.PHONY: check_prerequisites
check_prerequisites:
	@$(LGBT_ECHO) "Python version: $(shell python --version)"
	@$(LGBT_ECHO) "Poetry version: $(shell poetry --version)"
	@$(LGBT_ECHO) "Npm version: $(shell npm --version)"
	@sh ./scripts/check_hooks.sh


.PHONY: githooks-setup
githooks-setup:
	git config core.hooksPath .githooks


.PHONY: install
install: githooks-setup
	poetry install
	# todo: add npm install


.PHONY: generate
generate:
	poetry run generate
	# todo: add npm models generation
