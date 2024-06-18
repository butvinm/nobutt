import asyncio
import logging

from nobutt.device import NoButtDevice
from nobutt.messages import (
    Device3,
    DeviceMessagesV3,
    GenericMessageAttributesV3,
)
from nobutt.server import NoButtServer


async def main() -> None:
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
        await asyncio.Future()  # run forever


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    asyncio.run(main())
