import React, { useId } from "react";
import { ArrowDown } from "lucide-react";

interface RotatingBadgeProps {
  /** One full revolution of text; spaced evenly around the circle. */
  text: string;
  /** Must position the badge (e.g. `absolute ...`), since the rotating ring is laid out inside it. */
  className?: string;
}

/** A small circular "sticker" with slowly rotating text and a centred arrow. */
export const RotatingBadge: React.FC<RotatingBadgeProps> = ({ text, className = "" }) => {
  const id = `badge-${useId().replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className={`grid place-items-center rounded-full bg-brand-pink text-brand-ink ${className}`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text
          fill="currentColor"
          fontFamily="var(--font-mono)"
          fontSize="9.4"
          fontWeight="700"
          textLength="228"
          lengthAdjust="spacing"
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <ArrowDown className="relative h-[22%] w-[22%]" strokeWidth={2.4} />
    </div>
  );
};
