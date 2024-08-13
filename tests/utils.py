from pathlib import Path
from typing import Type
from unittest.mock import MagicMock

from pydantic import TypeAdapter


def parse_test_cases[T](test_case_type: Type[T], cases_path: Path) -> list[T]:
    return TypeAdapter(list[test_case_type]).validate_json(cases_path.read_text())


class AsyncMock(MagicMock):
    async def __call__(self, *args, **kwargs):
        return super(AsyncMock, self).__call__(*args, **kwargs)
