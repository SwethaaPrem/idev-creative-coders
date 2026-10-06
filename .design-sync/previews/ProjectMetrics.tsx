import { ProjectMetrics, projects } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** Card-scale figures, as inside a project info card. */
export const CardScale = () => (
  <Stage>
    <ProjectMetrics metrics={projects[2].metrics!} />
  </Stage>
);

/** Hero-scale figures, as on a project page. */
export const Large = () => (
  <Stage>
    <ProjectMetrics metrics={projects[0].metrics!} large />
  </Stage>
);
