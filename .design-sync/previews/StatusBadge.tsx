import { StatusBadge } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** Both states side by side. */
export const BothStates = () => (
  <Stage>
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <StatusBadge status="Completed" />
      <StatusBadge status="Ongoing" />
    </div>
  </Stage>
);
