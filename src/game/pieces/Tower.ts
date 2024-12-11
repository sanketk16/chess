// src/game/pieces/Tower.ts (Rook)
import { BasePiece, PieceColor } from "./BasePiece";

export class Tower extends BasePiece {
  constructor(color: PieceColor) {
    super(color);
  }

  canMove(startX: number, startY: number, endX: number, endY: number, board: any): boolean {
    // Rook moves in straight lines
    if (startX === endX || startY === endY) {
      return this.pathClear(startX, startY, endX, endY, board);
    }
    return false;
  }

  private pathClear(sx: number, sy: number, ex: number, ey: number, board: any): boolean {
    const xStep = sx === ex ? 0 : (ex > sx ? 1 : -1);
    const yStep = sy === ey ? 0 : (ey > sy ? 1 : -1);

    let x = sx + xStep;
    let y = sy + yStep;
    while (x !== ex || y !== ey) {
      if (board.getSquare(x, y).piece) return false;
      x += xStep;
      y += yStep;
    }
    return true;
  }
}
