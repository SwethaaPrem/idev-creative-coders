import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG logo icon: pointy-topped hexagon with code brackets, matching the company logo */}
      <svg
        viewBox="0 0 100 100"
        className="h-10 w-10 flex-shrink-0 text-accent transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" strokeWidth="6" />
        <path d="M 35,38 L 23,50 L 35,62" strokeWidth="5.5" />
        <line x1="45" y1="67" x2="55" y2="33" strokeWidth="6" />
        <path d="M 65,38 L 77,50 L 65,62" strokeWidth="5.5" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col justify-center text-left leading-none">
          {/* Wordmark: "iDev" */}
          <span className="font-display text-[26px] font-extrabold tracking-[-0.03em] text-text-primary">
            <span className="text-accent">i</span>Dev
          </span>
          {/* Subtitle: "CREATIVE CODERS" */}
          <span className="mt-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-text-secondary">
            Creative Coders
          </span>
        </div>
      )}
    </div>
  );
};
