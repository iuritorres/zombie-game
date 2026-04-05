import { Position } from "../types/global";

export class Camera {
  position: Position = {
    x: 0,
    y: 0,
  };

  follow(
    target: { position: Position },
    canvasWidth: number,
    canvasHeight: number,
  ) {
    this.position.x = target.position.x - canvasWidth / 2;
    this.position.y = target.position.y - canvasHeight / 2;
  }
}
