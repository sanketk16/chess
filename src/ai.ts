// src/ai.ts
import { Match } from "./game/Match";
import { Action } from "./game/Action";

export function getAIMove(match: Match): Action | null {
  // Find all possible moves for AI color
  const color = match.currentTurn;
  const moves: Action[] = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const sq = match.board.getSquare(x, y);
      if (sq.piece && sq.piece.color === color) {
        // Try moves in all directions (simplified)
        for (let ey = 0; ey < 8; ey++) {
          for (let ex = 0; ex < 8; ex++) {
            if (sq.piece.canMove(x, y, ex, ey, match.board)) {
              moves.push(new Action(x, y, ex, ey, color === "WHITE" ? match.whitePlayer : match.blackPlayer));
            }
          }
        }
      }
    }
  }

  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}
