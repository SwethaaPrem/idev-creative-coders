import React, { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PREMIUM_EASE } from "../lib/motion";

export type HeadingSize = "hero" | "page" | "section" | "card";

/**
 * hero / section: heavy, condensed, uppercase display type.
 * page / card:    heavy but sentence-case, so longer statements stay readable.
 */
const sizeClasses: Record<HeadingSize, string> = {
  hero: "display uppercase text-[clamp(2.7rem,14.5vw,5.75rem)] lg:text-[clamp(3rem,min(6.4vw,11svh),5.75rem)]",
  page: "font-extrabold [font-stretch:92%] text-[clamp(2.75rem,calc(6.4vw+0.4rem),6.25rem)] leading-[0.98] tracking-[-0.03em]",
  section: "display uppercase text-[clamp(2.4rem,6.6vw,6.75rem)]",
  card: "font-extrabold [font-stretch:92%] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.02] tracking-[-0.025em]",
};

/**
 * One masked line. The static mask is observed (not the translated child, which
 * the mask would clip to zero visible area) and the child slides up once seen.
 */
const MaskedLine: React.FC<{ children: ReactNode; delay: number }> = ({ children, delay }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -6% 0px" });

  return (
    <span ref={ref} className="block overflow-hidden pt-[0.1em] pb-[0.18em] -mt-[0.1em] -mb-[0.18em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={{ y: inView ? "0%" : "112%" }}
        transition={{ duration: 1.1, delay, ease: PREMIUM_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
};

interface EditorialHeadingProps {
  /** One entry per visual line; each line is revealed through its own mask. */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  size?: HeadingSize;
  delay?: number;
  className?: string;
}

/**
 * Oversized display heading. Lines slide up out of a mask, staggered.
 * The text itself is passed in by the caller, so copy is never altered here.
 */
export const EditorialHeading: React.FC<EditorialHeadingProps> = ({
  lines,
  as: Tag = "h2",
  size = "section",
  delay = 0,
  className = "",
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <Tag className={`${sizeClasses[size]} text-text-primary ${className}`}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {reduceMotion ? (
            <span className="block">{line}</span>
          ) : (
            <MaskedLine delay={delay + index * 0.09}>{line}</MaskedLine>
          )}
          {index < lines.length - 1 && " "}
        </React.Fragment>
      ))}
    </Tag>
  );
};
