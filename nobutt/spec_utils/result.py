"""Partial status messages that can be used as results of internal functions and transformed into actual messages later."""


from pydantic import BaseModel

from nobutt.spec.messages.v3 import status
from nobutt.spec_utils.types import ErrorCode


class Ok(BaseModel):
    """Ok result."""

    def to_message(self, id_: int) -> status.ok.Ok:
        """Convert to a message.

        Args:
            id_: Message id.

        Returns:
            Message.
        """
        return status.ok.Ok(Id=id_)


class Error(BaseModel):
    """Error result."""

    ErrorCode: ErrorCode
    ErrorMessage: str

    def to_message(self, id_: int) -> status.error.Error:
        """Convert to a message.

        Args:
            id_: Message id.

        Returns:
            Message.
        """
        return status.error.Error(Id=id_, ErrorCode=self.ErrorCode, ErrorMessage=self.ErrorMessage)


type Result = Ok | Error


def compose_results(results: list[Result]) -> Result:
    """Compose multiple results into one.

    Args:
        results: List of results.

    Returns:
        Ok: If all results are Ok.
        Error: If any result is Error. Assumes that all error codes are the same.
    """
    errors = [result for result in results if isinstance(result, Error)]
    if errors:
        error_code = errors[0].ErrorCode
        error_message = '; '.join(failure.ErrorMessage for failure in errors)
        return Error(
            ErrorCode=error_code,
            ErrorMessage=error_message,
        )

    return Ok()
