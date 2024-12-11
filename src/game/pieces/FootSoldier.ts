// src/game/pieces/FootSoldier.ts (Pawn)
import { BasePiece, PieceColor } from "./BasePiece";

export class FootSoldier extends BasePiece {
  hasMoved = false;

  constructor(color: PieceColor) {
    super(color);
  }

  canMove(startX: number, startY: number, endX: number, endY: number, board: any): boolean {
    // Pawn moves differ depending on color
    const direction = this.color === PieceColor.WHITE ? -1 : 1;
    const dy = endY - startY;
    const dx = endX - startX;

    // Basic move: one step forward
    if (dx === 0 && dy === direction) {
      // Must not be occupied
      return !board.getSquare(endX, endY).piece;
    }

    // Two step move if not moved yet
    if (!this.hasMoved && dx === 0 && dy === 2 * direction) {
      return !board.getSquare(startX, startY + direction).piece &&
             !board.getSquare(endX, endY).piece;
    }

    // Capture move
    if (Math.abs(dx) === 1 && dy === direction) {
      const target = board.getSquare(endX, endY).piece;
      return target && target.color !== this.color;
    }

    return false;
  }
}
