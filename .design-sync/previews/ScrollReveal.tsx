import { GlassPanel, ScrollReveal } from "idev-creative-coders";
import { Stage } from "../preview-kit";

const Tile = ({ label, value }: { label: string; value: string }) => (
  <GlassPanel variant="solid">
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 28 }}>
      <span className="eyebrow">{label}</span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 56, lineHeight: 1, letterSpacing: "-0.05em" }}>
        {value}
      </span>
    </div>
  </GlassPanel>
);

/** Three stat tiles revealed in sequence: same direction, delay stepping by 0.1s. */
export const StaggeredTiles = () => (
  <Stage>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      <ScrollReveal delay={0}>
        <Tile label="PROJECTS & EXPERIMENTS" value="25+" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Tile label="CORE TECHNOLOGIES" value="10+" />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <Tile label="COMMITMENT" value="100%" />
      </ScrollReveal>
    </div>
  </Stage>
);

/** Slide-in from the side, for a header and its copy. */
export const FromTheSide = () => (
  <Stage>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ScrollReveal direction="right">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 40, letterSpacing: "-0.03em" }}>
          Designing. Developing. Deploying.
        </div>
      </ScrollReveal>
      <ScrollReveal direction="left" delay={0.15}>
        <p style={{ margin: 0, maxWidth: 420, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          We transform ideas into reliable digital products through thoughtful design, clean engineering, and modern technology.
        </p>
      </ScrollReveal>
    </div>
  </Stage>
);
