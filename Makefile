.PHONY: check_prerequisites
check_prerequisites:
	@echo "Python version: $(shell python --version)"
	@echo "Poetry version: $(shell poetry --version)"
	@echo "Npm version: $(shell npm --version)"
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
