// Preview harness helpers (not part of the design system, never shipped as a component).
// The generated card page paints a white body; IDEV is dark-first with light text tokens,
// so every preview puts itself on the design system's own page colour first.
import * as React from "react";

// Cards are captured and browsed as still images, so render the components' settled state:
// answer "prefers-reduced-motion" with a match so ScrollReveal/EditorialHeading/parallax render
// final output instead of mid-animation. Must run before the first component renders.
if (typeof window !== "undefined") {
  const real = window.matchMedia.bind(window);
  window.matchMedia = (query: string) =>
    /prefers-reduced-motion/.test(query)
      ? ({
          matches: true,
          media: query,
          onchange: null,
          addListener() {},
          removeListener() {},
          addEventListener() {},
          removeEventListener() {},
          dispatchEvent: () => false,
        } as MediaQueryList)
      : real(query);
}

if (typeof document !== "undefined") {
  document.documentElement.style.background = "var(--background)";
  document.body.style.background = "var(--background)";
  document.body.style.color = "var(--text-primary)";
  document.body.style.fontFamily = "var(--font-sans)";
}

/** Page-coloured stage with padding; `width` caps the content like a real column would. */
export const Stage: React.FC<{ children: React.ReactNode; width?: number | string; pad?: number }> = ({
  children,
  width,
  pad = 8,
}) => (
  <div style={{ padding: pad, width: width ?? "100%", maxWidth: "100%", boxSizing: "border-box" }}>{children}</div>
);

/** Soft accent atmosphere, for showing translucent panels over something. */
export const Backdrop: React.FC<{ children: React.ReactNode; height?: number; style?: React.CSSProperties }> = ({
  children,
  height = 320,
  style,
}) => (
  <div
    style={{
      position: "relative",
      height,
      borderRadius: 32,
      overflow: "hidden",
      border: "1px solid var(--glass-border)",
      background:
        "radial-gradient(60% 80% at 75% 30%, color-mix(in srgb, var(--accent) 38%, transparent), transparent 70%), radial-gradient(50% 70% at 10% 90%, color-mix(in srgb, var(--accent-secondary) 22%, transparent), transparent 70%), var(--surface-secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);
