from pathlib import Path
from typing import Any
from unittest.mock import AsyncMock, MagicMock, patch, call

import pytest
import websockets as ws

from nobutt.devices.basic import BasicNoButtDevice
from nobutt.exceptions import UnsupportedMessageVersionError
from nobutt.server import NoButtServer
from nobutt.spec.messages.v3.enumeration.device_list import DeviceList
from nobutt.spec.messages.v3.enumeration.device_removed import DeviceRemoved
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
from nobutt.spec.messages.v3.status.error import Error
from nobutt.spec.messages.v3.status.ok import Ok
from nobutt.spec.messages.v3.types.device import (
    Device,
    DeviceMessagesModel,
    DeviceMessagesStopDeviceCmd,
)
from nobutt.spec_utils import result

CASES = Path(__file__).parent / 'test_cases'


@pytest.fixture
def server() -> NoButtServer:
    return NoButtServer()


async def test_serve(server: NoButtServer) -> None:
    # Test that server can be used as proper async context manager
    with patch.object(ws, 'serve') as serve:
        async with server.serve():
            pass

        serve.assert_called_once_with(server._connection_handler, host='localhost', port=12345)
        serve.return_value.__aenter__.assert_called_once()
        serve.return_value.__aexit__.assert_called_once()


async def test_add_device_no_clients(server: NoButtServer) -> None:
    device = BasicNoButtDevice(Device(
        DeviceName='TestDevice',
        DeviceIndex=0,
        DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd()),
    ))
    with patch.object(ws, 'broadcast') as broadcast:
        await server.add_device(device)
        assert server._devices == {0: device}
        broadcast.assert_not_called()


async def test_add_device_with_clients(server: NoButtServer) -> None:
    device = BasicNoButtDevice(Device(
        DeviceName='TestDevice',
        DeviceIndex=0,
        DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd()),
    ))

    clients = {MagicMock(), MagicMock()}

    with (
        patch.object(server, '_clients', clients),
        patch.object(ws, 'broadcast') as broadcast,
    ):
        await server.add_device(device)
        broadcast.assert_called_once_with(clients, '[{"DeviceAdded":{"Id":0,"DeviceName":"TestDevice","DeviceIndex":0,"DeviceMessages":{"StopDeviceCmd":{}}}}]')


async def test_add_device_overwrite(server: NoButtServer) -> None:
    device = BasicNoButtDevice(Device(
        DeviceName='TestDevice',
        DeviceIndex=0,
        DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd()),
    ))
    clients = {MagicMock(), MagicMock()}
    devices = {0: MagicMock(BasicNoButtDevice)}
    with (
        patch.object(server, '_devices', devices),
        patch.object(server, '_clients', clients),
        patch.object(ws, 'broadcast') as broadcast,
    ):
        await server.add_device(device)
        assert server._devices == {0: device}
        broadcast.assert_called_once_with(clients, '[{"DeviceAdded":{"Id":0,"DeviceName":"TestDevice","DeviceIndex":0,"DeviceMessages":{"StopDeviceCmd":{}}}}]')


async def test_remove_device_no_clients(server: NoButtServer) -> None:
    devices = {0: MagicMock(BasicNoButtDevice)}
    with (
        patch.object(server, '_devices', devices),
        patch.object(ws, 'broadcast') as broadcast,
    ):
        await server.remove_device(device_index=0)
        assert server._devices == {}
        broadcast.assert_not_called()


async def test_remove_device_with_clients(server: NoButtServer) -> None:
    device = BasicNoButtDevice(Device(
        DeviceName='TestDevice',
        DeviceIndex=0,
        DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd()),
    ))
    clients = {MagicMock(), MagicMock()}
    devices = {0: device}
    with (
        patch.object(server, '_devices', devices),
        patch.object(server, '_clients', clients),
        patch.object(ws, 'broadcast') as broadcast,
    ):
        await server.remove_device(device_index=0)
        assert server._devices == {}
        broadcast.assert_called_once_with(clients, '[{"DeviceRemoved":{"Id":0,"DeviceIndex":0}}]')


async def test_remove_device_not_found(server: NoButtServer) -> None:
    device = BasicNoButtDevice(Device(
        DeviceName='TestDevice',
        DeviceIndex=0,
        DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd()),
    ))
    clients = {MagicMock(), MagicMock()}
    devices = {1: device}
    with (
        patch.object(server, '_devices', devices),
        patch.object(server, '_clients', clients),
    ):
        with pytest.raises(KeyError):
            await server.remove_device(device_index=0)

        assert server._devices == {1: device}


async def test_connection_handler(server: NoButtServer) -> None:
    client = MagicMock()
    client.__aiter__.return_value = iter(['data1', 'data2', 'data3'])
    with (
        patch.object(server, '_clients') as clients,
        patch.object(server, '_request_handler') as request_handler,
    ):
        await server._connection_handler(client)
        clients.add.assert_called_once_with(client)
        clients.remove.assert_called_once_with(client)
        request_handler.assert_has_calls([
            call(client, 'data1'),
            call(client, 'data2'),
            call(client, 'data3'),
        ])


async def test_connection_handler_unsupported_message_version(server: NoButtServer) -> None:
    def request_handler_mock(*args: Any, **kwargs: Any) -> None:
        raise UnsupportedMessageVersionError(1)

    client = MagicMock()
    client.send = AsyncMock()
    client.__aiter__.return_value = iter(['data1'])
    with (
        patch.object(server, '_clients') as clients,
        patch.object(server, '_request_handler', request_handler_mock),
        patch.object(ws, 'broadcast'),
    ):
        await server._connection_handler(client)
        clients.add.assert_called_once_with(client)
        clients.remove.assert_called_once_with(client)
        client.send.assert_called_once_with('[{"Error":{"Id":0,"ErrorMessage":"Unsupported message version: 1. NoButt supports only version 3.","ErrorCode":3}}]')


async def test_request_handler(server: NoButtServer) -> None:
    client = MagicMock()
    client.send = AsyncMock()

    _process_message = MagicMock()
    _process_message.__aiter__.return_value = iter([Ok(Id=0), Ok(Id=1)])

    request_data = '[{"DeviceRemoved":{"Id":0,"DeviceIndex":0}}]'
    with patch.object(server, '_process_message', MagicMock(return_value=_process_message)) as process_message:
        await server._request_handler(client, request_data)
        process_message.assert_called_once_with(client, DeviceRemoved(Id=0, DeviceIndex=0))
        client.send.assert_has_calls([
            call('[{"Ok":{"Id":0}}]'),
            call('[{"Ok":{"Id":1}}]'),
        ])


async def test_request_handler_invalid_data(server: NoButtServer) -> None:
    client = MagicMock()
    client.send = AsyncMock()

    request_data = ''
    with patch.object(server, '_process_message') as process_message:
        await server._request_handler(client, request_data)
        process_message.assert_not_called()
        client.send.assert_called_once_with('[{"Error":{"Id":0,"ErrorMessage":"Failed to parse messages: 1 validation error for Messages\\n  Invalid JSON: EOF while parsing a value at line 1 column 0 [type=json_invalid, input_value=\'\', input_type=str]\\n    For further information visit https://errors.pydantic.dev/2.8/v/json_invalid","ErrorCode":3}}]')


async def test_process_message_request_server_info(server: NoButtServer) -> None:
    message = RequestServerInfo(Id=69, ClientName='TestClient', MessageVersion=3)
    client = MagicMock()
    responses = [response async for response in server._process_message(client, message)]
    assert responses == [ServerInfo(Id=69, ServerName='NoButt', MessageVersion=3, MaxPingTime=0)]

    # Test unsupported message version
    message = RequestServerInfo(Id=69, ClientName='TestClient', MessageVersion=1)
    with pytest.raises(UnsupportedMessageVersionError, match='Unsupported message version: 1. NoButt supports only version 3.'):
        responses = [response async for response in server._process_message(client, message)]


async def test_process_message_start_scanning(server: NoButtServer) -> None:
    message = StartScanning(Id=69)
    client = MagicMock()
    responses = [response async for response in server._process_message(client, message)]
    assert responses == [Ok(Id=69)]


async def test_process_message_stop_scanning(server: NoButtServer) -> None:
    message = StopScanning(Id=69)
    client = MagicMock()
    responses = [response async for response in server._process_message(client, message)]
    assert responses == [Ok(Id=69), ScanningFinished(Id=0)]


async def test_process_message_request_device_list(server: NoButtServer) -> None:
    message = RequestDeviceList(Id=69)
    client = MagicMock()
    devices = {
        0: BasicNoButtDevice(Device(
            DeviceName='TestDevice',
            DeviceIndex=0,
            DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd()),
        )),
        1: BasicNoButtDevice(Device(
            DeviceName='TestDevice2',
            DeviceIndex=1,
            DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd()),
        )),
    }
    with patch.object(server, '_devices', devices):
        responses = [response async for response in server._process_message(client, message)]
        assert responses == [
            DeviceList(
                Id=69,
                Devices=[
                    Device(DeviceName='TestDevice', DeviceIndex=0, DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd())),
                    Device(DeviceName='TestDevice2', DeviceIndex=1, DeviceMessages=DeviceMessagesModel(StopDeviceCmd=DeviceMessagesStopDeviceCmd())),
                ],
            ),
        ]


async def test_process_message_scalar_cmd(server: NoButtServer) -> None:
    client = MagicMock()

    # Test device not found
    message = ScalarCmd(Id=69, DeviceIndex=42, Scalars=[])
    responses = [response async for response in server._process_message(client, message)]
    assert responses == [Error(Id=69, ErrorCode=4, ErrorMessage='Device with index 42 not found')]

    # Test device found, scalar cmd called, result is Ok with patched Id
    message = ScalarCmd(Id=69, DeviceIndex=42, Scalars=[])
    device = MagicMock(BasicNoButtDevice)
    device.scalar_cmd = AsyncMock(return_value=result.Ok())
    with patch.object(server, '_devices', {42: device}):
        responses = [response async for response in server._process_message(client, message)]
        assert responses == [Ok(Id=69)]
        device.scalar_cmd.assert_called_once_with(message)


async def test_process_message_stop_device_cmd(server: NoButtServer) -> None:
    client = MagicMock()

    # Test device not found
    message = StopDeviceCmd(Id=69, DeviceIndex=42)
    responses = [response async for response in server._process_message(client, message)]
    assert responses == [Error(Id=69, ErrorCode=4, ErrorMessage='Device with index 42 not found')]

    # Test device found, stop_device_cmd called, result is Ok with patched Id
    message = StopDeviceCmd(Id=69, DeviceIndex=42)
    device = MagicMock(BasicNoButtDevice)
    device.stop_device_cmd = AsyncMock(return_value=result.Ok())
    with patch.object(server, '_devices', {42: device}):
        responses = [response async for response in server._process_message(client, message)]
        assert responses == [Ok(Id=69)]
        device.stop_device_cmd.assert_called_once_with()


async def test_process_message_stop_all_devices(server: NoButtServer) -> None:
    client = MagicMock()

    message = StopAllDevices(Id=69)

    devices = {0: MagicMock(BasicNoButtDevice), 1: MagicMock(BasicNoButtDevice)}
    for device in devices.values():
        device.stop_device_cmd = AsyncMock(return_value=result.Ok())

    with patch.object(server, '_devices', devices):
        responses = [response async for response in server._process_message(client, message)]
        assert responses == [Ok(Id=69)]
        for device in devices.values():
            device.stop_device_cmd.assert_called_once_with()


async def test_process_message_unknown_message(server: NoButtServer) -> None:
    client = MagicMock()

    message = Ok(Id=69)
    responses = [response async for response in server._process_message(client, message)]
    assert responses == [Error(Id=69, ErrorCode=0, ErrorMessage='Unexpected or unsupported message: Ok(Id=69)')]
