// src/game/ChessBoard.ts
import { Square } from "./Square";
import { BasePiece, PieceColor } from "./pieces/BasePiece";
import { Monarch } from "./pieces/Monarch";
import { GrandVizier } from "./pieces/GrandVizier";
import { Tower } from "./pieces/Tower";
import { Charger } from "./pieces/Charger";
import { Priest } from "./pieces/Priest";
import { FootSoldier } from "./pieces/FootSoldier";

export class ChessBoard {
  squares: Square[][];

  constructor() {
    this.squares = [];
    for (let y = 0; y < 8; y++) {
      const row: Square[] = [];
      for (let x = 0; x < 8; x++) {
        row.push(new Square(x, y, null));
      }
      this.squares.push(row);
    }
    this.initialize();
  }

  getSquare(x: number, y: number): Square {
    return this.squares[y][x];
  }

  private initialize() {
    // Place pieces as in a standard chess game
    // Top row: Black
    this.squares[0][0].piece = new Tower(PieceColor.BLACK);
    this.squares[0][1].piece = new Charger(PieceColor.BLACK);
    this.squares[0][2].piece = new Priest(PieceColor.BLACK);
    this.squares[0][3].piece = new GrandVizier(PieceColor.BLACK);
    this.squares[0][4].piece = new Monarch(PieceColor.BLACK);
    this.squares[0][5].piece = new Priest(PieceColor.BLACK);
    this.squares[0][6].piece = new Charger(PieceColor.BLACK);
    this.squares[0][7].piece = new Tower(PieceColor.BLACK);

    for (let x = 0; x < 8; x++) {
      this.squares[1][x].piece = new FootSoldier(PieceColor.BLACK);
      this.squares[6][x].piece = new FootSoldier(PieceColor.WHITE);
    }

    // Bottom row: White
    this.squares[7][0].piece = new Tower(PieceColor.WHITE);
    this.squares[7][1].piece = new Charger(PieceColor.WHITE);
    this.squares[7][2].piece = new Priest(PieceColor.WHITE);
    this.squares[7][3].piece = new GrandVizier(PieceColor.WHITE);
    this.squares[7][4].piece = new Monarch(PieceColor.WHITE);
    this.squares[7][5].piece = new Priest(PieceColor.WHITE);
    this.squares[7][6].piece = new Charger(PieceColor.WHITE);
    this.squares[7][7].piece = new Tower(PieceColor.WHITE);
  }
}
