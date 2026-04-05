import { controlHistory, InputHandler } from "../engine/InputHandler";
import { PlayerState } from "../types/player";
import { drawFrame, Frame } from "../utils/context";

interface ConstructorParams {
  name: string;
  image: HTMLImageElement;
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

  states: Record<
    PlayerState,
    {
      update: () => void;
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

  constructor({ name, image }: ConstructorParams) {
    this.name = name;
    this.image = image;
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
  }

  handleIdleState() {
    if (InputHandler.isUp()) this.changeState(PlayerState.WALK_UP);
    else if (InputHandler.isDown()) this.changeState(PlayerState.WALK_DOWN);
    else if (InputHandler.isLeft()) this.changeState(PlayerState.WALK_LEFT);
    else if (InputHandler.isRight()) this.changeState(PlayerState.WALK_RIGHT);
  }

  handleWalkState() {
    if (InputHandler.isUp()) this.changeState(PlayerState.WALK_UP);
    else if (InputHandler.isDown()) this.changeState(PlayerState.WALK_DOWN);
    else if (InputHandler.isLeft()) this.changeState(PlayerState.WALK_LEFT);
    else if (InputHandler.isRight()) this.changeState(PlayerState.WALK_RIGHT);
    else {
      console.log("pressedKeys", controlHistory);
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
  }

  async draw(context: CanvasRenderingContext2D, frameTimeDelta: number) {
    this.states[this.currentState]?.update();

    // REAL DRAW CODE
    const currentAnimationFrames = this.animations[this.currentState] ?? [];
    if (currentAnimationFrames.length === 0) return;

    this.animationTimer += frameTimeDelta;

    const currentFrameData = currentAnimationFrames[this.animationFrame];
    if (this.animationTimer >= currentFrameData.frameDuration) {
      this.animationTimer = 0;
      this.animationFrame =
        (this.animationFrame + 1) % currentAnimationFrames.length;
    }

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
      dimensions: frame.dimensions,
      position: { x: 50, y: 50 },
    });
  }
}
