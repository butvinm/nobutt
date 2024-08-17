"""Auxiliary functions for working with messages."""

from typing import cast

from nobutt.spec.messages.v3.messages import Message, Messages
from nobutt.spec_utils.types import MessageType


def unwrap_message(raw_message: Message) -> MessageType:
    """Extract actual message from the raw message model.

    Args:
        raw_message: Protocol message object as it received/sent expected to have single not-none field with actual message object.

    Raises:
        ValueError: Message model contains any or more than one not-none message fields that is unexpected format.

    Returns:
        Not-none message field or none if any found.
    """
    if not raw_message.model_fields_set:
        raise ValueError('Message doesn`t contains any message field.')

    if len(raw_message.model_fields_set) > 1:
        raise ValueError('Message contains more than 1 not-none message field.')

    not_none_field = next(iter(raw_message.model_fields_set))
    return cast(MessageType, getattr(raw_message, not_none_field))


def wrap_message(message: MessageType) -> Message:
    """Wrap message in the raw message model.

    Args:
        message: Actual message object to wrap.

    Returns:
        Raw message model with single not-none field with actual message object.
    """
    return Message(**{message.__class__.__name__: message})


def pack_messages(*messages: MessageType) -> str:
    """Pack messages to send via WebSocket.

    Args:
        messages: Messages to pack.

    Returns:
        Packed messages as JSON string.
    """
    raw_messages = [wrap_message(message) for message in messages]
    return Messages(raw_messages).model_dump_json(exclude_none=True)
