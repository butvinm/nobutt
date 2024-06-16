.PHONY: update-schema
update-schema:
	curl https://raw.githubusercontent.com/nobutt/nobutt/main/schema.json -o schema.json


.PHONY: generate
generate:
	datamodel-codegen \
		--input schema.json \
		--input-file-type jsonschema \
		--output nobutt/messages.py \
		--output-model-type pydantic_v2.BaseModel \
		--field-constraints \
		--use-subclass-enum \
		--use-union-operator \
		--snake-case-field
