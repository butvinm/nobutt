from pathlib import Path

import pytest
from pydantic import BaseModel

from nobutt.spec.messages.v3.messages import Message
from nobutt.spec_utils.messages import (
    pack_messages,
    unwrap_message,
    wrap_message,
)
from nobutt.spec_utils.types import MessageType
from tests.utils import parse_test_cases

CASES = Path(__file__).parent / 'test_cases'


class UnwrapMessageCase(BaseModel):
    ids: str
    raw_message: Message
    expected_message: MessageType


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(UnwrapMessageCase, CASES / 'unwrap_message.json'),
)
def test_unwrap_message_success(test_case: UnwrapMessageCase) -> None:
    assert unwrap_message(test_case.raw_message) == test_case.expected_message


class UnwrapMessageExceptionCase(BaseModel):
    ids: str
    raw_message: Message
    expected_error: str


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(UnwrapMessageExceptionCase, CASES / 'unwrap_message_exception.json'),
)
def test_unwrap_message_exception(test_case: UnwrapMessageExceptionCase) -> None:
    with pytest.raises(ValueError, match=test_case.expected_error):
        unwrap_message(test_case.raw_message)


class WrapMessageCase(BaseModel):
    ids: str
    message: tuple[str, Message]  # if we just use MessageType, pydantic will struggle to parse correct message
    expected_raw_message: Message


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(WrapMessageCase, CASES / 'wrap_message.json'),
)
def test_wrap_message_success(test_case: WrapMessageCase) -> None:
    message = getattr(test_case.message[1], test_case.message[0])
    assert wrap_message(message) == test_case.expected_raw_message


class PackMessagesCase(BaseModel):
    ids: str
    messages: list[MessageType]
    expected: str


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(PackMessagesCase, CASES / 'pack_messages.json'),
)
def test_pack_messages_success(test_case: PackMessagesCase) -> None:
    assert pack_messages(*test_case.messages) == test_case.expected
