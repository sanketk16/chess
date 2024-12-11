// src/game/pieces/Priest.ts (Bishop)
import { BasePiece, PieceColor } from "./BasePiece";

export class Priest extends BasePiece {
  constructor(color: PieceColor) {
    super(color);
  }

  canMove(startX: number, startY: number, endX: number, endY: number, board: any): boolean {
    // Bishop moves diagonally
    if (Math.abs(startX - endX) === Math.abs(startY - endY)) {
      return this.pathClear(startX, startY, endX, endY, board);
    }
    return false;
  }

  private pathClear(sx: number, sy: number, ex: number, ey: number, board: any): boolean {
    const xStep = ex > sx ? 1 : -1;
    const yStep = ey > sy ? 1 : -1;

    let x = sx + xStep;
    let y = sy + yStep;
    while (x !== ex && y !== ey) {
      if (board.getSquare(x, y).piece) return false;
      x += xStep;
      y += yStep;
    }
    return true;
  }
}
