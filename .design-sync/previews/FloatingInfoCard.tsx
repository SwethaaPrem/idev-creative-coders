import { FloatingInfoCard, ImageFrame, ProjectPreview, projects } from "idev-creative-coders";
import { Stage } from "../preview-kit";

const project = projects[0];

/** The vertical card, standalone. */
export const Card = () => (
  <Stage width={560}>
    <FloatingInfoCard project={project} drift={false} />
  </Stage>
);

/** In context: the card overlapping the corner of its project visual, as on the Work page. */
export const OverlappingVisual = () => (
  <Stage>
    <div style={{ position: "relative", paddingBottom: 56 }}>
      <ImageFrame className="aspect-[4/3] sm:aspect-[16/10]" parallax={false}>
        <ProjectPreview id={project.id} />
      </ImageFrame>
      <div style={{ position: "absolute", right: 0, bottom: 0, width: "62%" }}>
        <FloatingInfoCard project={projects[2]} drift={false} />
      </div>
    </div>
  </Stage>
);

/** The wide bar variant, pinned across the bottom of a full-width visual. */
export const Bar = () => (
  <Stage>
    <FloatingInfoCard project={projects[1]} variant="bar" />
  </Stage>
);
