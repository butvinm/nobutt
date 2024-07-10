import { Message } from "./schema/messages";
import { logToConsole } from "./console";

export function handleOk(message: Message) {
  logToConsole("Ok: " + JSON.stringify(message.Ok));
}
export function handlePing(message: Message) {}
export function handleError(message: Message) {
  logToConsole("Error: " + JSON.stringify(message.Error));
}
export function handleDeviceAdded(message: Message) {}
export function handleDeviceList(message: Message) {}
export function handleDeviceRemoved(message: Message) {}
export function handleServerInfo(message: Message) {}
export function handleRequestServerInfo(message: Message) {}
export function handleScanningFinished(message: Message) {}
export function handleStartScanning(message: Message) {}
export function handleStopScanning(message: Message) {}
export function handleScalarCmd(message: Message) {}
export function handleStopDeviceCmd(message: Message) {}
export function handleStopAllDevices(message: Message) {}
