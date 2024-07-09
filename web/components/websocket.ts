import { Messages } from "./schema/messages";

let plug_vibration_level = 0;
let reconnectInterval = 1000;
let socket;
let serverIndicatorStages = ["Server offline", "Server connected", "Error"];

const bulb = document.getElementById("server-connection-bulb");

socket = new WebSocket("ws://127.0.0.1:12345/ui");
console.log("WebSocket created");

socket.addEventListener("open", (event) => {
  if (bulb) {
    bulb.classList.add("active");
    bulb.title = serverIndicatorStages[1];
  }
});

socket.addEventListener("close", (event) => {
  if (bulb) {
    bulb.classList.remove("active");
    bulb.title = serverIndicatorStages[0];
  }
});

socket.addEventListener("error", (event) => {
  if (bulb) {
    bulb.classList.add("error");
    bulb.title = serverIndicatorStages[2];
  }
  console.error("WebSocket error: ", event);
  logToConsole("WebSocket-error: unable to connect with server");
  setTimeout(function () {
    if (bulb) {
      bulb.classList.remove("error");
    }
  }, 500);
});

socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
  logToConsole("Message from server: " + event.data);

  const message = JSON.parse(event.data);
  handleMessage(message);
});

function handleMessage(message: Message) {
  // Server Indicators Messages
  if (message.Ok) {
    handleOk(message);
  }
  if (message.Ping) {
    handlePing(message);
  }
  if (message.Error) {
    handleError(message);
  }
  // Device Messages
  if (message.DeviceAdded) {
    handleDeviceAdded(message);
  }
  if (message.DeviceList) {
    handleDeviceList(message);
  }
  if (message.DeviceRemoved) {
    handleDeviceRemoved(message);
  }
  // Server Info Messages
  if (message.ServerInfo) {
    handleServerInfo(message);
  }
  if (message.RequestServerInfo) {
    handleRequestServerInfo(message);
  }
  if (message.StartScanning) {
    handleStartScanning(message);
  }
  if (message.StopScanning) {
    handleStopScanning(message);
  }
  if (message.ScanningFinished) {
    handleScanningFinished(message);
  }
  // Action Messages
  if (message.ScalarCmd) {
    handleScalarCmd(message);
  }
  if (message.StopDeviceCmd) {
    handleStopDeviceCmd(message);
  }
  if (message.StopAllDevices) {
    handleStopAllDevices(message);
  }
}
