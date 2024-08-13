from pathlib import Path

import pytest
from pydantic import BaseModel

from nobutt.spec.messages.v3 import status
from nobutt.spec_utils.types import ErrorCode
from nobutt.spec_utils.result import Error, Ok, Result, compose_results
from tests.utils import parse_test_cases

CASES = Path(__file__).parent / 'test_cases'


def test_ok_to_message() -> None:
    ok = Ok()
    assert ok.to_message(1) == status.ok.Ok(Id=1)


def test_error_to_message() -> None:
    error = Error(ErrorCode=ErrorCode.error_device, ErrorMessage='Error message')
    assert error.to_message(1) == status.error.Error(Id=1, ErrorCode=status.error.ErrorCode.int_4, ErrorMessage='Error message')


class ComposeResultsCase(BaseModel):
    ids: str
    results: list[Result]
    expected: Result


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(ComposeResultsCase, CASES / 'compose_results.json'),
)
def test_compose_results(test_case: ComposeResultsCase) -> None:
    assert compose_results(test_case.results) == test_case.expected
