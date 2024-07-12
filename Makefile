.PHONY: check_prerequisites
check_prerequisites:
	@echo "Python version: $(shell python --version)"
	@echo "Poetry version: $(shell poetry --version)"
	@echo "Npm version: $(shell npm --version)"


.PHONY: install
install:
	poetry install
	npm --prefix web install


.PHONY: generate
generate:
	poetry run generate
	npm --prefix web run json2ts
