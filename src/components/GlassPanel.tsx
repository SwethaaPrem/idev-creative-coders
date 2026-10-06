import React from "react";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  /** `glass` is translucent (floating over imagery); `solid` is an opaque raised card. */
  variant?: "glass" | "solid";
  className?: string;
}

/** Rounded floating surface shared by info cards, stat tiles and callouts. */
export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = "glass",
  className = "",
}) => (
  <div className={`${variant === "glass" ? "glass" : "panel"} rounded-[1.75rem] sm:rounded-[2rem] ${className}`}>
    {children}
  </div>
);
