import { ProjectShowcase, projects } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** Index 0: visual on the left, info card overlapping its bottom-right corner. */
export const OverlapRight = () => (
  <Stage>
    <ProjectShowcase project={projects[0]} index={0} />
  </Stage>
);

/** Index 1: full-width visual with the info bar pinned across its bottom. */
export const FullWidthBar = () => (
  <Stage>
    <ProjectShowcase project={projects[1]} index={1} />
  </Stage>
);

/** Index 2: mirrored, visual on the right with the card overlapping on the left. */
export const OverlapLeft = () => (
  <Stage>
    <ProjectShowcase project={projects[2]} index={2} />
  </Stage>
);

/** Index 3: large title and details beside a visual that bleeds off the page edge. */
export const Bleed = () => (
  <Stage>
    <ProjectShowcase project={projects[3]} index={3} />
  </Stage>
);
