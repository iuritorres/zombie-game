import { PlayerState } from "../types/player";
import { Player } from "./Player";

export class Zeke extends Player {
  frames = new Map([
    // Idle Stance
    [
      `${PlayerState.IDLE_UP}-1`,
      {
        dimensions: {
          sourceX: 87,
          sourceY: 86,
          sourceWidth: 16,
          sourceHeight: 35,
        },
      },
    ],
    [
      `${PlayerState.IDLE_DOWN}-1`,
      {
        dimensions: {
          sourceX: 86,
          sourceY: 5,
          sourceWidth: 16,
          sourceHeight: 36,
        },
      },
    ],
    [
      `${PlayerState.IDLE_LEFT}-1`,
      {
        dimensions: {
          sourceX: 87,
          sourceY: 124,
          sourceWidth: 15,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.IDLE_RIGHT}-1`,
      {
        dimensions: {
          sourceX: 87,
          sourceY: 44,
          sourceWidth: 15,
          sourceHeight: 37,
        },
      },
    ],

    // WALK Down
    [
      `${PlayerState.WALK_DOWN}-1`,
      {
        dimensions: {
          sourceX: 108,
          sourceY: 4,
          sourceWidth: 15,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_DOWN}-2`,
      {
        dimensions: {
          sourceX: 128,
          sourceY: 4,
          sourceWidth: 16,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_DOWN}-3`,
      {
        dimensions: {
          sourceX: 149,
          sourceY: 4,
          sourceWidth: 15,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_DOWN}-4`,
      {
        dimensions: {
          sourceX: 170,
          sourceY: 4,
          sourceWidth: 15,
          sourceHeight: 37,
        },
      },
    ],

    // WALK UP
    [
      `${PlayerState.WALK_UP}-1`,
      {
        dimensions: {
          sourceX: 108,
          sourceY: 85,
          sourceWidth: 14,
          sourceHeight: 36,
        },
      },
    ],
    [
      `${PlayerState.WALK_UP}-2`,
      {
        dimensions: {
          sourceX: 129,
          sourceY: 86,
          sourceWidth: 16,
          sourceHeight: 35,
        },
      },
    ],
    [
      `${PlayerState.WALK_UP}-3`,
      {
        dimensions: {
          sourceX: 153,
          sourceY: 85,
          sourceWidth: 14,
          sourceHeight: 36,
        },
      },
    ],
    [
      `${PlayerState.WALK_UP}-4`,
      {
        dimensions: {
          sourceX: 174,
          sourceY: 86,
          sourceWidth: 16,
          sourceHeight: 35,
        },
      },
    ],

    // WALK LEFT
    [
      `${PlayerState.WALK_LEFT}-1`,
      {
        dimensions: {
          sourceX: 108,
          sourceY: 124,
          sourceWidth: 13,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_LEFT}-2`,
      {
        dimensions: {
          sourceX: 129,
          sourceY: 124,
          sourceWidth: 21,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_LEFT}-3`,
      {
        dimensions: {
          sourceX: 155,
          sourceY: 124,
          sourceWidth: 14,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_LEFT}-4`,
      {
        dimensions: {
          sourceX: 174,
          sourceY: 125,
          sourceWidth: 21,
          sourceHeight: 36,
        },
      },
    ],

    // WALK RIGHT
    [
      `${PlayerState.WALK_RIGHT}-1`,
      {
        dimensions: {
          sourceX: 108,
          sourceY: 44,
          sourceWidth: 13,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_RIGHT}-2`,
      {
        dimensions: {
          sourceX: 126,
          sourceY: 44,
          sourceWidth: 21,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_RIGHT}-3`,
      {
        dimensions: {
          sourceX: 152,
          sourceY: 44,
          sourceWidth: 14,
          sourceHeight: 37,
        },
      },
    ],
    [
      `${PlayerState.WALK_RIGHT}-4`,
      {
        dimensions: {
          sourceX: 170,
          sourceY: 45,
          sourceWidth: 21,
          sourceHeight: 36,
        },
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
    super({
      name: "Zeke",
      image: document.querySelector(
        "img[alt='player-zeke']",
      ) as HTMLImageElement,
    });
  }
}
