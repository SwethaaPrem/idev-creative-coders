import { SectionHeader } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** Heading left, supporting copy right. */
export const WithDescription = () => (
  <Stage>
    <SectionHeader
      eyebrow="02 // WHAT WE BUILD"
      lines={["WHAT WE BUILD."]}
      description="From business requirements to production-ready systems. We design, build, and deploy custom technology solutions."
      className=""
    />
  </Stage>
);

/** With a trailing action link under the description. */
export const WithAction = () => (
  <Stage>
    <SectionHeader
      eyebrow="07 // PORTFOLIO"
      lines={["Selected Work."]}
      description="A selection of digital products, applications, and experiments built by IDEV Creative Coders."
      action={
        <a href="/work" style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          All Projects ↗
        </a>
      }
      className=""
    />
  </Stage>
);
