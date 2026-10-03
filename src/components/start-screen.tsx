"use client";

import { motion } from "framer-motion";
import DifficultySelector from "@/components/difficulty-selector";
import type { Difficulty, GameMode } from "@/lib/types";

interface StartScreenProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStart: () => void;
}

export default function StartScreen({
  mode,
  onModeChange,
  difficulty,
  onDifficultyChange,
  onStart,
}: StartScreenProps) {
  return (
    <motion.section
      key="start"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24 }}
      className="mx-auto w-full max-w-[560px]"
    >
      <div className="mb-9 text-center sm:mb-11">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">A little focus goes a long way</p>
        <h1 className="text-4xl font-semibold tracking-[-0.055em] text-[#f3f5f6] sm:text-5xl">
          Find your <span className="text-accent">flow.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#929aa1] sm:text-base">
          Thirty seconds to find your rhythm. Pick a quick word challenge or race to finish full sentences.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c2c8cd]">Choose your challenge</span>
          <span className="rounded-md border border-line bg-[#0d1012] px-2 py-1 font-mono text-[10px] text-muted">30 SEC</span>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-2" role="group" aria-label="Choose game mode">
          {([
            { value: "words", label: "Quick words", detail: "One word at a time" },
            { value: "sentences", label: "Sentences", detail: "Finish full sentences" },
          ] as const).map((option) => {
            const selected = mode === option.value;
            return (
              <motion.button
                key={option.value}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => onModeChange(option.value)}
                aria-pressed={selected}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                  selected
                    ? "border-accent/60 bg-accent/[0.07]"
                    : "border-line bg-surface hover:border-[#3a4249] hover:bg-raised"
                }`}
              >
                <span className={`block text-sm font-semibold ${selected ? "text-accent" : "text-[#e6e9eb]"}`}>
                  {option.label}
                </span>
                <span className="mt-1 block text-[11px] text-muted">{option.detail}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#c2c8cd]">Difficulty</p>
        <DifficultySelector value={difficulty} onChange={onDifficultyChange} />
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-[#14180c] transition-colors hover:bg-[#d4fa81] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Start typing
        </motion.button>
        <p className="mt-4 text-center text-xs text-muted">
          {mode === "words" ? (
            <>Type each word, then press <kbd className="rounded border border-line bg-[#0d1012] px-1.5 py-0.5 font-mono text-[10px] text-[#aab1b7]">space</kbd> to continue</>
          ) : (
            <>Type the full sentence, then press <kbd className="rounded border border-line bg-[#0d1012] px-1.5 py-0.5 font-mono text-[10px] text-[#aab1b7]">enter</kbd></>
          )}
        </p>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#707980]">
        <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
        No sign-up. Just you and the keyboard.
      </div>
    </motion.section>
  );
}
