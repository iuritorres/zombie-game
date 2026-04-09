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
      // outer walls
      { x: 0, y: 64, width: 16, height: 750 },
      { x: 0, y: 64, width: 320, height: 47 },
      { x: 321, y: 0, width: 63, height: 112 },
      { x: 386, y: 0, width: 973, height: 50 },
      { x: 1177, y: 65, width: 231, height: 46 },
      { x: 1344, y: 0, width: 16, height: 239 },
      { x: 1344, y: 257, width: 16, height: 560 },
      { x: 0, y: 768, width: 1360, height: 48 },

      // inner walls
      { x: 0, y: 640, width: 80, height: 47 },
      { x: 112, y: 640, width: 96, height: 47 },
      { x: 240, y: 640, width: 160, height: 47 },
      { x: 384, y: 512, width: 16, height: 176 },
      { x: 272, y: 320, width: 16, height: 240 },
      { x: 768, y: 192, width: 16, height: 367 },
      { x: 272, y: 512, width: 512, height: 48 },
      { x: 272, y: 320, width: 72, height: 48 },
      { x: 384, y: 320, width: 464, height: 47 },
      { x: 768, y: 192, width: 160, height: 47 },
      { x: 912, y: 192, width: 16, height: 112 },
      { x: 881, y: 320, width: 31, height: 47 },
      { x: 912, y: 256, width: 127, height: 47 },
      { x: 944, y: 320, width: 96, height: 47 },
      { x: 1024, y: 192, width: 16, height: 111 },
      { x: 1024, y: 192, width: 319, height: 47 },
      { x: 1344, y: 257, width: 64, height: 47 },

      // house 1
      { x: 384, y: 0, width: 8, height: 112 },
      { x: 528, y: 0, width: 8, height: 112 },
      { x: 385, y: 106, width: 78, height: 6 },
      { x: 465, y: 106, width: 39, height: 6 },
      { x: 505, y: 106, width: 30, height: 6 },

      // house 2
      { x: 1024, y: 0, width: 8, height: 112 },
      { x: 1169, y: 0, width: 8, height: 112 },
      { x: 1024, y: 106, width: 78, height: 6 },
      { x: 1104, y: 106, width: 39, height: 6 },
      { x: 1145, y: 106, width: 30, height: 6 },
    ];

    this.collisionMap.push(...walls);
  }
}
