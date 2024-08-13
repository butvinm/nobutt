from pathlib import Path
from unittest.mock import Mock, patch

import pytest
from pydantic import BaseModel

from nobutt.devices.basic import BasicNoButtDevice, BasicNoButtScalarActuator
from nobutt.spec.messages.v3.generic_devices.scalar_cmd import (
    Scalar,
    ScalarCmd,
)
from nobutt.spec.messages.v3.types.device import (
    Device,
    DeviceMessagesModel,
    DeviceMessagesScalarCmd,
)
from nobutt.spec_utils.result import Error, Ok, Result
from tests.utils import AsyncMock, parse_test_cases

CASES = Path(__file__).parent / 'test_cases'


@pytest.fixture
def dummy_device() -> BasicNoButtDevice:
    return BasicNoButtDevice(
        Device(
            DeviceName='Test Device',
            DeviceIndex=666,
            DeviceMessages=DeviceMessagesModel(),
        ),
    )


@pytest.fixture
def dummy_scalar_actuator() -> BasicNoButtScalarActuator:
    return BasicNoButtScalarActuator(
        DeviceMessagesScalarCmd(
            StepCount=1,
            FeatureDescriptor='Test Feature',
            ActuatorType='Test Actuator',
        ),
    )


class BasicNoButtDeviceInitCase(BaseModel):
    ids: str
    spec: Device


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(BasicNoButtDeviceInitCase, CASES / 'basic_nobutt_device_init.json'),
    ids=lambda test_case: test_case.ids,
)
def test_basic_nobutt_device_init(test_case: BasicNoButtDeviceInitCase) -> None:
    device = BasicNoButtDevice(spec=test_case.spec)
    assert device.spec == test_case.spec
    if test_case.spec.DeviceMessages.ScalarCmd is None:
        assert len(device.scalar_actuators) == 0
    else:
        assert len(device.scalar_actuators) == len(test_case.spec.DeviceMessages.ScalarCmd)


class BasicNoButtDeviceScalarCmdCase(BaseModel):
    ids: str
    actuators_count: int
    actuator_results_mock: dict[int, Result]
    cmd: ScalarCmd
    expected_result: Result


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(BasicNoButtDeviceScalarCmdCase, CASES / 'basic_nobutt_device_scalar_cmd.json'),
    ids=lambda test_case: test_case.ids,
)
async def test_basic_nobutt_device_scalar_cmd(
    test_case: BasicNoButtDeviceScalarCmdCase,
    dummy_device: BasicNoButtDevice,
) -> None:
    # mock scalar actuators
    actuators_mocks = [Mock(spec=BasicNoButtScalarActuator) for _ in range(test_case.actuators_count)]
    for index, result_mock in test_case.actuator_results_mock.items():
        actuators_mocks[index].scalar = AsyncMock(return_value=result_mock)

    with patch.object(dummy_device, 'scalar_actuators', actuators_mocks):
        result = await dummy_device.scalar_cmd(test_case.cmd)
        assert result == test_case.expected_result

        if isinstance(result, Error) and result.ErrorMessage.startswith('Index out of actuators list'):
            assert not any(actuator_mock.scalar.called for actuator_mock in actuators_mocks)
        else:
            for index, actuator_mock in enumerate(actuators_mocks):
                scalar = [scalar for scalar in test_case.cmd.Scalars if scalar.Index == index]
                if scalar:
                    actuator_mock.scalar.assert_called_once_with(scalar[0])
                else:
                    assert not actuator_mock.scalar.called


class BasicNoButtDeviceStopCmdCase(BaseModel):
    ids: str
    actuators_count: int
    actuator_results_mock: dict[int, Result]
    expected_result: Result


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(BasicNoButtDeviceStopCmdCase, CASES / 'basic_nobutt_device_stop.json'),
    ids=lambda test_case: test_case.ids,
)
async def test_basic_nobutt_device_stop_cmd(
    test_case: BasicNoButtDeviceStopCmdCase,
    dummy_device: BasicNoButtDevice,
) -> None:
    # mock scalar actuators
    actuators_mocks = [Mock(spec=BasicNoButtScalarActuator) for _ in range(test_case.actuators_count)]
    for index, result_mock in test_case.actuator_results_mock.items():
        actuators_mocks[index].stop = AsyncMock(return_value=result_mock)

    with patch.object(dummy_device, 'scalar_actuators', actuators_mocks):
        result = await dummy_device.stop_cmd()
        assert result == test_case.expected_result
        assert all(actuator_mock.stop.called for actuator_mock in actuators_mocks)


class BasicNoButtScalarActuatorInitCase(BaseModel):
    ids: str
    spec: DeviceMessagesScalarCmd


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(BasicNoButtScalarActuatorInitCase, CASES / 'basic_nobutt_scalar_actuator_init.json'),
    ids=lambda test_case: test_case.ids,
)
def test_basic_nobutt_scalar_actuator_init(test_case: BasicNoButtScalarActuatorInitCase) -> None:
    actuator = BasicNoButtScalarActuator(spec=test_case.spec)
    assert actuator.spec == test_case.spec
    assert actuator.power == 0.0


class BasicNoButtScalarActuatorScalarCase(BaseModel):
    ids: str
    scalar: Scalar
    expected_result: Result


@pytest.mark.parametrize(
    argnames='test_case',
    argvalues=parse_test_cases(BasicNoButtScalarActuatorScalarCase, CASES / 'basic_nobutt_scalar_actuator_scalar.json'),
    ids=lambda test_case: test_case.ids,
)
async def test_basic_nobutt_scalar_actuator_scalar(
    test_case: BasicNoButtScalarActuatorScalarCase,
    dummy_scalar_actuator: BasicNoButtScalarActuator,
) -> None:
    power_before = dummy_scalar_actuator.power
    result = await dummy_scalar_actuator.scalar(test_case.scalar)

    assert result == test_case.expected_result
    if isinstance(result, Ok):
        assert dummy_scalar_actuator.power == test_case.scalar.Scalar
    else:
        assert dummy_scalar_actuator.power == power_before


async def test_basic_nobutt_scalar_actuator_stop(dummy_scalar_actuator: BasicNoButtScalarActuator) -> None:
    dummy_scalar_actuator.power = 1.0
    result = await dummy_scalar_actuator.stop()
    assert result == Ok()
    assert dummy_scalar_actuator.power == 0.0
