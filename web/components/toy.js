let toysNumber = 0;
class Toy {
  constructor(containerId) {
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

    this.closeButton = document.createElement("span");
    this.closeButton.textContent = "×";
    this.closeButton.className = "close-button";
    this.closeButton.addEventListener("click", () => this.remove());

    this.wrapper.textContent = `Toy ${toysNumber}`;

    this.img = document.createElement("img");
    this.img.src = "./resources/plug.png";
    this.img.className = "plug";

    this.wrapper.appendChild(this.img);

    this.container.appendChild(this.wrapper);
  }

  remove() {
    this.wrapper.remove();
  }
}
