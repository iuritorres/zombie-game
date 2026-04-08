import { Dimensions } from "../../../types/global";
import { Stage } from "../Stage";

export class RescueTheNeighboursStage extends Stage {
  constructor() {
    super({
      image: document.querySelector(
        "img[alt='stage-rescue-the-neighbours']",
      ) as HTMLImageElement,
    });

    this.loadCollisionMap();
  }

  loadCollisionMap() {
    const walls: Dimensions[] = [
      { x: 50, y: 50, width: 100, height: 20 },
      { x: 250, y: 100, width: 20, height: 100 },
    ];

    this.collisionMap.push(...walls);
  }
}
