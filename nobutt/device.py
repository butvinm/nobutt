"""NoButt Device mock."""


from nobutt.messages import Device3


class NoButtDevice:
    """Device mock that changes its state based on the messages it receives."""

    def __init__(self, device_spec: Device3) -> None:
        """Initialize the NoButt Device.

        Args:
            device_spec: Device specification.
        """
        self.device_spec = device_spec
