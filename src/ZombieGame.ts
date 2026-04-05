import { Player } from "./players/Player";
import { Zeke } from "./players/Zeke";
import { RescueTheNeighboursStage } from "./stages/Rescue The Neighbours/RescueTheNeighboursStage";
import { Direction, drawFrame, getContext } from "./utils/context";

export class ZombieGame {
  context: CanvasRenderingContext2D;
  stage: RescueTheNeighboursStage;
  players: Player[];

  frameTimestamp = {
    previous: 0,
    current: 0,
  };

  constructor() {
    this.context = getContext();
    this.stage = new RescueTheNeighboursStage();
    this.players = [new Zeke()];

    console.log("ZombieGame initialized");
  }

  start() {
    window.requestAnimationFrame(this.frame.bind(this));
  }

  frame(timestamp: number) {
    const frameTimeDelta = timestamp - this.frameTimestamp.previous;
    this.frameTimestamp.previous = timestamp;

    this.stage.draw(this.context);

    for (const player of this.players) {
      player.draw(this.context, frameTimeDelta);
    }

    window.requestAnimationFrame(this.frame.bind(this));
  }

  draw() {}

  startTitleAnimation() {
    const zombieImage = document.querySelector(
      "img[alt='zombie-image']",
    ) as HTMLImageElement;

    const FADE_SPEED = 0.01;
    const HOLD_DURATION = 1000;
    let alpha = 0;
    let fadingIn = true;
    let holdStart: number | null = null;

    const draw = () => {
      this.context.clearRect(
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height,
      );

      this.context.globalAlpha = alpha;

      drawFrame({
        context: this.context,
        image: zombieImage,
        dimensions: {
          sourceX: 67,
          sourceY: 10,
          sourceWidth: 368,
          sourceHeight: 478,
        },
        position: {
          x: 10,
          y: 10,
        },
        direction: Direction.RIGHT,
        scale: 0.09,
      });

      this.context.font = "36px Zombie";
      this.context.fillStyle = "white";
      this.context.fillText("ZOMBIE GAME", 55, 50);

      this.context.globalAlpha = 1;
    };

    const animate = (timestamp: number) => {
      if (fadingIn) {
        alpha += FADE_SPEED;
        if (alpha >= 1) {
          alpha = 1;
          fadingIn = false;
          holdStart = timestamp;
        }
        draw();
        requestAnimationFrame(animate);
      } else if (holdStart !== null && timestamp - holdStart < HOLD_DURATION) {
        draw();
        requestAnimationFrame(animate);
      } else if (alpha > 0) {
        alpha -= FADE_SPEED;
        if (alpha < 0) alpha = 0;
        draw();
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
