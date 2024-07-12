import { logToConsole } from "./console";
let toysNumber = 0;
export class Toy {
  container: HTMLElement | null;
  wrapper!: HTMLElement;
  img!: HTMLImageElement;
  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    toysNumber += 1;
    this.init();
  }

  init() {
    this.createElements();
  }

  createElements() {
    this.wrapper = document.createElement("div");
    this.wrapper.className = "element-wrapper movable-element-wrapper";

    this.wrapper.textContent = `Toy ${toysNumber}`;

    this.img = document.createElement("img");
    this.img.src = "./resources/plug.png";
    this.img.className = "plug";

    this.wrapper.appendChild(this.img);

    if (this.container === null) {
      logToConsole(`Toy-error: initialization error at ${toysNumber}`);
      return;
    }
    this.container.appendChild(this.wrapper);
  }

  remove() {
    this.wrapper.remove();
  }
}
