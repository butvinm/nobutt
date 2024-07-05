// import { Message } from "./schema";
// https://github.com/microsoft/TypeScript/issues/41513
// I have no idea why but this^ is the only way to import that type:
type Message = import("./schema").Message;

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
    logToConsole(`handleMessage: ${message.Ok}`);
  }

  if (message.Ping) {
    logToConsole(`handleMessage: ${message.Ping}`);
  }

  if (message.Error) {
    logToConsole(`handleMessage: ${message.Error}`);
  }

  // Device Messages
  if (message.DeviceAdded) {
    logToConsole(`handleMessage: ${message.DeviceAdded}`);
  }
  if (message.DeviceList) {
    logToConsole(`handleMessage: ${message.DeviceList}`);
  }
  if (message.DeviceRemoved) {
    logToConsole(`handleMessage: ${message.DeviceRemoved}`);
  }

  // Server Info Messages
  if (message.ServerInfo) {
    logToConsole(`handleMessage: ${message.ServerInfo}`);
  }
  if (message.RequestServerInfo) {
    logToConsole(`handleMessage: ${message.RequestServerInfo}`);
  }
  if (message.ScanningFinished) {
    logToConsole(`handleMessage: ${message.ScanningFinished}`);
  }
  if (message.StartScanning) {
    logToConsole(`handleMessage: ${message.StartScanning}`);
  }
  if (message.StopScanning) {
    logToConsole(`handleMessage: ${message.StopScanning}`);
  }

  // Action Messages
  if (message.ScalarCmd) {
    logToConsole(`handleMessage: ${message.ScalarCmd}`);
  }
  if (message.StopDeviceCmd) {
    logToConsole(`handleMessage: ${message.StopDeviceCmd}`);
  }
  if (message.StopAllDevices) {
    logToConsole(`handleMessage: ${message.StopAllDevices}`);
  }
}
