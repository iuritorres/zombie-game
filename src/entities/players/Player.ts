import { CONTROL_TYPE, ENABLE_DEBUG } from "../../constants/game";
import { Camera } from "../../engine/Camera";
import { controlHistory, InputHandler } from "../../engine/InputHandler";
import { ControlType } from "../../types/controls";
import { Attributes, Dimensions, Frame, Position } from "../../types/global";
import { PlayerState } from "../../types/player";
import { drawFrame } from "../../utils/context";
import { Debug } from "../../utils/debug";

interface ConstructorParams {
  name: string;
  image: HTMLImageElement;
  attributes: Attributes;
}

export class Player {
  name: string;
  image: HTMLImageElement;

  currentState: PlayerState = PlayerState.IDLE_DOWN;
  frames: Map<string, Frame> = new Map();

  animationFrame = 0;
  animationTimer = 0;
  animations: Partial<
    Record<
      PlayerState,
      {
        frameKey: string;
        frameDuration: number;
      }[]
    >
  > = {};

  attributes: Attributes;

  collisionBox: Dimensions = {
    x: 2,
    y: 28,
    width: 12,
    height: 8,
  };

  position: Position = {
    x: 210,
    y: 100,
  };

  velocity = {
    x: 0,
    y: 0,
  };

  states: Record<
    PlayerState,
    {
      update: (camera?: Camera) => void;
      validFrom?: PlayerState[];
    }
  > = {
    [PlayerState.IDLE_UP]: {
      update: this.handleIdleState.bind(this),
    },
    [PlayerState.IDLE_DOWN]: {
      update: this.handleIdleState.bind(this),
    },
    [PlayerState.IDLE_LEFT]: {
      update: this.handleIdleState.bind(this),
    },
    [PlayerState.IDLE_RIGHT]: {
      update: this.handleIdleState.bind(this),
    },
    [PlayerState.WALK_UP]: {
      update: this.handleWalkState.bind(this),
      validFrom: [
        PlayerState.IDLE_UP,
        PlayerState.IDLE_DOWN,
        PlayerState.IDLE_LEFT,
        PlayerState.IDLE_RIGHT,
        PlayerState.WALK_DOWN,
        PlayerState.WALK_LEFT,
        PlayerState.WALK_RIGHT,
      ],
    },
    [PlayerState.WALK_DOWN]: {
      update: this.handleWalkState.bind(this),
      validFrom: [
        PlayerState.IDLE_UP,
        PlayerState.IDLE_DOWN,
        PlayerState.IDLE_LEFT,
        PlayerState.IDLE_RIGHT,
        PlayerState.WALK_UP,
        PlayerState.WALK_LEFT,
        PlayerState.WALK_RIGHT,
      ],
    },
    [PlayerState.WALK_LEFT]: {
      update: this.handleWalkState.bind(this),
      validFrom: [
        PlayerState.IDLE_UP,
        PlayerState.IDLE_DOWN,
        PlayerState.IDLE_LEFT,
        PlayerState.IDLE_RIGHT,
        PlayerState.WALK_UP,
        PlayerState.WALK_DOWN,
        PlayerState.WALK_RIGHT,
      ],
    },
    [PlayerState.WALK_RIGHT]: {
      update: this.handleWalkState.bind(this),
      validFrom: [
        PlayerState.IDLE_UP,
        PlayerState.IDLE_DOWN,
        PlayerState.IDLE_LEFT,
        PlayerState.IDLE_RIGHT,
        PlayerState.WALK_UP,
        PlayerState.WALK_DOWN,
        PlayerState.WALK_LEFT,
      ],
    },
  };

  constructor({ name, image, attributes }: ConstructorParams) {
    this.name = name;
    this.image = image;
    this.attributes = attributes;
  }

  getCollisionBox(): Dimensions {
    return {
      x: this.position.x + this.collisionBox.x,
      y: this.position.y + this.collisionBox.y,
      width: this.collisionBox.width,
      height: this.collisionBox.height,
    };
  }

  changeState(newState: PlayerState) {
    const validFrom = this.states[newState].validFrom;

    if (
      newState === this.currentState ||
      (validFrom !== undefined && !validFrom.includes(this.currentState))
    ) {
      return;
    }

    this.currentState = newState;
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.velocity = { x: 0, y: 0 };
  }

  handleIdleState() {
    if (CONTROL_TYPE === ControlType.KEYBOARD) {
      if (InputHandler.isUp()) this.changeState(PlayerState.WALK_UP);
      else if (InputHandler.isDown()) this.changeState(PlayerState.WALK_DOWN);
      else if (InputHandler.isLeft()) this.changeState(PlayerState.WALK_LEFT);
      else if (InputHandler.isRight()) this.changeState(PlayerState.WALK_RIGHT);
    } else if (CONTROL_TYPE === ControlType.MOUSE) {
      if (!InputHandler.clickTarget) return;
      const { x: targetX, y: targetY } = InputHandler.clickTarget;
      const feetX =
        this.position.x + this.collisionBox.x + this.collisionBox.width / 2;
      const feetY =
        this.position.y + this.collisionBox.y + this.collisionBox.height / 2;

      const distanceX = targetX - feetX;
      const distanceY = targetY - feetY;

      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        this.changeState(
          distanceX > 0 ? PlayerState.WALK_RIGHT : PlayerState.WALK_LEFT,
        );
      } else {
        this.changeState(
          distanceY > 0 ? PlayerState.WALK_DOWN : PlayerState.WALK_UP,
        );
      }
    }
  }

  handleWalkState(camera?: Camera) {
    if (CONTROL_TYPE === ControlType.KEYBOARD) {
      if (InputHandler.isUp()) {
        this.changeState(PlayerState.WALK_UP);
        this.velocity.y = -this.attributes.movementSpeed;
      } else if (InputHandler.isDown()) {
        this.changeState(PlayerState.WALK_DOWN);
        this.velocity.y = this.attributes.movementSpeed;
      } else if (InputHandler.isLeft()) {
        this.changeState(PlayerState.WALK_LEFT);
        this.velocity.x = -this.attributes.movementSpeed;
      } else if (InputHandler.isRight()) {
        this.changeState(PlayerState.WALK_RIGHT);
        this.velocity.x = this.attributes.movementSpeed;
      } else {
        const directionalKeys = [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ];

        const lastDirectionKey = controlHistory
          .slice()
          .reverse()
          .find((key) => directionalKeys.includes(key));

        switch (lastDirectionKey) {
          case "ArrowUp":
            this.changeState(PlayerState.IDLE_UP);
            break;
          case "ArrowLeft":
            this.changeState(PlayerState.IDLE_LEFT);
            break;
          case "ArrowRight":
            this.changeState(PlayerState.IDLE_RIGHT);
            break;
          default:
            this.changeState(PlayerState.IDLE_DOWN);
            this.changeState(PlayerState.IDLE_DOWN);
        }
      }
    } else if (CONTROL_TYPE === ControlType.MOUSE) {
      if (!InputHandler.clickTarget) return;
      const { x: targetX, y: targetY } = InputHandler.clickTarget;
      const feetX =
        this.position.x + this.collisionBox.x + this.collisionBox.width / 2;
      const feetY =
        this.position.y + this.collisionBox.y + this.collisionBox.height / 2;
      const distanceX = targetX - feetX;
      const distanceY = targetY - feetY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < 5) {
        InputHandler.clickTarget = null;
        this.velocity = { x: 0, y: 0 };
        this.changeState(PlayerState.IDLE_DOWN);
        return;
      }

      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        this.changeState(
          distanceX > 0 ? PlayerState.WALK_RIGHT : PlayerState.WALK_LEFT,
        );
      } else {
        this.changeState(
          distanceY > 0 ? PlayerState.WALK_DOWN : PlayerState.WALK_UP,
        );
      }

      this.velocity.x = (distanceX / distance) * this.attributes.movementSpeed;
      this.velocity.y = (distanceY / distance) * this.attributes.movementSpeed;
    }
  }

  updatePosition(frameTimeDelta: number) {
    this.position = {
      x: (this.position.x += this.velocity.x * frameTimeDelta),
      y: (this.position.y += this.velocity.y * frameTimeDelta),
    };
  }

  updateAnimation(frameTimeDelta: number) {
    const currentAnimationFrames = this.animations[this.currentState] ?? [];
    if (currentAnimationFrames.length === 0) return;

    this.animationTimer += frameTimeDelta;

    const currentFrameData = currentAnimationFrames[this.animationFrame];
    if (this.animationTimer >= currentFrameData.frameDuration) {
      this.animationTimer = 0;
      this.animationFrame =
        (this.animationFrame + 1) % currentAnimationFrames.length;
    }
  }

  update(frameTimeDelta: number, camera: Camera) {
    this.states[this.currentState]?.update(camera);
    this.updatePosition(frameTimeDelta);
    this.updateAnimation(frameTimeDelta);
  }

  draw(context: CanvasRenderingContext2D, camera: Camera) {
    const currentAnimationFrames = this.animations[this.currentState] ?? [];

    const frame = this.frames.get(
      currentAnimationFrames[this.animationFrame].frameKey,
    );

    if (!frame) {
      console.warn(`Frame with key ${frame} not found for player ${this.name}`);
      return;
    }

    drawFrame({
      context,
      image: this.image,
      position: {
        x: this.position.x - camera.position.x,
        y: this.position.y - camera.position.y,
      },
      dimensions: frame.dimensions,
    });

    if (!ENABLE_DEBUG) return;

    Debug.drawBox(
      context,
      camera,
      { x: 0, y: 0 },
      this.getCollisionBox(),
      "#55FF55",
    );
  }
}
