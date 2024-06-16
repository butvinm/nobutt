import asyncio
import json
from typing import Any

import websockets


def process_message(message_type: str, message_data: dict[str, Any]) -> str:
    if message_type == "RequestServerInfo":
        response = [{
            "ServerInfo": {
                "Id": message_data["Id"],
                "ServerName": "Test Server",
                "MessageVersion": 3,
                "MaxPingTime": 0,
            }
        }]
    elif message_type == "RequestDeviceList":
        response = [{
            "DeviceList": {
                "Id": message_data["Id"],
                "Devices": [
                    {
                        "DeviceName": "Test Vibrator",
                        "DeviceIndex": 0,
                        "DeviceMessages": {
                            "ScalarCmd": [
                                {
                                    "StepCount": 20,
                                    "FeatureDescriptor": "Clitoral Stimulator",
                                    "ActuatorType": "Vibrate"
                                },
                                {
                                    "StepCount": 20,
                                    "FeatureDescriptor": "Insertable Vibrator",
                                    "ActuatorType": "Vibrate"
                                }
                            ],
                            "StopDeviceCmd": {}
                        }
                    },
                    {
                        "DeviceName": "Test Stroker",
                        "DeviceIndex": 1,
                        "DeviceMessageTimingGap": 100,
                        "DeviceDisplayName": "User set name",
                        "DeviceMessages": {
                            "LinearCmd": [
                                {
                                    "StepCount": 100,
                                    "FeatureDescriptor": "Stroker",
                                    "ActuatorType": "Linear"
                                }
                            ],
                            "StopDeviceCmd": {}
                        }
                    }
                ]
            }
        }]
    elif message_type == "StartScanning":
        response = [{
            "Ok": {
                "Id": message_data["Id"],
            }
        }]
    elif message_type == "StopScanning":
        response = [{
            "Ok": {
                "Id": message_data["Id"],
            }
        }]
    else:
        response = [{
            "Error": {
                "Id": message_data["Id"],
                "ErrorMessage": "Unsupported message type",
                "ErrorCode": 0
            }
        }]

    print("response:", response)
    return json.dumps(response)


async def hello(websocket):
    async for request in websocket:
        messages: list[dict[str, dict[str, Any]]] = json.loads(request)
        print("request:", messages)

        for message in messages:
            message_type, message_data = message.popitem()
            response = process_message(message_type, message_data)
            await websocket.send(response)


async def main():
    async with websockets.serve(hello, "localhost", 12345):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
