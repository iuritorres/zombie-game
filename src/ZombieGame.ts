import { ENABLE_DEBUG } from "./constants/game";
import { Camera } from "./engine/Camera";
import { InputHandler } from "./engine/InputHandler";
import { FPSCounter } from "./entities/overlays/FPSCounter";
import { Overlay } from "./entities/overlays/Overlay";
import { Player } from "./entities/players/Player";
import { Zeke } from "./entities/players/Zeke";
import { RescueTheNeighboursStage } from "./entities/stages/Rescue The Neighbours/RescueTheNeighboursStage";
import { boxOverlap } from "./utils/collisions";
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

    this.stage = new RescueTheNeighboursStage();
    this.camera = new Camera();
    this.overlays = [new FPSCounter()];

    this.players = [new Zeke()];
  }

  resolveCollisions(
    player: Player,
    previousPosition: { x: number; y: number },
  ) {
    for (const box of this.stage.collisionMap) {
      const playerBox = player.getCollisionBox();

      if (boxOverlap(playerBox, box)) {
        player.position = previousPosition;
        break;
      }
    }
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
      const previousPosition = { ...player.position };
      player.update(frameTimeDelta);

      this.resolveCollisions(player, previousPosition);
    }

    for (const overlay of this.overlays) {
      overlay.update(frameTimeDelta);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    if (InputHandler.isMap()) {
      this.drawFullMap(context);
      return;
    }

    this.stage.draw(context, this.camera);

    for (const player of this.players) {
      player.draw(context, this.camera);
    }

    for (const overlay of this.overlays) {
      overlay.draw(context);
    }
  }

  drawFullMap(context: CanvasRenderingContext2D) {
    const { width: canvasWidth, height: canvasHeight } = context.canvas;
    const { width: mapWidth, height: mapHeight } = this.stage.image;

    const scale = Math.min(canvasWidth / mapWidth, canvasHeight / mapHeight);
    const offsetX = (canvasWidth - mapWidth * scale) / 2;
    const offsetY = (canvasHeight - mapHeight * scale) / 2;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(
      this.stage.image,
      0, 0, mapWidth, mapHeight,
      offsetX, offsetY, mapWidth * scale, mapHeight * scale,
    );

    if (!ENABLE_DEBUG) return;

    const drawScaledBox = (x: number, y: number, w: number, h: number, color: string) => {
      const sx = offsetX + x * scale + 0.5;
      const sy = offsetY + y * scale + 0.5;
      const sw = w * scale;
      const sh = h * scale;
      context.beginPath();
      context.fillStyle = color + "44";
      context.strokeStyle = color + "AA";
      context.fillRect(sx, sy, sw, sh);
      context.rect(sx, sy, sw, sh);
      context.stroke();
    };

    for (const box of this.stage.collisionMap) {
      drawScaledBox(box.x, box.y, box.width, box.height, "#7777FF");
    }

    for (const player of this.players) {
      const box = player.getCollisionBox();
      drawScaledBox(box.x, box.y, box.width, box.height, "#55FF55");
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
