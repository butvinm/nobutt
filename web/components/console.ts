class NobuttConsole {
  parentNode: HTMLElement;
  initialized: boolean;
  constructor(parentNode: HTMLElement) {
    if (!parentNode) {
      throw new Error("Console-err: Parent node is required.");
    }
    this.parentNode = parentNode;
    this.initialized = true;
  }

  addMessage(message: HTMLElement) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("console-message");
    messageElement.appendChild(message);
    this.parentNode.appendChild(messageElement);
  }
}
const logsElementId = "logs";
const logsElement = document.getElementById(logsElementId);
if (logsElement === null) {
  throw new Error(`Console-error: Element ${logsElementId} is null`);
}
const consoleInstance = new NobuttConsole(logsElement);

function logToConsole(message: string | null) {
  if (consoleInstance.initialized === false) {
    return;
  }

  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  consoleInstance.addMessage(messageElement);
}
