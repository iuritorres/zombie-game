import { drawFrame } from "../../utils/context";
import { Stage } from "../Stage";

export class RescueTheNeighboursStage extends Stage {
  constructor() {
    super({
      image: document.querySelector(
        "img[alt='stage-rescue-the-neighbours']",
      ) as HTMLImageElement,
    });
  }

  draw(context: CanvasRenderingContext2D) {
    drawFrame({
      context,
      image: this.image,
      dimensions: {
        sourceX: 0,
        sourceY: 0,
        sourceWidth: this.image.width,
        sourceHeight: this.image.height,
      },
      position: {
        x: 0,
        y: 0,
      },
    });
  }
}
