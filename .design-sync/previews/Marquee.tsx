import { Marquee } from "idev-creative-coders";
import { Stage } from "../preview-kit";

const stack = ["React", "Node.js", "Python", "Java", "AWS", "AI", "Cloud Solutions", "UI / UX Design", "Next.js", "Docker", "Machine Learning", "REST APIs"];

/** The technology strip that runs full-bleed between the hero and the about section. */
export const TechnologyStrip = () => (
  <Stage pad={0}>
    <Marquee items={stack} speed="medium" />
  </Stage>
);

/** A shorter list, slow speed. */
export const ShortList = () => (
  <Stage pad={0}>
    <Marquee items={["Design", "Develop", "Deploy"]} speed="slow" />
  </Stage>
);
