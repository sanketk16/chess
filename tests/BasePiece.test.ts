// tests/BasePiece.test.ts
import { Monarch } from "../src/game/pieces/Monarch";
import { PieceColor } from "../src/game/pieces/BasePiece";
import { ChessBoard } from "../src/game/ChessBoard";

test("Monarch moves one step in any direction", () => {
  const board = new ChessBoard();
  const king = new Monarch(PieceColor.WHITE);
  board.getSquare(4,7).piece = king;

  expect(king.canMove(4,7,4,6,board)).toBe(true); // one step forward
  expect(king.canMove(4,7,5,6,board)).toBe(true); // diagonal step
  expect(king.canMove(4,7,6,7,board)).toBe(false); // too far
});
