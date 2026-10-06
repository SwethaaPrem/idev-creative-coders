import { GlassPanel, Section, SectionHeader } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** A standard page block: Section supplies gutter, max width and rhythm; SectionHeader opens it. */
export const WithHeaderAndPanels = () => (
  <Stage pad={0}>
    <Section id="why">
      <SectionHeader eyebrow="08 // WHY IDEV CREATIVE CODERS" lines={["WHY IDEV CREATIVE CODERS."]} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {[
          ["BUSINESS-FIRST", "Engineering starts with understanding the actual requirement."],
          ["SECURE", "Security is considered throughout architecture and development."],
        ].map(([title, copy]) => (
          <GlassPanel key={title} variant="solid">
            <div style={{ padding: 28 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 26 }}>{title}</div>
              <p style={{ margin: "12px 0 0", color: "var(--text-secondary)", lineHeight: 1.6, fontSize: 14 }}>{copy}</p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </Section>
  </Stage>
);
