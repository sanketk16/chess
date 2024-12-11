// src/game/pieces/Charger.ts (Knight)
import { BasePiece, PieceColor } from "./BasePiece";

export class Charger extends BasePiece {
  constructor(color: PieceColor) {
    super(color);
  }

  canMove(startX: number, startY: number, endX: number, endY: number): boolean {
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);

    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  }
}
