"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GameStats from "@/components/game-stats";
import { countCorrectCharacters } from "@/lib/game-utils";
import type { Difficulty, GameMode } from "@/lib/types";

interface GameScreenProps {
  words: string[];
  wordIndex: number;
  input: string;
  onInputChange: (value: string) => void;
  onSubmitWord: () => void;
  timeLeft: number;
  wpm: number;
  accuracy: number;
  itemsTyped: number;
  difficulty: Difficulty;
  mode: GameMode;
}

export default function GameScreen({
  words,
  wordIndex,
  input,
  onInputChange,
  onSubmitWord,
  timeLeft,
  wpm,
  accuracy,
  itemsTyped,
  difficulty,
  mode,
}: GameScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentWord = words[wordIndex] ?? "";
  const isSentenceMode = mode === "sentences";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.section
      key="playing"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24 }}
      className="mx-auto w-full max-w-3xl"
    >
      <div className="mb-5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs text-[#90989f]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span>In the zone</span>
        </div>
        <span className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{difficulty}</span>
      </div>

      <GameStats
        timeLeft={timeLeft}
        wpm={wpm}
        accuracy={accuracy}
        wordsTyped={itemsTyped}
        isPlaying
        itemLabel={isSentenceMode ? "Sentences" : "Words"}
      />

      <div
        role="group"
        aria-label="Typing area"
        onClick={() => inputRef.current?.focus()}
        className="mt-5 block w-full cursor-text rounded-2xl border border-line bg-surface px-5 py-8 text-left sm:px-8 sm:py-11"
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
            {isSentenceMode ? "Type this sentence" : "Current word"}
          </span>
          <span className="font-mono text-[11px] text-[#667078]">{String(wordIndex + 1).padStart(2, "0")} <span className="text-[#414950]">/</span> ∞</span>
        </div>
        <div className={`min-h-[76px] font-mono font-medium tracking-[-0.045em] sm:min-h-[100px] ${
          isSentenceMode
            ? "break-words whitespace-pre-wrap text-xl leading-relaxed sm:text-2xl"
            : "word-scrollbar overflow-x-auto whitespace-nowrap text-3xl sm:text-5xl"
        }`}>
          {Array.from(currentWord).map((character, index) => {
            const typedCharacter = input[index];
            const characterClass = typedCharacter === undefined
              ? index === input.length ? "text-[#f2f4f5]" : "text-[#606970]"
              : typedCharacter === character ? "text-accent" : "text-[#ff7d75] underline decoration-[#ff7d75]/50 underline-offset-4";

            return (
              <span key={`${wordIndex}-${index}`} className={`relative ${characterClass}`}>
                {index === input.length && (
                  <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -left-[2px] top-[0.08em] h-[0.9em] w-[2px] rounded-full bg-accent"
                  />
                )}
                {character}
              </span>
            );
          })}
        </div>
        <div className="mt-5 h-px w-full bg-line" />
        <label htmlFor="typing-input" className="sr-only">
          {isSentenceMode ? "Type the displayed sentence" : "Type the displayed word"}
        </label>
        <input
          ref={inputRef}
          id="typing-input"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if ((isSentenceMode && event.key === "Enter") || (!isSentenceMode && (event.key === " " || event.key === "Enter"))) {
              event.preventDefault();
              onSubmitWord();
            }
          }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={currentWord.length + (isSentenceMode ? 5 : 2)}
          placeholder={isSentenceMode ? "Type the full sentence here..." : "Start typing here..."}
          className="typing-input mt-3 w-full bg-transparent font-mono text-base text-[#dce1e4] placeholder:font-sans placeholder:text-sm placeholder:tracking-normal"
        />
        <p className="mt-3 text-[11px] text-[#687179]">
          {isSentenceMode ? "Press enter when you finish the sentence" : "Press space or enter to submit the word"}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#717a81]">
        <span className="font-mono text-accent">{countCorrectCharacters(currentWord, input)}</span>
        <span>correct characters</span>
      </div>
    </motion.section>
  );
}
