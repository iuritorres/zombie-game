import { controls } from "../settings/controls";
import { Control } from "../types/controls";

const mappedKeys = Object.values(controls.keyboard);

function InputGuard(fn: (event: KeyboardEvent) => void) {
  return (event: KeyboardEvent) => {
    event.preventDefault();
    if (!mappedKeys.includes(event.key)) return;

    fn(event);
  };
}

const pressedKeys: Set<string> = new Set();
const heldKeys: Set<string> = new Set();

export const controlHistory: string[] = [];

export class InputHandler {
  @InputGuard
  static handleKeyDown(event: KeyboardEvent) {
    heldKeys.add(event.key);
  }

  @InputGuard
  static handleKeyUp(event: KeyboardEvent) {
    heldKeys.delete(event.key);
    pressedKeys.delete(event.key);

    if (controlHistory.length > 10) {
      controlHistory.shift();
    }

    controlHistory.push(event.key);
  }

  // Key Helpers
  static isKeyDown(code: string) {
    return heldKeys.has(code);
  }

  static isKeyUp(code: string) {
    return !heldKeys.has(code);
  }

  static isKeyPressed(code: string) {
    if (heldKeys.has(code) && !pressedKeys.has(code)) {
      pressedKeys.add(code);
      return true;
    }

    return false;
  }

  // Direction Helpers
  static isUp() {
    return this.isKeyDown(controls.keyboard[Control.UP]);
  }

  static isDown() {
    return this.isKeyDown(controls.keyboard[Control.DOWN]);
  }

  static isLeft() {
    return this.isKeyDown(controls.keyboard[Control.LEFT]);
  }

  static isRight() {
    return this.isKeyDown(controls.keyboard[Control.RIGHT]);
  }

  static registerKeyboardEvents() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }
}
