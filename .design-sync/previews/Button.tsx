import { Button } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** Hero actions: one inverse primary call to action beside the outlined alternative. */
export const HeroActions = () => (
  <Stage>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary" to="/contact">
        Start a Project ↗
      </Button>
      <Button variant="secondary">Explore Our Work</Button>
    </div>
  </Stage>
);

/** All three variants side by side. */
export const Variants = () => (
  <Stage>
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="text">Text link</Button>
    </div>
  </Stage>
);

/** Disabled state of the two pill variants. */
export const Disabled = () => (
  <Stage>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary" disabled>
        Send Inquiry
      </Button>
      <Button variant="secondary" disabled>
        Send Inquiry
      </Button>
    </div>
  </Stage>
);
