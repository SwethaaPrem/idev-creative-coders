import React from "react";

interface MarqueeProps {
  items: string[];
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, speed = "medium", className = "" }) => {
  const duration = { slow: "60s", medium: "40s", fast: "20s" }[speed];

  // Duplicate the items so the strip always fills (and loops across) wide screens
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`marquee-container relative w-full overflow-hidden border-y border-[var(--line-strong)] py-5 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] ${className}`}
    >
      <div className="animate-marquee-scroll flex items-center gap-10" style={{ animationDuration: duration }}>
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-10 whitespace-nowrap font-display text-[clamp(2.25rem,5.5vw,5rem)] font-extrabold uppercase leading-none tracking-[-0.015em] [font-stretch:88%]"
          >
            {/* Every other word is outlined, for a loud/quiet rhythm */}
            <span className={idx % 2 === 0 ? "text-text-primary" : "outline-text text-text-primary"}>{item}</span>
            <span className="star h-[0.5em] w-[0.5em] text-accent" />
          </div>
        ))}
      </div>
    </div>
  );
};
