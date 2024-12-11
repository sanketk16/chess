// src/App.tsx
import React, { useEffect, useState } from 'react';
import { createNewMatch, getBoard, makeMove } from './api';
import { BoardState, PieceColor } from './types';
import Board from './components/Board';
import StatusBar from './components/StatusBar';

const App: React.FC = () => {
  const [matchId, setMatchId] = useState<string>("");
  const [board, setBoard] = useState<BoardState>([]);
  const [turn, setTurn] = useState<PieceColor>("WHITE");
  const [status, setStatus] = useState<number>(0);
  const [selectedSquare, setSelectedSquare] = useState<{x:number, y:number} | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      const id = await createNewMatch();
      setMatchId(id);
      const data = await getBoard(id);
      setBoard(data.board);
      setTurn(data.turn);
      setStatus(data.status);
    })();
  }, []);

  const refreshBoard = async () => {
    if(!matchId) return;
    const data = await getBoard(matchId);
    setBoard(data.board);
    setTurn(data.turn);
    setStatus(data.status);
  }

  const handleSquareClick = async (x: number, y: number) => {
    setErrorMsg("");
    // If no piece selected yet, select if it matches the current turn color and is not empty
    if(!selectedSquare) {
      const piece = board[y][x];
      if(piece && piece.color === turn) {
        setSelectedSquare({x,y});
      }
    } else {
      // We have a selected piece; now we try to make a move
      const {x: sx, y: sy} = selectedSquare;
      if(sx === x && sy === y) {
        // Same square clicked, deselect
        setSelectedSquare(null);
        return;
      }

      const result = await makeMove(matchId, sx, sy, x, y);
      if(result.success) {
        await refreshBoard();
        setSelectedSquare(null);
      } else {
        setErrorMsg(result.error || "Invalid move");
        setSelectedSquare(null);
      }
    }
  }

  return (
    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1>Chess Game</h1>
      {errorMsg && <div style={{color:"red"}}>{errorMsg}</div>}
      <StatusBar turn={turn} status={status} />
      <Board board={board} onSquareClick={handleSquareClick} selectedSquare={selectedSquare} />
    </div>
  );
}

export default App;
