import { EditorialHeading } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** The home headline: hero size, with the closing phrase picked out in the accent colour. */
export const Hero = () => (
  <Stage>
    <EditorialHeading
      as="h1"
      size="hero"
      lines={[
        "We build digital",
        "experiences that",
        <span key="a" className="text-accent">
          move businesses forward.
        </span>,
      ]}
    />
  </Stage>
);

/** Page title size, as used under the floating navigation. */
export const PageTitle = () => (
  <Stage>
    <EditorialHeading as="h1" size="page" lines={["Products built", "to perform."]} />
  </Stage>
);

/** Section title and card title sizes. */
export const SectionAndCard = () => (
  <Stage>
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <EditorialHeading size="section" lines={["Selected Work."]} />
      <EditorialHeading as="h3" size="card" lines={["SS Agencies Billing Platform"]} />
    </div>
  </Stage>
);
