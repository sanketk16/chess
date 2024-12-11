// src/game/Match.ts
import { ChessBoard } from "./ChessBoard";
import { Participant } from "./Participant";
import { Action } from "./Action";
import { PieceColor, BasePiece } from "./pieces/BasePiece";

export enum MatchStatus {
  ONGOING,
  CHECKMATE,
  STALEMATE,
  DRAW
}

export class Match {
  board: ChessBoard;
  currentTurn: PieceColor;
  status: MatchStatus = MatchStatus.ONGOING;
  moves: Action[] = [];

  constructor(public whitePlayer: Participant, public blackPlayer: Participant) {
    this.board = new ChessBoard();
    this.currentTurn = PieceColor.WHITE;
  }

  makeMove(action: Action): boolean {
    if (action.player.color !== this.currentTurn) return false;

    const startSquare = this.board.getSquare(action.startX, action.startY);
    const endSquare = this.board.getSquare(action.endX, action.endY);

    const piece = startSquare.piece;
    if (!piece) return false;

    if (piece.color !== this.currentTurn) return false;

    if (!piece.canMove(action.startX, action.startY, action.endX, action.endY, this.board)) {
      return false;
    }

    // If there's a piece at the end, capture it
    if (endSquare.piece && endSquare.piece.color !== piece.color) {
      // capture logic
    }

    // Move piece
    endSquare.piece = piece;
    startSquare.piece = null;

    // If it's a FootSoldier, mark hasMoved
    if ((piece as any).hasMoved !== undefined) {
      (piece as any).hasMoved = true;
    }

    this.moves.push(action);

    // Switch turn
    this.currentTurn = this.currentTurn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
    return true;
  }
}
