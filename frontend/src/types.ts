// src/types.ts
export type PieceColor = "WHITE" | "BLACK";

export interface PieceInfo {
  color: PieceColor;
  type: string;
}

export type BoardState = (PieceInfo | null)[][];

export interface BoardResponse {
  board: BoardState;
  turn: PieceColor;
  status: number; // 0=ONGOING, 1=CHECKMATE, etc.
}

export interface NewMatchResponse {
  matchId: string;
}
