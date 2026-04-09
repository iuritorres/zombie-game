import { Stage } from "../Stage";

export class EveningOfTheUndeadStage extends Stage {
  constructor() {
    super({
      image: document.querySelector(
        "img[alt='stage-evening-of-the-undead']",
      ) as HTMLImageElement,
    });

    this.loadCollisionMap();
  }

  loadCollisionMap() {}
}
