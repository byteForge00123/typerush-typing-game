"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GameScreen from "@/components/game-screen";
import ResultsScreen from "@/components/results-screen";
import StartScreen from "@/components/start-screen";
import { calculateResults, countCorrectCharacters } from "@/lib/game-utils";
import { createSentenceQueue, createWordQueue } from "@/lib/words";
import type { Difficulty, GameMode, GamePhase, GameResults } from "@/lib/types";

const GAME_DURATION = 30;

export default function TypingGame() {
  const [phase, setPhase] = useState<GamePhase>("ready");
  const [mode, setMode] = useState<GameMode>("words");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [words, setWords] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [results, setResults] = useState<GameResults | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((remaining) => Math.max(0, remaining - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const startGame = useCallback(() => {
    setWords(mode === "sentences" ? createSentenceQueue(difficulty) : createWordQueue(difficulty));
    setWordIndex(0);
    setInput("");
    setTimeLeft(GAME_DURATION);
    setCorrectWords(0);
    setIncorrectWords(0);
    setCorrectCharacters(0);
    setTotalCharacters(0);
    setResults(null);
    startTimeRef.current = Date.now();
    setPhase("playing");
  }, [difficulty, mode]);

  const backToDashboard = useCallback(() => {
    setWords([]);
    setWordIndex(0);
    setInput("");
    setTimeLeft(GAME_DURATION);
    setCorrectWords(0);
    setIncorrectWords(0);
    setCorrectCharacters(0);
    setTotalCharacters(0);
    setResults(null);
    startTimeRef.current = null;
    setPhase("ready");
  }, []);

  useEffect(() => {
    if (phase !== "playing" || timeLeft > 0) return;
    const elapsed = Math.min(
      GAME_DURATION,
      Math.max(1, (Date.now() - (startTimeRef.current ?? Date.now())) / 1000),
    );
    const finalWord = words[wordIndex] ?? "";
    const pendingCharacters = input.length;
    const pendingCorrectCharacters = countCorrectCharacters(finalWord, input);
    const hasPendingWord = pendingCharacters > 0;
    const pendingWordIsCorrect = hasPendingWord && input === finalWord;
    setResults(calculateResults(
      correctWords + Number(pendingWordIsCorrect),
      incorrectWords + Number(hasPendingWord && !pendingWordIsCorrect),
      correctCharacters + pendingCorrectCharacters,
      totalCharacters + pendingCharacters,
      elapsed,
    ));
    setPhase("finished");
  }, [
    phase,
    timeLeft,
    words,
    wordIndex,
    input,
    correctWords,
    incorrectWords,
    correctCharacters,
    totalCharacters,
  ]);

  const activeWord = words[wordIndex] ?? "";
  const typedCorrectCharacters = useMemo(
    () => countCorrectCharacters(activeWord, input),
    [activeWord, input],
  );
  const liveTotalCharacters = totalCharacters + input.length;
  const liveCorrectCharacters = correctCharacters + typedCorrectCharacters;
  const elapsedSeconds = Math.max(1, GAME_DURATION - timeLeft);
  const wpm = Math.round(liveCorrectCharacters / 5 / (elapsedSeconds / 60));
  const accuracy = liveTotalCharacters === 0
    ? 100
    : Math.round((liveCorrectCharacters / liveTotalCharacters) * 100);

  const submitWord = useCallback(() => {
    if (phase !== "playing" || !activeWord || !input.trim()) return;
    const correctCount = countCorrectCharacters(activeWord, input);
    const isCorrect = input === activeWord;

    setCorrectCharacters((total) => total + correctCount);
    setTotalCharacters((total) => total + input.length);
    if (isCorrect) setCorrectWords((total) => total + 1);
    else setIncorrectWords((total) => total + 1);
    setInput("");
    setWordIndex((index) => index + 1);
  }, [phase, activeWord, input]);

  return (
    <main className="relative flex min-h-screen flex-col px-4 py-5 sm:px-8 sm:py-7">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="TypeRush home">
          <span className="text-sm font-semibold tracking-[-0.02em] text-[#e7eaec]">Type<span className="text-accent">Rush</span></span>
        </Link>
        <div className="flex items-center gap-2 text-[11px] text-[#737c83]">
          <span className="hidden sm:inline">A small daily challenge</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#485057] sm:block" />
          <span>30 seconds</span>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {phase === "ready" && (
            <StartScreen
              key="start"
              mode={mode}
              onModeChange={setMode}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              onStart={startGame}
            />
          )}
          {phase === "playing" && (
            <GameScreen
              key="game"
              words={words}
              wordIndex={wordIndex}
              input={input}
              onInputChange={setInput}
              onSubmitWord={submitWord}
              timeLeft={timeLeft}
              wpm={wpm}
              accuracy={accuracy}
              itemsTyped={correctWords + incorrectWords}
              difficulty={difficulty}
              mode={mode}
            />
          )}
          {phase === "finished" && results && (
            <ResultsScreen
              key="results"
              results={results}
              mode={mode}
              onTryAgain={startGame}
              onBackToDashboard={backToDashboard}
            />
          )}
        </AnimatePresence>
      </div>

      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between border-t border-[#1d2226] pt-4 text-[10px] text-[#687179]">
        <span>Made for the love of the keystroke.</span>
        <span className="font-mono">TYPERUSH / 001</span>
      </footer>
    </main>
  );
}
