// src/game/Square.ts
// A square holds a piece or is empty
import { BasePiece } from "./pieces/BasePiece";

export class Square {
  constructor(public x: number, public y: number, public piece: BasePiece | null = null) {}
}
