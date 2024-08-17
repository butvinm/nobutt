from pathlib import Path
from typing import Type

from pydantic import TypeAdapter


def parse_test_cases[T](test_case_type: Type[T], cases_path: Path) -> list[T]:
    return TypeAdapter(list[test_case_type]).validate_json(cases_path.read_text())  # type: ignore
