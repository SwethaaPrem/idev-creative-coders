/**
 * Each project gets its own colour environment (see `.env-*` in index.css) so
 * every case feels like its own universe while the site stays cohesive.
 */
export type ProjectEnv =
  | "ink-lime"
  | "grape-pink"
  | "paper-cyan"
  | "pink-ink"
  | "violet-lime"
  | "ink-cyan"
  | "lime-ink";

const envById: Record<string, ProjectEnv> = {
  "ss-agencies": "ink-lime",
  "fintech-startup": "grape-pink",
  "smart-traffic": "paper-cyan",
  "receipt-processing": "pink-ink",
  "internal-developer-platform": "violet-lime",
  "iot-monitoring": "ink-cyan",
  "direct-market-access": "lime-ink",
};

export const envClass = (projectId: string): string => `env-${envById[projectId] ?? "ink-lime"}`;

/** "07" -> used for the "01 / 07" counters. */
export const pad = (n: number): string => String(n).padStart(2, "0");

/** Break a title into short display lines (same words, same order). */
export const splitTitle = (title: string, max: number): string[] => {
  const lines: string[] = [];
  let current = "";
  for (const word of title.split(" ")) {
    if (current && `${current} ${word}`.length > max) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
};
