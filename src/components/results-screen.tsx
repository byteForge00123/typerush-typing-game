"use client";

import { motion } from "framer-motion";
import type { GameMode, GameResults } from "@/lib/types";

interface ResultsScreenProps {
  results: GameResults;
  onTryAgain: () => void;
  onBackToDashboard: () => void;
  mode: GameMode;
}

export default function ResultsScreen({
  results,
  onTryAgain,
  onBackToDashboard,
  mode,
}: ResultsScreenProps) {
  const itemLabel = mode === "sentences" ? "Sentences" : "Words";

  return (
    <motion.section
      key="results"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="mx-auto w-full max-w-xl"
    >
      <div className="mb-7 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Time well spent</p>
        <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[#f2f4f5] sm:text-4xl">That&apos;s a wrap.</h1>
        <p className="mt-2 text-sm text-[#929aa1]">Here&apos;s how your fingers did.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="border-b border-line px-5 py-6 text-center sm:py-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">Your score</p>
          <div className="mt-2 font-mono text-5xl font-semibold tracking-[-0.06em] text-accent sm:text-6xl">
            {results.score.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-[#737c83]">points</p>
        </div>

        <div className="grid grid-cols-2">
          <ResultStat label="Words per minute" value={results.wpm} suffix="WPM" />
          <ResultStat label="Accuracy" value={results.accuracy} suffix="%" />
          <ResultStat label={`${itemLabel} typed`} value={results.itemsTyped} />
          <ResultStat label={`Correct ${itemLabel.toLowerCase()}`} value={results.correctItems} />
        </div>
        <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
          <span className="text-xs text-[#879098]">Incorrect {itemLabel.toLowerCase()}</span>
          <span className="font-mono text-sm tabular-nums text-[#d7dcdf]">{results.incorrectItems}</span>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onTryAgain}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985 }}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-[#14180c] transition-colors hover:bg-[#d4fa81] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Try again
      </motion.button>
      <motion.button
        type="button"
        onClick={onBackToDashboard}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985 }}
        className="mt-3 flex w-full items-center justify-center rounded-xl border border-line bg-surface px-5 py-3.5 text-sm font-semibold text-[#dce1e4] transition-colors hover:border-[#3a4249] hover:bg-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Back to dashboard
      </motion.button>
    </motion.section>
  );
}

function ResultStat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="border-b border-r border-line px-5 py-4 last:border-r-0 even:border-r-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted sm:text-[11px]">{label}</p>
      <p className="mt-2 font-mono text-2xl tabular-nums text-[#e9ecee]">
        {value}<span className="ml-1.5 text-xs text-[#7b848b]">{suffix}</span>
      </p>
    </div>
  );
}
