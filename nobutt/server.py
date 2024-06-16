"""NoButt Server."""

import logging
from typing import AsyncContextManager

import websockets
from pydantic import ValidationError

from nobutt.messages import (
    Error,
    MessageSpecV3,
    MessageSpecV3Item,
    RequestServerInfo,
    ServerInfo,
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
            logger.info(f'<<<: {request}')
            try:
                request_messages = MessageSpecV3.model_validate_json(request)
            except ValidationError as validation_error:
                logger.error(f'Invalid JSON: {validation_error}')
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
        match message:
            case MessageSpecV3Item(request_server_info=RequestServerInfo()):
                return MessageSpecV3Item(
                    ServerInfo=ServerInfo(
                        Id=message.Id,
                        ServerName='NoButt',
                        MajorVersion=0,
                        MinorVersion=1,
                        BuildVersion=0,
                        MessageVersion=3,
                        MaxPingTime=0,
                    ),
                )
            case _:
                return MessageSpecV3Item(
                    Error=Error(
                        Id=0,
                        ErrorMessage='Unsupported message type',
                        ErrorCode=3,
                    ),
                )
