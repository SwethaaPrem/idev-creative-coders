import React, { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ImageFrameProps {
  children: ReactNode;
  className?: string;
  /** Rounded-corner override, e.g. to square off one side for a bleeding image. */
  radius?: string;
  /** Scale-down (1.05 → 1) while the frame scrolls into view. */
  parallax?: boolean;
  /** Static layer above the media (text, badges) that does not scale or drift with it. */
  overlay?: ReactNode;
}

/**
 * Large rounded media container. The media layer only ever scales up (never
 * drifts), so no edge is revealed, and it eases in slightly on hover.
 */
export const ImageFrame: React.FC<ImageFrameProps> = ({
  children,
  className = "",
  radius = "rounded-[1.75rem] sm:rounded-[2.5rem]",
  parallax = true,
  overlay,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Settles from 1.05 to 1 as the frame scrolls into view (never reveals an edge)
  const scale = useTransform(scrollYProgress, [0, 0.35], [1.05, 1]);
  const animated = parallax && !reduceMotion;

  return (
    <div
      ref={ref}
      className={`group/frame relative isolate overflow-hidden border border-[var(--panel-border)] bg-surface ${radius} ${className}`}
    >
      <motion.div className="absolute inset-0 will-change-transform" style={animated ? { scale } : undefined}>
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-premium)] group-hover/frame:scale-[1.04] group-hover/visual:scale-[1.04]">
          {children}
        </div>
      </motion.div>
      {overlay && <div className="absolute inset-0 z-[1]">{overlay}</div>}
    </div>
  );
};
