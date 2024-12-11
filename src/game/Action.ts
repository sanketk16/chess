// src/game/Action.ts
import { Participant } from "./Participant";

export class Action {
  constructor(
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number,
    public player: Participant
  ) {}
}
