// src/server.ts
import express, { Express, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Match, MatchStatus } from './game/Match';
import { Participant } from './game/Participant';
import { PieceColor } from './game/pieces/BasePiece';
import { Action } from './game/Action';
import { getMatch, storeMatch } from './db';
import { getAIMove } from './ai';

// const app = express();
const app: Express = express();
app.use(express.json());

// Create a new match
app.post('/new_match', (req, res) => {
  const white = new Participant(PieceColor.WHITE, false);
  const black = new Participant(PieceColor.BLACK, true);
  const match = new Match(white, black);
  const id = uuidv4();
  storeMatch(id, match);
  res.json({ matchId: id });
});

// Get board state
app.get('/board/:id', (req, res) => {
  const match = getMatch(req.params.id);
  if (!match) return res.status(404).json({ error: "Match not found" });

  // Return a simplified board
  const boardState = match.board.squares.map(row => 
    row.map(sq => sq.piece ? { color: sq.piece.color, type: sq.piece.constructor.name } : null)
  );
  res.json({ board: boardState, turn: match.currentTurn, status: match.status });
});

// Make a move
app.post('/move/:id', (req, res) => {
  const match = getMatch(req.params.id);
  if (!match) return res.status(404).json({ error: "Match not found" });

  const { startX, startY, endX, endY } = req.body;
  const playerColor = match.currentTurn;
  const player = playerColor === PieceColor.WHITE ? match.whitePlayer : match.blackPlayer;

  const action = new Action(startX, startY, endX, endY, player);
  const success = match.makeMove(action);
  if (!success) {
    return res.status(400).json({ error: "Invalid move" });
  }

  // If AI's turn, make AI move
  if (match.currentTurn !== playerColor) {
    if ((match.currentTurn === PieceColor.WHITE && match.whitePlayer.isAI) ||
        (match.currentTurn === PieceColor.BLACK && match.blackPlayer.isAI)) {
      const aiAction = getAIMove(match);
      if (aiAction) {
        match.makeMove(aiAction);
      }
    }
  }

  res.json({ success: true });
});

app.listen(4000, () => {
  console.log("Chess server running on port 3000");
});
