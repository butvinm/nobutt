import asyncio
from typing import AsyncGenerator

import pytest
from buttplug import Client, ProtocolSpec, WebsocketConnector

from nobutt.devices.basic import BasicNoButtDevice
from nobutt.server import NoButtServer
from nobutt.spec.messages.v3.types.device import (
    Device,
    DeviceMessagesModel,
    DeviceMessagesScalarCmd,
)


@pytest.fixture
async def nobutt_server() -> AsyncGenerator[NoButtServer, None]:
    devices = [
        BasicNoButtDevice(Device(
            DeviceName='DeviceMock0',
            DeviceIndex=0,
            DeviceMessages=DeviceMessagesModel(
                ScalarCmd=[
                    DeviceMessagesScalarCmd(
                        StepCount=10,
                        FeatureDescriptor='Simple Vibrator',
                        ActuatorType='Vibrator',
                    ),
                ],
            ),
        )),
    ]
    server = NoButtServer(devices=devices)
    async with server.serve():
        yield server


@pytest.mark.timeout(5)
async def test_basic_flow(nobutt_server: NoButtServer) -> None:
    client = Client('TestClient', ProtocolSpec.v3)
    connector = WebsocketConnector(f'ws://127.0.0.1:{nobutt_server._port}', logger=client.logger)
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
