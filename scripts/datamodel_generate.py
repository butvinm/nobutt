"""Generate Pydantic models for protocol schemas defined in the /schemas directory."""


from pathlib import Path

from datamodel_code_generator import (
    DataModelType,
    InputFileType,
    PythonVersion,
    generate,
)


def main() -> None:
    """Script entry point."""
    json_schema = Path('./spec')
    output = Path('./nobutt/spec')

    generate(
        json_schema,
        input_file_type=InputFileType.JsonSchema,
        output=output,
        output_model_type=DataModelType.PydanticV2BaseModel,
        use_annotated=True,
        field_constraints=True,
        use_subclass_enum=True,
        use_union_operator=True,
        use_field_description=True,
        use_schema_description=True,
        collapse_root_models=True,
        enable_faux_immutability=True,
        use_title_as_name=True,
        snake_case_field=False,
        target_python_version=PythonVersion.PY_312,
        base_class='nobutt.spec.base.BaseMessageModel',
    )
