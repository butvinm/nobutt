"""Test NoButtServer against the buttplug-py client."""

import asyncio

from buttplug import Client, ProtocolSpec, WebsocketConnector


async def main() -> None:
    client = Client('Test Client', ProtocolSpec.v3)
    client.logger.setLevel('DEBUG')
    connector = WebsocketConnector('ws://127.0.0.1:12345', logger=client.logger)

    await client.connect(connector)

    await client.start_scanning()
    await asyncio.sleep(0.5)
    await client.stop_scanning()

    client.logger.info(f'Devices: {client.devices}')

    if client.devices:
        device = client.devices[0]

        if device.actuators:
            await device.actuators[0].command(0.5)
            await asyncio.sleep(3)
            await device.actuators[0].command(0.1)
            await asyncio.sleep(3)

    await client.stop_all()
    await client.disconnect()


if __name__ == '__main__':
    asyncio.run(main())
