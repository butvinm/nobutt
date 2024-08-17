"""NoButt virtual devices interface."""


from typing import Protocol

from nobutt.spec.messages.v3.generic_devices.scalar_cmd import (
    Scalar,
    ScalarCmd,
)
from nobutt.spec.messages.v3.types.device import (
    Device,
    DeviceMessagesScalarCmd,
)
from nobutt.spec_utils.result import Result


class NoButtDevice(Protocol):
    """Virtual device."""

    spec: Device

    async def scalar_cmd(self, cmd: ScalarCmd) -> Result:
        """Execute scalar command.

        Args:
            cmd: Scalar command as defined in the Buttplug spec.
        """

    async def stop_device_cmd(self) -> Result:
        """Stop all actuators."""


class NoButtScalarActuator(Protocol):
    """Virtual scalar actuator."""

    spec: DeviceMessagesScalarCmd

    async def scalar(self, scalar: Scalar) -> Result:
        """Set new power level.

        Args:
            scalar: Single scalar of the scalar command.
        """

    async def stop(self) -> Result:
        """Stop actuator."""
