"""Errors of NoButt server."""


class NoButtError(Exception):
    """Base class for NoButt errors."""


class UnsupportedMessageVersionError(NoButtError):
    """Unsupported message version."""

    def __init__(self, message_version: int) -> None:
        """Initialize the error.

        Args:
            message_version: Message version.
        """
        super().__init__(f'Unsupported message version: {message_version}. NoButt supports only version 3.')
