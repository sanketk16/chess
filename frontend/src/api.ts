// src/api.ts
import { BoardResponse, NewMatchResponse } from "./types";

const BASE_URL = "http://localhost:4000";

export async function createNewMatch(): Promise<string> {
  const res = await fetch(`${BASE_URL}/new_match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data: NewMatchResponse = await res.json();
  return data.matchId;
}

export async function getBoard(matchId: string): Promise<BoardResponse> {
  const res = await fetch(`${BASE_URL}/board/${matchId}`);
  return res.json();
}

export async function makeMove(matchId: string, startX: number, startY: number, endX: number, endY: number): Promise<{success: boolean; error?: string}> {
  const res = await fetch(`${BASE_URL}/move/${matchId}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({startX, startY, endX, endY})
  });
  return res.json();
}
