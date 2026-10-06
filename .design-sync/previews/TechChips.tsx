import { TechChips, projects } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** A project's full technology list. */
export const Fintech = () => (
  <Stage>
    <TechChips technologies={projects[0].technologies} />
  </Stage>
);

/** A shorter list. */
export const Short = () => (
  <Stage>
    <TechChips technologies={projects[6].technologies} />
  </Stage>
);
