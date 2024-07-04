function logToConsole(message) {
  const consoleElement = document.getElementById("logs");
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  consoleElement.appendChild(messageElement);
  consoleElement.scrollTop = consoleElement.scrollHeight;
}
logToConsole("Console:");
