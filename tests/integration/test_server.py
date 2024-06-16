"""Test NoButtServer against the buttplug-py client."""

import asyncio
import logging
from typing import AsyncGenerator

import pytest
from buttplug import Client, ProtocolSpec, WebsocketConnector

from nobutt.server import NoButtServer


@pytest.fixture
async def nobutt_server() -> AsyncGenerator[NoButtServer, None]:
    """Create a NoButtServer instance.

    Yields:
        Running NoButtServer instance.
    """
    server = NoButtServer()
    async with server.serve():
        yield server


async def test_basic_flow(nobutt_server: NoButtServer) -> None:
    """Test the basic buttplug.io device flow.

    Args:
        nobutt_server: Running NoButtServer instance.
    """
    # This is a program that connects to a server, scans for devices, and lists
    # the found devices. It'll be copiously commented, so you have some idea
    # of what's going on and can maybe make something yourself.
    #
    # NOTE: We'll be talking about this in terms of execution flow, so you'll want
    # to start at the bottom and work your way up.

    # These are really the only things you actually need out of the library.
    # The Client and the *Connector are used to establish a connection to the server.
    # ProtocolSpec can be used to specify the protocol version that the client may use.

    # And now we're in the main function. First, we'll need to set up a client
    # object. This is our conduit to the server.
    # We create a Client object, passing it the name we want for the client.
    # Names are shown in things like Intiface Central. We also can specify the
    # protocol version we want to use, which will default to the latest version.
    client = Client('Test Client', ProtocolSpec.v3)

    # Now we have a client called 'Test Client', but it's not connected to
    # anything yet. We can fix that by creating a connector. Connectors
    # allow clients to talk to servers through different methods, including:
    # - Websockets
    # - IPC (Not currently available in Python)
    # - WebRTC (Not currently available in Python)
    # - TCP/UDP (Not currently available in Python)
    # For now, all we've implemented in python is a Websocket connector, so
    # we'll use that. This connector will connect to Intiface Central/Engine
    # on the local machine, using the 12345 port for insecure websockets.
    # We also pass the client logger so that it is used as the parent.
    connector = WebsocketConnector(f'ws://127.0.0.1:{nobutt_server.port}', logger=client.logger)

    # Finally, we connect.
    # If this succeeds, we'll be connected. If not, we'll probably have some
    # sort of exception thrown of type ButtplugError.
    await client.connect(connector)

    # Now we move on to looking for devices. We will tell the server to start
    # scanning for devices. It returns while it is scanning, so we will wait
    # for 10 seconds, and then we will tell the server to stop scanning.
    await client.start_scanning()
    await asyncio.sleep(10)
    await client.stop_scanning()

    # We can use the found devices as we see fit. The list of devices is
    # automatically kept up to date by the client:

    # First, we are going to list the found devices.
    client.logger.info(f'Devices: {client.devices}')

    # If we have any device we can access it by its ID:
    if client.devices:
        device = client.devices[0]

        # The most common case among devices is that they have some actuators
        # which accept a scalar value (0.0-1.0) as their command.
        if device.actuators:
            await device.actuators[0].command(0.5)

        # Some devices may have linear actuators which need a different command.
        # The first parameter is the time duration in ms and the second the
        # position for the linear axis (0.0-1.0).
        if device.linear_actuators:
            await device.linear_actuators[0].command(1000, 0.5)

        # Other devices may have rotatory actuators which another command.
        # The first parameter is the speed (0.0-1.0) and the second parameter
        # is a boolean, true for clockwise, false for anticlockwise.
        if device.rotatory_actuators:
            await device.rotatory_actuators[0].command(0.5, clockwise=True)

    # Now that we've done that, we just disconnect, and we're done!
    await client.disconnect()
