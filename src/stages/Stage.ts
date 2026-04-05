interface ConstructorParams {
  image: HTMLImageElement;
}

export abstract class Stage {
  image: HTMLImageElement;

  constructor({ image }: ConstructorParams) {
    this.image = image;
  }

  abstract draw(context: CanvasRenderingContext2D): void;
}
