export interface Position {
  x: number;
  y: number;
}

export interface SpotlightSlice {
  position: Position;
  setPosition: (position: Position) => void;
}
