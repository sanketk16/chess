// src/components/StatusBar.tsx
import React from 'react';
import { PieceColor } from '../types';

interface StatusBarProps {
  turn: PieceColor;
  status: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ turn, status }) => {
  let statusText = "";
  switch(status) {
    case 0: 
      statusText = `Turn: ${turn}`;
      break;
    case 1:
      statusText = "Checkmate!";
      break;
    case 2:
      statusText = "Stalemate!";
      break;
    default:
      statusText = "Game Over";
  }

  return (
    <div style={{marginBottom: "10px"}}>
      {statusText}
    </div>
  );
}

export default StatusBar;
