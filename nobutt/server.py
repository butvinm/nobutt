"""NoButt Server."""

import logging
from typing import AsyncContextManager

import websockets
from pydantic import ValidationError

from nobutt.device import NoButtDevice
from nobutt.messages import (
    DeviceList,
    DeviceListModel2,
    Error,
    MessageSpecV3,
    MessageSpecV3Item,
    RequestDeviceList,
    RequestServerInfo,
    RequestServerInfoModel,
    ServerInfo,
    ServerInfoModel,
)

logger = logging.getLogger(__name__)


class NoButtServer:
    """NoButt Server.

    Current implementation only supports v3 of the buttplug.io message protocol.
    """

    def __init__(self, port: int = 12345):
        """Initialize the NoButt Server.

        Args:
            port: Port to listen for connections. Default is 12345.
        """
        self.port = port
        self.devices: list[NoButtDevice] = []

    def serve(self) -> AsyncContextManager[websockets.WebSocketServer]:
        """Start the NoButt Server.

        Example:
            async with server.serve():
                await asyncio.Future()  # run forever

        Returns:
            Async context manager as websockets.serve returns.
        """
        return websockets.serve(self._ws_handler, 'localhost', self.port)

    async def _ws_handler(self, websocket: websockets.WebSocketServerProtocol) -> None:
        """Handle and decode messages from the websocket.

        Args:
            websocket: Websocket connection.
        """
        async for request in websocket:
            logger.info(f'<<<: {request!r}')
            try:
                request_messages = MessageSpecV3.model_validate_json(request)
            except ValidationError as validation_error:
                logger.error(f'!!!: {validation_error}')
                response_messages = [MessageSpecV3Item(
                    Error=Error(
                        Id=0,
                        ErrorMessage=f'Invalid JSON: {validation_error}',
                        ErrorCode=3,
                    ),
                )]
            else:
                response_messages = [
                    await self._process_message(message)
                    for message in request_messages.root
                ]

            response = MessageSpecV3(root=response_messages).model_dump_json(by_alias=True, exclude_none=True)
            logger.info(f'>>>: {response}')
            await websocket.send(response)

    async def _process_message(self, message: MessageSpecV3Item) -> MessageSpecV3Item:
        """Process a message and return a response message.

        Args:
            message: Message to process.

        Returns:
            Response message.
        """
        if message.request_server_info is not None:
            return MessageSpecV3Item(
                ServerInfo=ServerInfoModel(
                    Id=message.request_server_info.id,
                    ServerName='NoButt',
                    MessageVersion=3,
                    MaxPingTime=0,
                ),
            )
        elif message.request_device_list is not None:
            return MessageSpecV3Item(
                DeviceList=DeviceListModel2(
                    Id=message.request_device_list.root.id,
                    Devices=[
                        device.device_spec
                        for device in self.devices
                    ],
                ),
            )

        return MessageSpecV3Item(
            Error=Error(
                Id=0,
                ErrorMessage='Unsupported message type',
                ErrorCode=3,
            ),
        )
