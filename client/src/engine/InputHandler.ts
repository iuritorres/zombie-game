import { controls } from "../settings/controls";
import { Control } from "../types/controls";
import { Position } from "../types/global";
import { Camera } from "./Camera";

const mappedKeys = Object.values(controls.keyboard);

function InputGuard(fn: (event: KeyboardEvent) => void) {
  return (event: KeyboardEvent) => {
    event.preventDefault();
    if (!mappedKeys.includes(event.code)) return;

    fn(event);
  };
}

const pressedKeys: Set<string> = new Set();
const heldKeys: Set<string> = new Set();

export const controlHistory: string[] = [];

const cursorElement = document.getElementById(
  "custom-cursor",
) as HTMLImageElement | null;
let pendingMouseX = 0;
let pendingMouseY = 0;

export class InputHandler {
  static clickTarget: Position | null = null;

  // Event Handlers
  @InputGuard
  static handleKeyDown(event: KeyboardEvent) {
    heldKeys.add(event.code);
  }

  @InputGuard
  static handleKeyUp(event: KeyboardEvent) {
    heldKeys.delete(event.code);
    pressedKeys.delete(event.code);

    if (controlHistory.length > 10) {
      controlHistory.shift();
    }

    controlHistory.push(event.code);
  }

  static handleMouseMove(event: MouseEvent) {
    pendingMouseX = event.clientX;
    pendingMouseY = event.clientY;
  }

  static updateCursor() {
    if (cursorElement) {
      cursorElement.style.transform = `translate(${pendingMouseX}px, ${pendingMouseY}px)`;
    }
  }

  static handleMouseClick(event: MouseEvent, camera: Camera) {
    event.preventDefault();

    const canvas = document.querySelector("canvas")!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    this.clickTarget = {
      x: (event.clientX - rect.left) * scaleX + camera.position.x,
      y: (event.clientY - rect.top) * scaleY + camera.position.y,
    };
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

  static isMap() {
    return this.isKeyDown(controls.keyboard[Control.MAP]);
  }

  static registerKeyboardEvents() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  static registerCursorEvents() {
    window.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event),
    );
  }

  static registerMouseEvents(camera: Camera) {
    window.addEventListener("contextmenu", (event) => {
      this.handleMouseClick(event, camera);
    });
  }
}
