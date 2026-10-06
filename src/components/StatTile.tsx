import React, { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { PREMIUM_EASE } from "../lib/motion";

interface StatTileProps {
  label: string;
  /** e.g. "25+" or "100%": a number followed by an optional suffix. */
  value: string;
  /** `lime` is the colour-blocked tile; `neutral` is an outlined tile. */
  tone?: "neutral" | "lime";
}

const parseValue = (value: string): { amount: number; suffix: string } | null => {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { amount: parseInt(match[1], 10), suffix: match[2] } : null;
};

/**
 * Stat tile that responds to the pointer: it lifts, floods with colour (the lime
 * tile flips to ink), a soft spotlight follows the cursor, and the number counts
 * up from zero. The real value is always in the DOM, so nothing depends on the
 * animation, and reduced-motion users just get the colour change.
 */
export const StatTile: React.FC<StatTileProps> = ({ label, value, tone = "neutral" }) => {
  const reduceMotion = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(parsed?.amount ?? 0);
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const lime = tone === "lime";

  useEffect(() => () => controls.current?.stop(), []);

  const replayCount = () => {
    if (!parsed || reduceMotion) return;
    controls.current?.stop();
    controls.current = animate(0, parsed.amount, {
      duration: 1,
      ease: PREMIUM_EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setDisplay(parsed.amount),
    });
  };

  const trackPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseEnter={replayCount}
      onMouseMove={trackPointer}
      className={`group relative flex h-full min-h-[240px] cursor-default flex-col justify-between gap-12 overflow-hidden rounded-[2rem] border p-7 text-left transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-2 sm:min-h-[300px] sm:rounded-[2.5rem] sm:p-9 md:p-6 lg:p-9 ${
        lime
          ? "border-transparent bg-brand-lime text-brand-ink hover:border-[var(--line-strong)] hover:bg-brand-ink hover:text-brand-lime"
          : "border-[var(--line-strong)] text-text-primary hover:border-[var(--accent-edge)] hover:bg-accent-fill hover:text-brand-ink"
      }`}
    >
      {/* Spotlight that follows the cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), ${
            lime ? "rgba(216, 255, 62, 0.22)" : "rgba(255, 255, 255, 0.55)"
          }, transparent 70%)`,
        }}
      />

      <span className="relative font-mono text-[17px] font-bold uppercase leading-snug tracking-[0.03em] md:text-lg lg:text-[22px]">
        {label}
      </span>

      <span className="relative">
        {/* The animated figure is decorative; screen readers and text extraction get the real value */}
        <span aria-hidden="true" className="display block text-[clamp(4rem,8vw,7.5rem)] leading-[0.85]">
          {parsed ? `${display}${parsed.suffix}` : value}
        </span>
        <span className="sr-only">{value}</span>
      </span>
    </div>
  );
};
