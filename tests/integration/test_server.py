import asyncio
from typing import AsyncGenerator, cast

import pytest
from buttplug import Client, ProtocolSpec, WebsocketConnector

from nobutt.devices.basic import BasicNoButtDevice
from nobutt.server import NoButtServer
from nobutt.spec.messages.v3.types.device import (
    Device,
    DeviceMessagesModel,
    DeviceMessagesScalarCmd,
    DeviceMessagesStopDeviceCmd,
)


@pytest.fixture
async def server() -> AsyncGenerator[NoButtServer, None]:
    devices = [
        BasicNoButtDevice(Device(
            DeviceName='MockVibrator',
            DeviceIndex=0,
            DeviceMessages=DeviceMessagesModel(
                ScalarCmd=[
                    DeviceMessagesScalarCmd(
                        StepCount=10,
                        FeatureDescriptor='Simple Vibrator',
                        ActuatorType='Vibrator',
                    ),
                ],
                StopDeviceCmd=DeviceMessagesStopDeviceCmd(),
            ),
        )),
        BasicNoButtDevice(Device(
            DeviceName='MockVibrator2',
            DeviceIndex=1,
            DeviceMessages=DeviceMessagesModel(
                ScalarCmd=[
                    DeviceMessagesScalarCmd(
                        StepCount=10,
                        FeatureDescriptor='Simple Vibrator 2',
                        ActuatorType='Vibrator',
                    ),
                ],
                StopDeviceCmd=DeviceMessagesStopDeviceCmd(),
            ),
        )),
    ]
    server = NoButtServer(devices=devices)
    async with server.serve():
        yield server


@pytest.mark.timeout(5)
async def test_basic_flow(server: NoButtServer) -> None:
    client = Client('TestClient', ProtocolSpec.v3)
    connector = WebsocketConnector(f'ws://127.0.0.1:{server._port}', logger=client.logger)
    await client.connect(connector)

    # Scanning phase
    await client.start_scanning()
    await asyncio.sleep(0.1)
    await client.stop_scanning()

    assert len(client.devices) == 2

    # add/remove device
    await server.add_device(BasicNoButtDevice(Device(
        DeviceName='MockVibrator3',
        DeviceIndex=2,
        DeviceMessages=DeviceMessagesModel(
            ScalarCmd=[
                DeviceMessagesScalarCmd(
                    StepCount=10,
                    FeatureDescriptor='Simple Vibrator 3',
                    ActuatorType='Vibrator',
                ),
            ],
            StopDeviceCmd=DeviceMessagesStopDeviceCmd(),
        ),
    )))
    await asyncio.sleep(0.1)
    assert len(client.devices) == 3

    await server.remove_device(2)
    await asyncio.sleep(0.1)
    assert len(client.devices) == 2

    # scalar command
    for device in client.devices.values():
        for actuator in device.actuators:
            await actuator.command(0.5)

    for device in server._devices.values():
        device = cast(BasicNoButtDevice, device)
        for actuator in device.scalar_actuators:
            assert actuator.power == 0.5

    # stop specific device
    await client.devices[0].stop()
    assert cast(BasicNoButtDevice, server._devices[0]).scalar_actuators[0].power == 0

    # stop all devices
    await client.stop_all()
    for device in server._devices.values():
        device = cast(BasicNoButtDevice, device)
        for actuator in device.scalar_actuators:
            assert actuator.power == 0

    await client.disconnect()
