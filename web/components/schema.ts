export interface Message {
    DeviceAdded?:       DeviceAdded;
    DeviceList?:        DeviceList;
    DeviceRemoved?:     DeviceRemoved;
    Error?:             Error;
    Ok?:                Ok;
    Ping?:              Ping;
    RequestServerInfo?: RequestServerInfo;
    ScalarCmd?:         ScalarCmd;
    ScanningFinished?:  ScanningFinished;
    ServerInfo?:        ServerInfo;
    StartScanning?:     StartScanning;
    StopAllDevices?:    StopAllDevices;
    StopDeviceCmd?:     StopDeviceCmd;
    StopScanning?:      StopScanning;
}

/**
 * Sent by the server whenever a device is added to the system. Can happen at any time after
 * identification stage (i.e. after client is connected), as it is assumed many server
 * implementations will support devices with hotplugging capabilities that do not require
 * specific scanning/discovery sessions.
 */
export interface DeviceAdded {
    /**
     * User provided display name for a device. Optional field.
     */
    DeviceDisplayName?: string;
    /**
     * Index used to identify the device when sending Device Messages.
     */
    DeviceIndex: number;
    /**
     * Accepted Device Messages
     */
    DeviceMessages: Device;
    /**
     * Recommended minimum gap between device commands, in milliseconds. Optional field.
     */
    DeviceMessageTimingGap?: number;
    /**
     * Descriptive name of the device, as taken from the base device configuration file.
     */
    DeviceName: string;
    Id:         number;
}

/**
 * Accepted Device Messages
 */
export interface Device {
    LinearCmd?: DeviceMessagesLinearCmd[];
    RotateCmd?: DeviceMessagesRotateCmd[];
    ScalarCmd?: DeviceMessagesScalarCmd[];
}

export interface DeviceMessagesLinearCmd {
    ActuatorType:      string;
    FeatureDescriptor: string;
    StepCount:         number;
}

export interface DeviceMessagesRotateCmd {
    ActuatorType:      string;
    FeatureDescriptor: string;
    StepCount:         number;
}

export interface DeviceMessagesScalarCmd {
    ActuatorType:      string;
    FeatureDescriptor: string;
    StepCount:         number;
}

/**
 * Server reply to a client request for a device list.
 */
export interface DeviceList {
    Devices: DeviceElement[];
    Id:      number;
}

/**
 * Represents a device with its properties and messages.
 */
export interface DeviceElement {
    /**
     * User provided display name for a device. Optional field.
     */
    DeviceDisplayName?: string;
    /**
     * Index used to identify the device when sending Device Messages.
     */
    DeviceIndex: number;
    /**
     * Accepted Device Messages
     */
    DeviceMessages: Device;
    /**
     * Recommended minimum gap between device commands, in milliseconds. Optional field.
     */
    DeviceMessageTimingGap?: number;
    /**
     * Descriptive name of the device, as taken from the base device configuration file.
     */
    DeviceName: string;
}

/**
 * Sent by the server whenever a device is removed from the system. Can happen at any time
 * after identification.
 */
export interface DeviceRemoved {
    /**
     * Index used to identify the device when sending Device Messages.
     */
    DeviceIndex: number;
    Id:          number;
}

/**
 * Signifies that the previous message sent by the client caused some sort of parsing or
 * processing error on the server.
 */
export interface Error {
    /**
     * Integer describing the error. Can be used in programs to react accordingly.
     */
    ErrorCode: number | number;
    /**
     * Message describing the error that happened on the server.
     */
    ErrorMessage: string;
    Id:           number;
}

/**
 * Signifies that the previous message sent by the client was received and processed
 * successfully by the server.
 */
export interface Ok {
    Id: number;
}

/**
 * Ping acts a watchdog between the client and the server. The server will expect the client
 * to send a ping message at a certain interval (interval will be sent to the client as part
 * of the identification step). If the client fails to ping within the specified time, the
 * server will disconnect and stop all currently connected devices.
 *
 * This will handle cases like the client crashing without a proper disconnect. This is not
 * a guaranteed global failsafe, since it will not guard against problems like a client UI
 * thread locking up while a client communication thread continues to work.
 */
export interface Ping {
    Id: number;
}

/**
 * Sent by the client to register itself with the server, and request info from the server.
 */
export interface RequestServerInfo {
    /**
     * Name of the client, for the server to use for UI if needed. Cannot be null.
     */
    ClientName:     string;
    Id:             number;
    MessageVersion: number | number;
}

/**
 * Sets the static level for a feature. For instance, the vibration speed of a vibrator, the
 * oscillating speed of a fucking machine, etc... The Message Attributes for the ScalarCmd
 * message in the DeviceList/DeviceAdded message contain information on the actuator type
 * and description, number of actuators, level ranges, and more.
 */
export interface ScalarCmd {
    /**
     * Index of device.
     */
    DeviceIndex: number;
    Id:          number;
    Scalars:     Scalar[];
}

export interface Scalar {
    /**
     * Type of actuator that the user expects to control with this command. This is to make sure
     * that context is correct between the client and server.
     */
    ActuatorType: string;
    /**
     * Index of actuator.
     */
    Index: number;
    /**
     * Actuator level with a range of [0.0-1.0].
     */
    Scalar: number;
}

/**
 * Sent by the server once it has stopped scanning on all busses. Since systems may have
 * timeouts that are not controlled by the server, this is a separate message from the
 * StopScanning flow. ScanningFinished can happen without a StopScanning call.
 */
export interface ScanningFinished {
    Id: number;
}

/**
 * Sent by server to client, contains information about the server name (optional), template
 * version, and ping time expectations.
 */
export interface ServerInfo {
    Id: number;
    /**
     * Maximum interval for pings from the client, in milliseconds. If a client takes longer
     * than this time between sending Ping messages, the server is expected to disconnect.
     */
    MaxPingTime:    number;
    MessageVersion: number | number;
    /**
     * Name of the server. Can be null (0-length).
     */
    ServerName?: string;
}

/**
 * Client request to have the server start scanning for devices on all busses that it knows
 * about. Useful for protocols like Bluetooth, which require an explicit discovery phase.
 */
export interface StartScanning {
    Id: number;
}

/**
 * Sent by the client to tell the server to stop all devices. Can be used for emergency
 * situations, on client shutdown for cleanup, etc… While this is considered a Device
 * Message, since it pertains to all currently connected devices, it does not specify a
 * device index (and does not end with 'Cmd').
 */
export interface StopAllDevices {
    Id: number;
}

/**
 * Client request to have the server stop a device from whatever actions it may be taking.
 * This message should be supported by all devices, and the server should know how to stop
 * any device it supports.
 */
export interface StopDeviceCmd {
    /**
     * Index of device to stop.
     */
    DeviceIndex: number;
    Id:          number;
}

/**
 * Client request to have the server stop scanning for devices. Useful for protocols like
 * Bluetooth, which may not timeout otherwise.
 */
export interface StopScanning {
    Id: number;
}
