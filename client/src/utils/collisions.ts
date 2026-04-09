import { Dimensions } from "../types/global";

export function rectsOverlap(rect1: Dimensions, rect2: Dimensions) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export function boxOverlap(box1: Dimensions, box2: Dimensions) {
  return rectsOverlap(box1, box2);
}
