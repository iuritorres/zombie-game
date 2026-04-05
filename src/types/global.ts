export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
}

export interface Frame {
  dimensions: Dimensions;
}
