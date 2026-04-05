import { Stage } from "../stages/Stage";
import { Position } from "../types/global";

export class Camera {
  position: Position = {
    x: 0,
    y: 0,
  };

  follow(
    target: { position: Position },
    stage: Stage,
    canvasWidth: number,
    canvasHeight: number,
  ) {
    const targetIsInTopBoundary = target.position.y - canvasHeight / 2 < 0;
    const targetIsInBottomBoundary =
      target.position.y + canvasHeight / 2 > stage.image.height;

    if (!targetIsInBottomBoundary && !targetIsInTopBoundary) {
      this.position.y = target.position.y - canvasHeight / 2;
    }

    const targetIsInLeftBoundary = target.position.x - canvasWidth / 2 < 0;
    const targetIsInRightBoundary =
      target.position.x + canvasWidth / 2 > stage.image.width;

    if (!targetIsInLeftBoundary && !targetIsInRightBoundary) {
      this.position.x = target.position.x - canvasWidth / 2;
    }
  }
}
