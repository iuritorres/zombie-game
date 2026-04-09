import { CONTROL_TYPE, ENABLE_DEBUG } from "./constants/game";
import { Camera } from "./engine/Camera";
import { InputHandler } from "./engine/InputHandler";
import { ClickIndicator } from "./entities/effects/ClickIndicator";
import { FPSCounter } from "./entities/overlays/FPSCounter";
import { Overlay } from "./entities/overlays/Overlay";
import { Player } from "./entities/players/Player";
import { Zeke } from "./entities/players/Zeke";
import { RescueTheNeighboursStage } from "./entities/stages/Rescue The Neighbours/RescueTheNeighboursStage";
import { ControlType } from "./types/controls";
import { PlayerState } from "./types/player";
import { Position } from "./types/global";
import { boxOverlap } from "./utils/collisions";
import { drawFrame, getContext } from "./utils/context";
import { Debug } from "./utils/debug";

export class ZombieGame {
  context: CanvasRenderingContext2D;
  stage: RescueTheNeighboursStage;
  camera: Camera;
  overlays: Overlay[];
  players: Player[];
  clickIndicator = new ClickIndicator();
  previousClickTarget: Position | null = null;

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
    InputHandler.updateCursor();

    window.requestAnimationFrame(this.frame.bind(this));
  }

  update(frameTimeDelta: number) {
    if (InputHandler.clickTarget !== this.previousClickTarget) {
      this.previousClickTarget = InputHandler.clickTarget;

      if (InputHandler.clickTarget) {
        this.clickIndicator.trigger(
          InputHandler.clickTarget.x,
          InputHandler.clickTarget.y,
        );
      }
    }

    this.clickIndicator.update(frameTimeDelta);

    for (const player of this.players) {
      const previousPosition = { ...player.position };
      player.update(frameTimeDelta, this.camera);

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

    this.clickIndicator.draw(context, this.camera);

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
      0,
      0,
      mapWidth,
      mapHeight,
      offsetX,
      offsetY,
      mapWidth * scale,
      mapHeight * scale,
    );

    for (const player of this.players) {
      const playerFaceFrame = player.frames.get(
        `${PlayerState.IDLE_DOWN}-FACE`,
      )!;

      drawFrame({
        context,
        image: player.image,
        position: {
          x: offsetX + player.position.x * scale,
          y: offsetY + player.position.y * scale,
        },
        dimensions: playerFaceFrame.dimensions,
      });
    }

    if (!ENABLE_DEBUG) return;

    for (const box of this.stage.collisionMap) {
      Debug.drawScaledBox(
        {
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
        },
        offsetX,
        offsetY,
        scale,
        "#7777FF",
        this.context,
      );
    }
  }

  start() {
    InputHandler.registerCursorEvents();

    InputHandler.registerKeyboardEvents();

    if (CONTROL_TYPE === ControlType.MOUSE) {
      InputHandler.registerMouseEvents(this.camera);
    }

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
