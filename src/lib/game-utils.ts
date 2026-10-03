import type { GameResults } from "@/lib/types";

export function calculateResults(
  correctItems: number,
  incorrectItems: number,
  correctCharacters: number,
  totalCharacters: number,
  elapsedSeconds: number,
): GameResults {
  const minutes = Math.max(elapsedSeconds, 1) / 60;

  return {
    score: correctItems * 100,
    wpm: Math.round(correctCharacters / 5 / minutes),
    accuracy: totalCharacters === 0
      ? 100
      : Math.round((correctCharacters / totalCharacters) * 100),
    itemsTyped: correctItems + incorrectItems,
    correctItems,
    incorrectItems,
  };
}

export function countCorrectCharacters(expected: string, typed: string): number {
  return Array.from(typed).reduce(
    (total, character, index) => total + Number(character === expected[index]),
    0,
  );
}
