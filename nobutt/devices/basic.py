"""Basic implementations of NoButt virtual devices."""


import asyncio

from nobutt.devices.device import NoButtDevice, NoButtScalarActuator
from nobutt.spec.messages.v3.generic_devices.scalar_cmd import (
    Scalar,
    ScalarCmd,
)
from nobutt.spec.messages.v3.types.device import (
    Device,
    DeviceMessagesScalarCmd,
)
from nobutt.spec_utils.result import Error, Ok, Result, compose_results
from nobutt.spec_utils.types import ErrorCode


class BasicNoButtDevice(NoButtDevice):
    """Simple virtual device with in-memory actuators state management."""

    def __init__(self, spec: Device) -> None:
        """Initialize device.

        Actuators are initialized based on the supported device messages.

        Args:
            spec: Device specification.
        """
        self.spec = spec
        self.scalar_actuators = [
            BasicNoButtScalarActuator(scalar_cmd_spec)
            for scalar_cmd_spec in spec.DeviceMessages.ScalarCmd or []
        ]

    async def scalar_cmd(self, cmd: ScalarCmd) -> Result:
        """Execute scalar command.

        Command is executed only if all scalars are valid.

        Args:
            cmd: ScalarCmd command.

        Returns:
            Error: Index out of actuators range or some actuator command failed.
            Ok: All actuators processed successfully.
        """
        actuator_cmds = []
        for scalar in cmd.Scalars:
            if scalar.Index >= len(self.scalar_actuators):
                error_message = f'Index out of actuators list: scalar index was {scalar.Index}, but there are only {len(self.scalar_actuators)} actuators'
                return Error(
                    ErrorCode=ErrorCode.error_device,
                    ErrorMessage=error_message,
                )

            actuator_cmds.append(self.scalar_actuators[scalar.Index].scalar(scalar))

        results = await asyncio.gather(*actuator_cmds)
        return compose_results(results)

    async def stop_cmd(self) -> Result:
        """Stop all actuators.

        Returns:
            Error: Any actuator failed to stop (for what freaking reason?).
            Ok: All actuators stopped successfully.
        """
        results = await asyncio.gather(*[actuator.stop() for actuator in self.scalar_actuators])
        return compose_results(results)


class BasicNoButtScalarActuator(NoButtScalarActuator):
    """Virtual actuators supporting scalar commands."""

    def __init__(self, spec: DeviceMessagesScalarCmd) -> None:
        """Initialize scalar actuator.

        Args:
            spec: ScalarCmd specification.
        """
        self.spec = spec
        self.power = 0.0

    async def scalar(self, scalar: Scalar) -> Result:
        """Execute actuator command.

        Args:
            scalar: Scalar value to set.

        Returns:
            Error: Actuator type mismatch.
            Ok: Command executed successfully.
        """
        if scalar.ActuatorType != self.spec.ActuatorType:
            return Error(
                ErrorCode=ErrorCode.error_device,
                ErrorMessage='Actuator type mismatch',
            )

        self.power = scalar.Scalar
        return Ok()

    async def stop(self) -> Result:
        """Reset actuator power to 0.

        Returns:
            Always Ok.
        """
        self.power = 0.0
        return Ok()
