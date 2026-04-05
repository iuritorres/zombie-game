import { Camera } from "../engine/Camera";
import { drawFrame } from "../utils/context";

interface ConstructorParams {
  image: HTMLImageElement;
}

export class Stage {
  image: HTMLImageElement;

  collisionMap = [];
  foregroundElements = [];
  interactables = [];

  constructor({ image }: ConstructorParams) {
    this.image = image;
  }

  draw(context: CanvasRenderingContext2D, camera: Camera) {
    drawFrame({
      context,
      image: this.image,
      position: { x: 0, y: 0 },
      dimensions: {
        sourceX: camera.position.x,
        sourceY: camera.position.y,
        sourceWidth: this.image.width,
        sourceHeight: this.image.height,
      },
    });
  }
}
