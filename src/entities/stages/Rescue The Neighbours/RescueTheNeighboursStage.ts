import { Stage } from "../Stage";

export class RescueTheNeighboursStage extends Stage {
  constructor() {
    super({
      image: document.querySelector(
        "img[alt='stage-rescue-the-neighbours']",
      ) as HTMLImageElement,
    });
  }
}
