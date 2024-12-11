// src/components/Board.tsx
import React from 'react';
import { BoardState } from '../types';
import Square from './Square';

interface BoardProps {
  board: BoardState;
  onSquareClick: (x:number,y:number)=>void;
  selectedSquare: {x:number,y:number} | null;
}

const Board: React.FC<BoardProps> = ({ board, onSquareClick, selectedSquare }) => {
  // board[y][x]
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(8, 60px)", border: "2px solid #000"}}>
      {board.map((row,y) =>
        row.map((piece,x) => {
          const isSelected = selectedSquare?.x === x && selectedSquare?.y === y;
          return <Square 
            key={`${x},${y}`} 
            piece={piece} 
            x={x} 
            y={y} 
            onClick={() => onSquareClick(x,y)} 
            selected={isSelected}
          />;
        })
      )}
    </div>
  );
}

export default Board;
