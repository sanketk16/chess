// src/components/Square.tsx
import React from 'react';
import { PieceInfo } from '../types';

interface SquareProps {
  piece: PieceInfo | null;
  x: number;
  y: number;
  onClick: () => void;
  selected: boolean;
}

const Square: React.FC<SquareProps> = ({ piece, x, y, onClick, selected }) => {
  const isDark = (x+y) % 2 === 1;
  const background = selected ? "yellow" : (isDark ? "#769656" : "#eeeed2");
  
  return (
    <div onClick={onClick} style={{
      width: "60px",
      height: "60px",
      backgroundColor: background,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      userSelect: "none",
      fontWeight: "bold"
    }}>
      {piece ? pieceIcon(piece) : ""}
    </div>
  );
}

function pieceIcon(piece: PieceInfo): string {
  // Simple text representation. Could swap with actual chess icons or images.
  // The piece.type names are: Monarch, GrandVizier, Tower, Charger, Priest, FootSoldier.
  // Let's map them to standard letters:
  const map:any = {
    "Monarch": "K",
    "GrandVizier": "Q",
    "Tower": "R",
    "Charger": "N",
    "Priest": "B",
    "FootSoldier": "P"
  };

  const char = map[piece.type] || "?";
  return piece.color === "WHITE" ? char : char.toLowerCase();
}

export default Square;
