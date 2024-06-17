"""Test NoButtServer against the buttplug-py client."""

import asyncio
from typing import AsyncGenerator

import pytest
from buttplug import Client, ProtocolSpec, WebsocketConnector

from nobutt.device import NoButtDevice
from nobutt.messages import Device3, DeviceMessagesV3, GenericMessageAttributesV3
from nobutt.server import NoButtServer


@pytest.fixture
async def nobutt_server() -> AsyncGenerator[NoButtServer, None]:
    """Create a NoButtServer instance.

    Yields:
        Running NoButtServer instance.
    """
    devices = [
        NoButtDevice(device_spec=Device3(
            DeviceIndex=0,
            DeviceName='Test Vibrator',
            DeviceMessageTimingGap=100,
            DeviceDisplayName='Rabbit Vibrator',
            DeviceMessages=DeviceMessagesV3(
                ScalarCmd=[
                    GenericMessageAttributesV3(
                        StepCount=20,
                        FeatureDescriptor='Clitoral Stimulator',
                        ActuatorType='Vibrate',
                    ),
                    GenericMessageAttributesV3(
                        StepCount=20,
                        FeatureDescriptor='Insertable Vibrator',
                        ActuatorType='Vibrate',
                    ),
                ],
                StopDeviceCmd={},
            ),
        )),
    ]
    server = NoButtServer(devices=devices)
    async with server.serve():
        yield server


async def test_basic_flow(nobutt_server: NoButtServer) -> None:
    """Test the basic buttplug.io device flow.

    Args:
        nobutt_server: Running NoButtServer instance.
    """
    client = Client('Test Client', ProtocolSpec.v3)
    connector = WebsocketConnector(f'ws://127.0.0.1:{nobutt_server.port}', logger=client.logger)

    await client.connect(connector)

    await client.start_scanning()
    await asyncio.sleep(0.5)
    await client.stop_scanning()

    client.logger.info(f'Devices: {client.devices}')

    if client.devices:
        device = client.devices[0]

        if device.actuators:
            await device.actuators[0].command(0.5)

        if device.linear_actuators:
            await device.linear_actuators[0].command(1000, 0.5)

        if device.rotatory_actuators:
            await device.rotatory_actuators[0].command(0.5, clockwise=True)

    await client.disconnect()
