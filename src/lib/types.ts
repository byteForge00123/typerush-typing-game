export type Difficulty = "easy" | "medium" | "hard";
export type GameMode = "words" | "sentences";
export type GamePhase = "ready" | "playing" | "finished";

export interface GameResults {
  score: number;
  wpm: number;
  accuracy: number;
  itemsTyped: number;
  correctItems: number;
  incorrectItems: number;
}
