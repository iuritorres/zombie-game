import { Camera } from "./engine/Camera";
import { InputHandler } from "./engine/InputHandler";
import { Player } from "./players/Player";
import { Zeke } from "./players/Zeke";
import { RescueTheNeighboursStage } from "./stages/Rescue The Neighbours/RescueTheNeighboursStage";
import { drawFrame, getContext } from "./utils/context";

export class ZombieGame {
  context: CanvasRenderingContext2D;
  stage: RescueTheNeighboursStage;
  camera: Camera;
  players: Player[];

  frameTimestamp = {
    previous: 0,
  };

  constructor() {
    this.context = getContext();
    this.stage = new RescueTheNeighboursStage();
    this.camera = new Camera();

    this.players = [new Zeke()];
  }

  frame(timestamp: number) {
    const frameTimeDelta = timestamp - this.frameTimestamp.previous;
    this.frameTimestamp.previous = timestamp;

    this.camera.follow(
      this.players[0],
      this.stage,
      this.context.canvas.width,
      this.context.canvas.height,
    );

    this.stage.draw(this.context, this.camera);

    for (const player of this.players) {
      player.draw(this.context, this.camera, frameTimeDelta);
    }

    window.requestAnimationFrame(this.frame.bind(this));
  }

  start() {
    InputHandler.registerKeyboardEvents();

    window.requestAnimationFrame(this.frame.bind(this));
  }

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
        position: { x: 10, y: 10 },
        dimensions: {
          sourceX: 67,
          sourceY: 10,
          sourceWidth: 368,
          sourceHeight: 478,
        },
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
