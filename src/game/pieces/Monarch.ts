// src/game/pieces/Monarch.ts (king)
import { BasePiece, PieceColor } from "./BasePiece";

export class Monarch extends BasePiece {
  constructor(color: PieceColor) {
    super(color);
  }

  canMove(startX: number, startY: number, endX: number, endY: number, board: any): boolean {
    // King moves 1 step in any direction
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);
    return dx <= 1 && dy <= 1;
  }
}
