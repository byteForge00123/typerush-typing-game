import type { Difficulty } from "@/lib/types";

const wordsByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    "bright", "calm", "dream", "fresh", "glide", "happy", "light", "magic",
    "ocean", "peace", "quick", "quiet", "smile", "solid", "spark", "sweet",
    "today", "trust", "vivid", "wonder", "yellow", "brave", "cloud", "dance",
    "eager", "field", "grace", "heart", "lemon", "music", "night", "plant",
  ],
  medium: [
    "balance", "browser", "capture", "console", "creative", "display", "explore",
    "feature", "focused", "harmony", "imagine", "journey", "keyboard", "library",
    "minimal", "natural", "organic", "patient", "quality", "rhythm", "silence",
    "texture", "uniform", "version", "whenever", "abstract", "building", "careful",
    "daylight", "electric", "flexible", "grateful", "headline", "internet",
  ],
  hard: [
    "architecture", "accessibility", "collaboration", "configuration",
    "concentration", "development", "environment", "functionality",
    "implementation", "infrastructure", "intelligence", "microinteraction",
    "optimization", "performance", "productivity", "responsiveness",
    "sophisticated", "synchronization", "thoughtfulness", "transformation",
    "unpredictable", "visualization", "workflow", "acknowledgment",
    "communication", "compatibility", "craftsmanship", "determination",
  ],
};

export function createWordQueue(difficulty: Difficulty, count = 100): string[] {
  const source = wordsByDifficulty[difficulty];
  const queue: string[] = [];

  while (queue.length < count) {
    const shuffled = [...source];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    queue.push(...shuffled);
  }

  return queue.slice(0, count);
}

const sentencesByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    "A calm mind can do amazing things.",
    "Small steps make a big difference.",
    "Take a breath and find your rhythm.",
    "Today is a good day to begin.",
    "Keep going and trust your pace.",
    "A little practice goes a long way.",
    "Make room for a brighter idea.",
    "Good things grow with time.",
  ],
  medium: [
    "A thoughtful idea can change the way we see the world.",
    "Great work comes from patience, practice, and a little curiosity.",
    "The best way to build confidence is to keep showing up.",
    "Every new skill begins with one small moment of focus.",
    "Creative people make useful things feel surprisingly simple.",
    "A clear mind makes space for better ideas to take shape.",
    "Progress is easier to notice when you pause and look back.",
    "The right rhythm can make a difficult task feel natural.",
  ],
  hard: [
    "Thoughtful collaboration turns ambitious ideas into meaningful progress.",
    "A well-designed experience makes complicated things feel effortless.",
    "Curiosity and consistency are powerful ingredients for creative work.",
    "Good communication helps a team transform uncertainty into direction.",
    "Small improvements compound into something remarkable over time.",
    "Careful attention to detail makes a lasting difference in every project.",
    "A flexible perspective can reveal opportunities hidden in a challenge.",
    "The strongest solutions balance clarity, craft, and functionality.",
  ],
};

export function createSentenceQueue(difficulty: Difficulty, count = 30): string[] {
  const source = sentencesByDifficulty[difficulty];
  const queue: string[] = [];

  while (queue.length < count) {
    const shuffled = [...source];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    queue.push(...shuffled);
  }

  return queue.slice(0, count);
}
