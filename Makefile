.PHONY: check_prerequisites
check_prerequisites:
	@echo "Python version: $(shell python --version)"
	@echo "Poetry version: $(shell poetry --version)"
	@echo "Npm version: $(shell npm --version)"


.PHONY: install
install:
	poetry install
	# todo: add npm install


.PHONY: generate
generate:
	poetry run generate
	# todo: add npm models generation
