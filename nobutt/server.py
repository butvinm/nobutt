"""NoButt implementation of the Buttplug Server."""

import asyncio
from typing import Any, AsyncGenerator, Iterable

import websockets as ws
from pydantic import ValidationError

from nobutt.devices.device import NoButtDevice
from nobutt.spec.messages.v3.enumeration.device_added import DeviceAdded
from nobutt.spec.messages.v3.enumeration.device_list import DeviceList
from nobutt.spec.messages.v3.enumeration.request_device_list import (
    RequestDeviceList,
)
from nobutt.spec.messages.v3.enumeration.scanning_finished import (
    ScanningFinished,
)
from nobutt.spec.messages.v3.enumeration.start_scanning import StartScanning
from nobutt.spec.messages.v3.enumeration.stop_scanning import StopScanning
from nobutt.spec.messages.v3.generic_devices.scalar_cmd import ScalarCmd
from nobutt.spec.messages.v3.generic_devices.stop_all_devices import (
    StopAllDevices,
)
from nobutt.spec.messages.v3.generic_devices.stop_device_cmd import (
    StopDeviceCmd,
)
from nobutt.spec.messages.v3.handshake.request_server_info import (
    RequestServerInfo,
)
from nobutt.spec.messages.v3.handshake.server_info import ServerInfo
from nobutt.spec.messages.v3.messages import Message, Messages
from nobutt.spec.messages.v3.status.error import Error
from nobutt.spec.messages.v3.status.ok import Ok
from nobutt.spec_utils.messages import pack_messages, unwrap_message
from nobutt.spec_utils.result import compose_results
from nobutt.spec_utils.types import (
    SYSTEM_MESSAGE_ID,
    ErrorCode,
    MessageType,
    MessageVersion,
)

_DefaultDevices: Any = object()


class NoButtServer:
    """Buttplug server mock.

    Communicate with clients via websockets using Buttplug protocol
    and correspondingly maintain state of the virtual devices.
    """

    def __init__(
        self,
        devices: Iterable[NoButtDevice] = _DefaultDevices,
        port: int = 12345,
    ) -> None:
        """Initialize server.

        Args:
            port: Websocket port server listens on. Buttplug default port is 12345.
            devices: Initial virtual devices list. Default is empty.
        """
        self._port = port
        self._devices = [] if devices is _DefaultDevices else list(devices)
        self._clients: set[ws.WebSocketServerProtocol] = set()

    def serve(self) -> ws.serve:
        """Start NoButt server.

        Returns:
            Instance of websockets.serve that can be used as a context manager.
        """
        return ws.serve(self._connection_handler, host='localhost', port=self._port)

    async def add_device(self, device: NoButtDevice) -> None:
        """Add virtual device to the server.

        Args:
            device: Virtual device.
        """
        self._devices.append(device)
        # ???
        if self._clients:
            response = DeviceAdded(Id=SYSTEM_MESSAGE_ID, **device.spec.model_dump())
            ws.broadcast(self._clients, pack_messages(response))

    async def _connection_handler(self, client: ws.WebSocketServerProtocol) -> None:
        """Register new client connection.

        Args:
            client: New client connection.
        """
        self._clients.add(client)
        async for request_data in client:
            await self._request_handler(client, request_data)

    async def _request_handler(self, client: ws.WebSocketServerProtocol, request_data: ws.Data) -> None:
        """Handle client request, validate messages and evaluates corresponding action.

        Args:
            client: Client connection.
            request_data: Request data.
        """
        try:
            messages = Messages.model_validate_json(request_data)
        except ValidationError as exc:
            response: MessageType = Error(
                Id=SYSTEM_MESSAGE_ID,
                ErrorCode=ErrorCode.error_msg,
                ErrorMessage=f'Failed to parse messages: {exc}',
            )
            await client.send(pack_messages(response))
        else:
            # ??? Should we process them simultaneously or sequentially?
            for raw_message in messages.root:
                async for response in self._process_message(client, raw_message):
                    await client.send(pack_messages(response))  # ??? Should we send them all at once or one by one?

    async def _process_message(
        self,
        client: ws.WebSocketServerProtocol,
        raw_message: Message,
    ) -> AsyncGenerator[MessageType, None]:
        """Process client request message and produce responses.

        This method implements actual logic of Buttplug protocol and virtual devices management.
        Virtual devices behavior depends on the imlementation of the corresponding device object.

        Args:
            client: Client connection.
            raw_message: Request message.

        Yields:
            Response messages. See Buttplug protocol specification for details.
        """
        message = unwrap_message(raw_message)
        match message:
            case RequestServerInfo():
                yield ServerInfo(
                    Id=message.Id,
                    ServerName='NoButt',
                    MessageVersion=MessageVersion.v3,
                    MaxPingTime=0,
                )
            case StartScanning():
                yield Ok(Id=message.Id)
            case StopScanning():
                yield Ok(Id=message.Id)
                yield ScanningFinished(Id=SYSTEM_MESSAGE_ID)
            case RequestDeviceList():
                yield DeviceList(
                    Id=message.Id,
                    Devices=[device.spec for device in self._devices],
                )
            case ScalarCmd():
                try:
                    device = self._devices[message.DeviceIndex]
                except IndexError:
                    yield Error(
                        Id=message.Id,
                        ErrorCode=ErrorCode.error_device,
                        ErrorMessage=f'Device with index {message.DeviceIndex} not found',
                    )
                else:
                    result = await device.scalar_cmd(message)
                    yield result.to_message(message.Id)
            case StopDeviceCmd():
                try:
                    device = self._devices[message.DeviceIndex]
                except IndexError:
                    yield Error(
                        Id=message.Id,
                        ErrorCode=ErrorCode.error_device,
                        ErrorMessage=f'Device with index {message.DeviceIndex} not found',
                    )
                else:
                    result = await device.stop_device_cmd(message)
                    yield result.to_message(message.Id)
            case StopAllDevices():
                results = await asyncio.gather(*[device.stop_cmd() for device in self._devices])
                yield compose_results(results).to_message(message.Id)
            case _:
                yield Error(
                    Id=message.Id,
                    ErrorCode=ErrorCode.error_msg,
                    ErrorMessage=f'Message is currently unsupported: {message}',
                )
