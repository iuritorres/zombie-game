import { Camera } from "../engine/Camera";
import { Dimensions, Position } from "../types/global";

export class Debug {
  static drawBox(
    context: CanvasRenderingContext2D,
    camera: Camera,
    position: Position,
    dimensions: Dimensions,
    color: string,
  ) {
    const { x, y, width, height } = dimensions;

    context.beginPath();

    context.strokeStyle = color + "AA";
    context.fillStyle = color + "44";
    context.fillRect(
      Math.floor(position.x + x - camera.position.x) + 0.5,
      Math.floor(position.y + y - camera.position.y) + 0.5,
      width,
      height,
    );
    context.rect(
      Math.floor(position.x + x - camera.position.x) + 0.5,
      Math.floor(position.y + y - camera.position.y) + 0.5,
      width,
      height,
    );

    context.stroke();
  }
}
