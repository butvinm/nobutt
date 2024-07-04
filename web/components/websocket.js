let plug_vibration_level = 0;
let reconnectInterval = 1000;
let socket;
let serverIndicatorStages = ["Server offline", "Server connected", "Error"];

const bulb = document.getElementById("server-connection-bulb");

socket = new WebSocket("ws://127.0.0.1:12345/ui");
console.log("WebSocket created");

socket.addEventListener("open", (event) => {
  bulb.classList.add("active");
  bulb.title = serverIndicatorStages[1];
});

socket.addEventListener("close", (event) => {
  bulb.classList.remove("active");
  bulb.title = serverIndicatorStages[0];
});

socket.addEventListener("error", (event) => {
  bulb.classList.add("error");
  bulb.title = serverIndicatorStages[2];
  console.error("WebSocket error: ", event);
  logToConsole("WebSocket error");
  setTimeout(function () {
    bulb.classList.remove("error");
  }, 500);
});

socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
  logToConsole("Message from server: " + event.data);

  const message = JSON.parse(event.data);
  handleMessage(message);
});

function handleMessage(message) {
  if (message.s)
    if (message.ScalarCmd && message.ScalarCmd.Scalars) {
      handleScalarCmd(message);
    } else if (message.StopAllDevices || message.StopDevice) {
      handleStopCmd(message);
    } else {
      console.warn("Unknown message type: ", message);
    }
}

function handleScalarCmd(message) {
  console.log("Received scalar: ", message.ScalarCmd.Scalars[0].Scalar);
  plug_vibration_level = message.ScalarCmd.Scalars[0].Scalar;
  // infinite shaking animation
  document.getElementById("plug").style.animation = `shake ${
    (1 - plug_vibration_level) / 2
  }s infinite`;
}

function handleStopCmd(message) {
  console.log("Received stop command");
  plug_vibration_level = 0;
  // stop shaking animation
  document.getElementById("plug").style.animation = "";
}
