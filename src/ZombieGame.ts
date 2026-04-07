import { Camera } from "./engine/Camera";
import { InputHandler } from "./engine/InputHandler";
import { FPSCounter } from "./entities/overlays/FPSCounter";
import { Overlay } from "./entities/overlays/Overlay";
import { Player } from "./entities/players/Player";
import { Zeke } from "./entities/players/Zeke";
import { EveningOfTheUndeadStage } from "./entities/stages/Evening of the Undead/EveningOfTheUndeadStage";
import { RescueTheNeighboursStage } from "./entities/stages/Rescue The Neighbours/RescueTheNeighboursStage";
import { getContext } from "./utils/context";

export class ZombieGame {
  context: CanvasRenderingContext2D;
  stage: RescueTheNeighboursStage;
  camera: Camera;
  overlays: Overlay[];
  players: Player[];

  frameTimestamp = {
    previous: 0,
  };

  constructor() {
    this.context = getContext();

    this.stage = new EveningOfTheUndeadStage();
    this.camera = new Camera();
    this.overlays = [new FPSCounter()];

    this.players = [new Zeke()];
  }

  frame(timestamp: number) {
    const frameTimeDelta = timestamp - this.frameTimestamp.previous;
    this.frameTimestamp.previous = timestamp;

    this.update(frameTimeDelta);

    this.camera.follow(
      this.players[0],
      this.stage,
      this.context.canvas.width,
      this.context.canvas.height,
    );

    this.draw(this.context);

    window.requestAnimationFrame(this.frame.bind(this));
  }

  update(frameTimeDelta: number) {
    for (const player of this.players) {
      player.update(frameTimeDelta);
    }

    for (const overlay of this.overlays) {
      overlay.update(frameTimeDelta);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.stage.draw(context, this.camera);

    for (const player of this.players) {
      player.draw(context, this.camera);
    }

    for (const overlay of this.overlays) {
      overlay.draw(context);
    }
  }

  start() {
    InputHandler.registerKeyboardEvents();

    window.requestAnimationFrame(this.frame.bind(this));
  }

  // startTitleAnimation() {
  //   const zombieImage = document.querySelector(
  //     "img[alt='zombie-image']",
  //   ) as HTMLImageElement;

  //   const FADE_SPEED = 0.01;
  //   const HOLD_DURATION = 1000;
  //   let alpha = 0;
  //   let fadingIn = true;
  //   let holdStart: number | null = null;

  //   const draw = () => {
  //     this.context.clearRect(
  //       0,
  //       0,
  //       this.context.canvas.width,
  //       this.context.canvas.height,
  //     );

  //     this.context.globalAlpha = alpha;

  //     drawFrame({
  //       context: this.context,
  //       image: zombieImage,
  //       position: { x: 10, y: 10 },
  //       dimensions: {
  //         x: 67,
  //         y: 10,
  //         width: 368,
  //         height: 478,
  //       },
  //       scale: 0.09,
  //     });

  //     this.context.font = "36px Zombie";
  //     this.context.fillStyle = "white";
  //     this.context.fillText("ZOMBIE GAME", 55, 50);

  //     this.context.globalAlpha = 1;
  //   };

  //   const animate = (timestamp: number) => {
  //     if (fadingIn) {
  //       alpha += FADE_SPEED;
  //       if (alpha >= 1) {
  //         alpha = 1;
  //         fadingIn = false;
  //         holdStart = timestamp;
  //       }
  //       draw();
  //       requestAnimationFrame(animate);
  //     } else if (holdStart !== null && timestamp - holdStart < HOLD_DURATION) {
  //       draw();
  //       requestAnimationFrame(animate);
  //     } else if (alpha > 0) {
  //       alpha -= FADE_SPEED;
  //       if (alpha < 0) alpha = 0;
  //       draw();
  //       requestAnimationFrame(animate);
  //     }
  //   };

  //   requestAnimationFrame(animate);
  // }
}
