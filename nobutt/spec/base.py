"""Base models for the protocol messages."""


from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class BaseMessageModel(BaseModel):
    """Base class for all protocol message models."""

    model_config = ConfigDict(
        extra='forbid',
        frozen=True,
    )
