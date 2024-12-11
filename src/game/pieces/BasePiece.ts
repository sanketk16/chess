
// src/game/pieces/BasePiece.ts
// Abstract class representing a chess piece (color, canMove method, etc.)
export enum PieceColor {
    WHITE = "WHITE",
    BLACK = "BLACK",
  }
  
  export abstract class BasePiece {
    constructor(public color: PieceColor) {}
  
    // Each piece type must implement how it moves
    abstract canMove(startX: number, startY: number, endX: number, endY: number, board: any): boolean;
  
    // Convenience method: check if move stays inside board limits
    protected isWithinBounds(x: number, y: number): boolean {
      return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
  }
  