import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/game";

export function getContext() {
  const canvas = document.querySelector("canvas");
  const context = canvas?.getContext("2d");

  if (!canvas || !context) {
    throw new Error("Failed to initialize canvas or context");
  }

  context.canvas.width = SCREEN_WIDTH;
  context.canvas.height = SCREEN_HEIGHT;

  context.imageSmoothingEnabled = false;

  return context;
}

interface Dimensions {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
}

interface Position {
  x: number;
  y: number;
}

export enum Direction {
  RIGHT = 1,
  LEFT = -1,
}

export interface Frame {
  dimensions: Dimensions;
}

interface DrawFrameParams extends Frame {
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
  direction?: Direction;
  scale?: number;
  position: Position;
}

export function drawFrame({
  context,
  image,
  dimensions,
  position,
  direction = Direction.RIGHT,
  scale = 1,
}: DrawFrameParams) {
  context.scale(direction, 1);

  context.drawImage(
    image,
    dimensions.sourceX,
    dimensions.sourceY,
    dimensions.sourceWidth,
    dimensions.sourceHeight,
    position.x * direction,
    position.y,
    dimensions.sourceWidth * scale,
    dimensions.sourceHeight * scale,
  );

  context.setTransform(1, 0, 0, 1, 0, 0);
}
