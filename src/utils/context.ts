import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/game";
import { Frame, Position } from "../types/global";

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

interface DrawFrameParams extends Frame {
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
  scale?: number;
  position: Position;
}

export function drawFrame({
  context,
  image,
  dimensions,
  position,
  scale = 1,
}: DrawFrameParams) {
  context.drawImage(
    image,
    dimensions.sourceX,
    dimensions.sourceY,
    dimensions.sourceWidth,
    dimensions.sourceHeight,
    position.x,
    position.y,
    dimensions.sourceWidth * scale,
    dimensions.sourceHeight * scale,
  );

  context.setTransform(1, 0, 0, 1, 0, 0);
}
