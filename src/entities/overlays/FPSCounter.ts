import { Overlay } from "./Overlay";

export class FPSCounter extends Overlay {
  fps = 0;
  element: HTMLElement;

  constructor() {
    super();

    this.element = document.createElement("div");
    this.element.style.cssText = "position:absolute;top:4px;right:8px;";

    this.overlayWrapper.appendChild(this.element);
  }

  update(frameTimeDelta: number) {
    this.fps = Math.round(1000 / frameTimeDelta);
  }

  draw(_: CanvasRenderingContext2D) {
    this.element.textContent = `${this.fps} FPS`;
  }
}
