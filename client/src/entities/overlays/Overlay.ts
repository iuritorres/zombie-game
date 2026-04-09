export abstract class Overlay {
  overlayWrapper: HTMLElement;

  constructor() {
    this.overlayWrapper = document.getElementById("overlay")!;
  }

  abstract update(frameTimeDelta: number): void;
  abstract draw(
    context?: CanvasRenderingContext2D,
    overlayWrapper?: HTMLElement,
  ): void;
}
