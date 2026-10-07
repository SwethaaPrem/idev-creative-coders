import React from "react";
import { ScrollReveal } from "./ScrollReveal";
import { StatTile } from "./StatTile";

const stats: { label: string; value: string; tone: "neutral" | "lime" }[] = [
  { label: "Projects & Experiments", value: "25+", tone: "neutral" },
  { label: "Core Technologies", value: "10+", tone: "neutral" },
  { label: "Commitment", value: "100%", tone: "lime" },
];

/** The three headline numbers. The middle tile drops, the last one is colour-blocked; each reacts to hover. */
export const StatsStrip: React.FC<{ className?: string }> = ({ className = "mt-24 lg:mt-36" }) => (
  <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 ${className}`}>
    {stats.map((stat, index) => (
      <ScrollReveal key={stat.label} direction="up" delay={0.1 * index} className={index === 1 ? "md:translate-y-12" : ""}>
        <StatTile label={stat.label} value={stat.value} tone={stat.tone} />
      </ScrollReveal>
    ))}
  </div>
);
