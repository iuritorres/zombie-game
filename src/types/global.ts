export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Frame {
  dimensions: Dimensions;
}

export interface Attributes {
  movementSpeed: number;
}
