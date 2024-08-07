"""Auxiliary types and constants for the specification."""

from enum import Enum

from nobutt.spec.messages.v3.enumeration.device_added import DeviceAdded
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
from nobutt.spec.messages.v3.status.ping import Ping

type EnumerationMessageType = DeviceAdded | DeviceList | DeviceRemoved | RequestDeviceList | StartScanning | StopScanning | ScanningFinished

type GenericDevicesMessageType = ScalarCmd | StopAllDevices | StopDeviceCmd

type HandshakeMessageType = RequestServerInfo | ServerInfo

type StatusMessageType = Ok | Error | Ping

type MessageType = EnumerationMessageType | GenericDevicesMessageType | HandshakeMessageType | StatusMessageType


# Either datamodel-codegen does not supports enums or I am doing something wrong, so I have to define it manually.

class MessageVersion(Enum):
    """Version of the message protocol."""

    v0 = 0
    v1 = 1
    v2 = 2
    v3 = 3


class ErrorCode(Enum):
    """Integer describing the error. Can be used in programs to react accordingly."""

    # An unknown error occurred.
    error_unknown = 0

    # Handshake did not succeed.
    error_init = 1

    # A ping was not sent in the expected time.
    error_ping = 2

    # A message parsing or permission error occurred.
    error_msg = 3

    # A command sent to a device returned an error.
    error_device = 4


# A value to 0 denotes a System message, meaning a message that will only ever be sent from a server to a client.
SYSTEM_MESSAGE_ID = 0
