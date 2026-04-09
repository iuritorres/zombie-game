import { Attributes } from "../../types/global";
import { PlayerState } from "../../types/player";
import { Player } from "./Player";

export class Zeke extends Player {
  frames = new Map([
    // Face
    [
      `${PlayerState.IDLE_DOWN}-FACE`,
      {
        dimensions: { x: 218, y: 4, width: 9, height: 15 },
      },
    ],

    // Idle Stance
    [
      `${PlayerState.IDLE_UP}-1`,
      {
        dimensions: { x: 87, y: 86, width: 16, height: 35 },
      },
    ],
    [
      `${PlayerState.IDLE_DOWN}-1`,
      {
        dimensions: { x: 86, y: 5, width: 16, height: 36 },
      },
    ],
    [
      `${PlayerState.IDLE_LEFT}-1`,
      {
        dimensions: { x: 87, y: 124, width: 15, height: 37 },
      },
    ],
    [
      `${PlayerState.IDLE_RIGHT}-1`,
      {
        dimensions: { x: 87, y: 44, width: 15, height: 37 },
      },
    ],

    // WALK Down
    [
      `${PlayerState.WALK_DOWN}-1`,
      {
        dimensions: { x: 108, y: 4, width: 15, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_DOWN}-2`,
      {
        dimensions: { x: 128, y: 4, width: 16, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_DOWN}-3`,
      {
        dimensions: { x: 149, y: 4, width: 15, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_DOWN}-4`,
      {
        dimensions: { x: 170, y: 4, width: 15, height: 37 },
      },
    ],

    // WALK UP
    [
      `${PlayerState.WALK_UP}-1`,
      {
        dimensions: { x: 108, y: 85, width: 14, height: 36 },
      },
    ],
    [
      `${PlayerState.WALK_UP}-2`,
      {
        dimensions: { x: 129, y: 86, width: 16, height: 35 },
      },
    ],
    [
      `${PlayerState.WALK_UP}-3`,
      {
        dimensions: { x: 153, y: 85, width: 14, height: 36 },
      },
    ],
    [
      `${PlayerState.WALK_UP}-4`,
      {
        dimensions: { x: 174, y: 86, width: 16, height: 35 },
      },
    ],

    // WALK LEFT
    [
      `${PlayerState.WALK_LEFT}-1`,
      {
        dimensions: { x: 108, y: 124, width: 13, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_LEFT}-2`,
      {
        dimensions: { x: 129, y: 124, width: 21, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_LEFT}-3`,
      {
        dimensions: { x: 155, y: 124, width: 14, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_LEFT}-4`,
      {
        dimensions: { x: 174, y: 125, width: 21, height: 36 },
      },
    ],

    // WALK RIGHT
    [
      `${PlayerState.WALK_RIGHT}-1`,
      {
        dimensions: { x: 108, y: 44, width: 13, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_RIGHT}-2`,
      {
        dimensions: { x: 126, y: 44, width: 21, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_RIGHT}-3`,
      {
        dimensions: { x: 152, y: 44, width: 14, height: 37 },
      },
    ],
    [
      `${PlayerState.WALK_RIGHT}-4`,
      {
        dimensions: { x: 170, y: 45, width: 21, height: 36 },
      },
    ],
  ]);

  animations = {
    [PlayerState.IDLE_UP]: [
      {
        frameKey: `${PlayerState.IDLE_UP}-1`,
        frameDuration: 180,
      },
    ],
    [PlayerState.IDLE_DOWN]: [
      {
        frameKey: `${PlayerState.IDLE_DOWN}-1`,
        frameDuration: 180,
      },
    ],
    [PlayerState.IDLE_LEFT]: [
      {
        frameKey: `${PlayerState.IDLE_LEFT}-1`,
        frameDuration: 180,
      },
    ],
    [PlayerState.IDLE_RIGHT]: [
      {
        frameKey: `${PlayerState.IDLE_RIGHT}-1`,
        frameDuration: 180,
      },
    ],
    [PlayerState.WALK_UP]: [
      {
        frameKey: `${PlayerState.WALK_UP}-1`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_UP}-2`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_UP}-3`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_UP}-4`,
        frameDuration: 180,
      },
    ],
    [PlayerState.WALK_DOWN]: [
      {
        frameKey: `${PlayerState.WALK_DOWN}-1`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_DOWN}-2`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_DOWN}-3`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_DOWN}-4`,
        frameDuration: 180,
      },
    ],
    [PlayerState.WALK_LEFT]: [
      {
        frameKey: `${PlayerState.WALK_LEFT}-1`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_LEFT}-2`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_LEFT}-3`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_LEFT}-4`,
        frameDuration: 180,
      },
    ],
    [PlayerState.WALK_RIGHT]: [
      {
        frameKey: `${PlayerState.WALK_RIGHT}-1`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_RIGHT}-2`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_RIGHT}-3`,
        frameDuration: 180,
      },
      {
        frameKey: `${PlayerState.WALK_RIGHT}-4`,
        frameDuration: 180,
      },
    ],
  };

  constructor() {
    const baseAttributes: Attributes = {
      movementSpeed: 0.12,
    };

    super({
      name: "Zeke",
      image: document.querySelector(
        "img[alt='player-zeke']",
      ) as HTMLImageElement,
      attributes: baseAttributes,
    });
  }
}
