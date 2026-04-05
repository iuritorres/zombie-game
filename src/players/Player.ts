import { PlayerState } from "../types/player";
import { drawFrame, Frame } from "../utils/context";

interface ConstructorParams {
  name: string;
  image: HTMLImageElement;
}

export class Player {
  name: string;
  image: HTMLImageElement;

  currentState: PlayerState = PlayerState.WALK_DOWN;
  frames: Map<string, Frame> = new Map();

  animationFrame = 0;
  animationTimer = 0;
  animations: Partial<
    Record<
      PlayerState,
      {
        frameKey: string;
        frameDuration: number;
      }[]
    >
  > = {};

  constructor({ name, image }: ConstructorParams) {
    this.name = name;
    this.image = image;
  }

  async draw(context: CanvasRenderingContext2D, frameTimeDelta: number) {
    const currentAnimationFrames = this.animations[this.currentState] ?? [];
    if (currentAnimationFrames.length === 0) return;

    this.animationTimer += frameTimeDelta;

    const currentFrameData = currentAnimationFrames[this.animationFrame];
    if (this.animationTimer >= currentFrameData.frameDuration) {
      this.animationTimer = 0;
      this.animationFrame =
        (this.animationFrame + 1) % currentAnimationFrames.length;
    }

    const frame = this.frames.get(
      currentAnimationFrames[this.animationFrame].frameKey,
    );

    if (!frame) {
      console.warn(`Frame with key ${frame} not found for player ${this.name}`);
      return;
    }

    drawFrame({
      context,
      image: this.image,
      dimensions: frame.dimensions,
      position: { x: 50, y: 50 },
    });
  }
}
