"use client";

import { motion } from "framer-motion";
import type { Difficulty } from "@/lib/types";

const options: { value: Difficulty; label: string; detail: string }[] = [
  { value: "easy", label: "Easy", detail: "Short & sweet" },
  { value: "medium", label: "Medium", detail: "A steady pace" },
  { value: "hard", label: "Hard", detail: "Longer words" },
];

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Choose difficulty">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={`rounded-xl border px-3 py-3 text-left transition-colors sm:px-4 ${
              selected
                ? "border-accent/60 bg-accent/[0.07]"
                : "border-line bg-surface hover:border-[#3a4249] hover:bg-raised"
            }`}
          >
            <span className={`block text-sm font-semibold ${selected ? "text-accent" : "text-[#e6e9eb]"}`}>
              {option.label}
            </span>
            <span className="mt-1 block text-[11px] text-muted sm:text-xs">{option.detail}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
