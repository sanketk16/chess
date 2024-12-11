// src/db.ts
import { Match } from "./game/Match";

const matchStore: Map<string, Match> = new Map();

export function storeMatch(id: string, match: Match) {
  matchStore.set(id, match);
}

export function getMatch(id: string): Match | undefined {
  return matchStore.get(id);
}
