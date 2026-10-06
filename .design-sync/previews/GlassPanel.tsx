import { GlassPanel, Marquee } from "idev-creative-coders";
import { Stage, Backdrop } from "../preview-kit";

const body = (
  <div style={{ padding: 28, maxWidth: 360 }}>
    <div className="eyebrow">STUDIO</div>
    <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" }}>
      A creative technology team turning ambitious ideas into useful digital products.
    </p>
  </div>
);

/** Translucent panel floating over atmosphere, the way it overlaps project visuals. */
export const GlassOverBackdrop = () => (
  <Stage>
    <Backdrop height={300}>
      <GlassPanel variant="glass">{body}</GlassPanel>
    </Backdrop>
  </Stage>
);

/** Opaque raised card for content areas (stat tiles, copy panels). */
export const Solid = () => (
  <Stage>
    <GlassPanel variant="solid">
      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 40, maxWidth: 320 }}>
        <span className="eyebrow">PROJECTS &amp; EXPERIMENTS</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 72, lineHeight: 1, letterSpacing: "-0.05em" }}>
          25+
        </span>
      </div>
    </GlassPanel>
  </Stage>
);

/** Side by side: the two variants on the same page colour. */
export const BothVariants = () => (
  <Stage>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
      <GlassPanel variant="solid">{body}</GlassPanel>
      <GlassPanel variant="glass">{body}</GlassPanel>
    </div>
  </Stage>
);
