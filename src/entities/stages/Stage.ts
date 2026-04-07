import { ENABLE_DEBUG } from "../../constants/game";
import { Camera } from "../../engine/Camera";
import { Dimensions } from "../../types/global";
import { drawFrame } from "../../utils/context";
import { Debug } from "../../utils/debug";

interface ConstructorParams {
  image: HTMLImageElement;
}

export class Stage {
  image: HTMLImageElement;

  collisionMap: Dimensions[] = [];
  foregroundElements = [];
  interactables = [];

  constructor({ image }: ConstructorParams) {
    this.image = image;

    const stageBoundaries: Dimensions[] = [
      { x: 1, y: 1, width: this.image.width, height: -1 },
      { x: 1, y: 1, width: -1, height: this.image.height },
      { x: 1, y: this.image.height - 2, width: this.image.width, height: 1 },
      { x: this.image.width - 3, y: 1, width: 1, height: this.image.height },
    ];

    this.collisionMap.push(...stageBoundaries);
  }

  draw(context: CanvasRenderingContext2D, camera: Camera) {
    drawFrame({
      context,
      image: this.image,
      position: { x: 0, y: 0 },
      dimensions: {
        x: camera.position.x,
        y: camera.position.y,
        width: this.image.width,
        height: this.image.height,
      },
    });

    if (!ENABLE_DEBUG) return;

    for (const collisionBox of this.collisionMap) {
      Debug.drawBox(context, camera, { x: 0, y: 0 }, collisionBox, "#7777FF");
    }
  }
}
