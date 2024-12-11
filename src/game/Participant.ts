// src/game/Participant.ts
import { PieceColor } from "./pieces/BasePiece";

export class Participant {
  constructor(public color: PieceColor, public isAI: boolean = false) {}
}
