import type { ReactNode } from "react";

interface StatItemProps {
  label: string;
  value: ReactNode;
  suffix?: string;
  highlight?: boolean;
}

function StatItem({ label, value, suffix, highlight }: StatItemProps) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[11px]">{label}</p>
      <p className={`mt-1.5 font-mono text-xl font-medium tabular-nums sm:text-2xl ${highlight ? "text-accent" : "text-[#e9ecee]"}`}>
        {value}
        {suffix && <span className="ml-1 text-xs text-muted">{suffix}</span>}
      </p>
    </div>
  );
}

interface GameStatsProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
  wordsTyped: number;
  isPlaying: boolean;
  itemLabel?: string;
}

export default function GameStats({
  timeLeft,
  wpm,
  accuracy,
  wordsTyped,
  isPlaying,
  itemLabel = "Words",
}: GameStatsProps) {
  return (
    <div className="grid grid-cols-4 divide-x divide-line rounded-2xl border border-line bg-surface px-3 py-4 sm:px-6 sm:py-5">
      <div className="px-2 sm:px-4">
        <StatItem label="Time" value={timeLeft} suffix="sec" highlight={timeLeft <= 10 && isPlaying} />
      </div>
      <div className="px-2 sm:px-4">
        <StatItem label="WPM" value={wpm} />
      </div>
      <div className="px-2 sm:px-4">
        <StatItem label="Accuracy" value={accuracy} suffix="%" />
      </div>
      <div className="px-2 sm:px-4">
        <StatItem label={itemLabel} value={wordsTyped} />
      </div>
    </div>
  );
}
