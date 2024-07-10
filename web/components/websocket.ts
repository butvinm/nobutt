import { Message } from "./schema/messages";
import { logToConsole } from "./console";
import * as handlers from "./message-handler";

let plug_vibration_level = 0;
let reconnectInterval = 1000;
let socket;
let serverIndicatorStages = ["Server offline", "Server connected", "Error"];

const bulb = document.getElementById("server-connection-bulb");

socket = new WebSocket("ws://127.0.0.1:12345");
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
  logToConsole("WebSocket-error: unable to connect with server");
});

socket.addEventListener("error", (event) => {
  if (bulb) {
    bulb.classList.add("error");
    bulb.title = serverIndicatorStages[2];
  }
  console.error("WebSocket error: ", event);
  logToConsole(`WebSocket-error: ${event.type.toString()}`);
  setTimeout(function () {
    if (bulb) {
      bulb.classList.remove("error");
    }
  }, 500);
});

socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
  // logToConsole("Message from server: " + event.data);

  try {
    const message = JSON.parse(event.data);
    handleMessage(message);
  } catch (error) {
    console.error("Error parsing message: ", error);
    logToConsole(`Error-parsing-message: ${error}`);
    logToConsole(`____message: ${event.data}`);
  }
});

function handleMessage(message: Message) {
  // Server Indicators Messages
  if (message.Ok) {
    handlers.handleOk(message);
  }
  if (message.Ping) {
    handlers.handlePing(message);
  }
  if (message.Error) {
    handlers.handleError(message);
  }
  // Device Messages
  if (message.DeviceAdded) {
    handlers.handleDeviceAdded(message);
  }
  if (message.DeviceList) {
    handlers.handleDeviceList(message);
  }
  if (message.DeviceRemoved) {
    handlers.handleDeviceRemoved(message);
  }
  // Server Info Messages
  if (message.ServerInfo) {
    handlers.handleServerInfo(message);
  }
  if (message.RequestServerInfo) {
    handlers.handleRequestServerInfo(message);
  }
  if (message.StartScanning) {
    handlers.handleStartScanning(message);
  }
  if (message.StopScanning) {
    handlers.handleStopScanning(message);
  }
  if (message.ScanningFinished) {
    handlers.handleScanningFinished(message);
  }
  // Action Messages
  if (message.ScalarCmd) {
    handlers.handleScalarCmd(message);
  }
  if (message.StopDeviceCmd) {
    handlers.handleStopDeviceCmd(message);
  }
  if (message.StopAllDevices) {
    handlers.handleStopAllDevices(message);
  }
}
