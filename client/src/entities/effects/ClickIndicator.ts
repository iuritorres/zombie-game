import { Camera } from "../../engine/Camera";
import { Position } from "../../types/global";

const DURATION = 500; // ms
const START_DIST = 6;
const END_DIST = 0;
const ARROW_SIZE = 2;
const COLOR = "#ff2a2a";

const ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left

export class ClickIndicator {
  private position: Position | null = null;
  private progress = 0;

  trigger(x: number, y: number) {
    this.position = { x, y };
    this.progress = 0;
  }

  update(frameTimeDelta: number) {
    if (!this.position) return;

    this.progress += frameTimeDelta / DURATION;
    if (this.progress >= 1) {
      this.position = null;
    }
  }

  draw(context: CanvasRenderingContext2D, camera: Camera) {
    if (!this.position) return;

    const screenX = this.position.x - camera.position.x;
    const screenY = this.position.y - camera.position.y;

    const dist = START_DIST + (END_DIST - START_DIST) * this.progress;
    const alpha = 1 - this.progress;

    context.save();
    context.globalAlpha = alpha;
    context.strokeStyle = COLOR;
    context.lineWidth = 1;
    context.lineJoin = "round";
    context.lineCap = "round";

    for (const angle of ANGLES) {
      const arrowX = screenX + Math.cos(angle) * dist;
      const arrowY = screenY + Math.sin(angle) * dist;

      context.save();
      context.translate(arrowX, arrowY);
      context.rotate(angle + Math.PI); // aponta para o centro

      context.beginPath();
      context.moveTo(-ARROW_SIZE, -ARROW_SIZE);
      context.lineTo(0, 0);
      context.lineTo(-ARROW_SIZE, ARROW_SIZE);
      context.stroke();

      context.restore();
    }

    context.restore();
  }
}
