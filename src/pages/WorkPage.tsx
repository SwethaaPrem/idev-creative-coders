import React, { useEffect } from "react";
import { PageHeader, Section } from "../components/Section";
import { ProjectIndex } from "../components/ProjectIndex";
import { ProjectPair, ProjectShowcase } from "../components/ProjectShowcase";
import type { ShowcaseLayout } from "../components/ProjectShowcase";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";

/** The first four scenes each get their own composition. */
const leadLayouts: ShowcaseLayout[] = ["hero", "left70", "right45", "cinema"];

type Scene =
  | { kind: "single"; project: Project; index: number; layout: ShowcaseLayout }
  | { kind: "pair"; items: [Project, Project] };

/** Lead scenes, then the rest set as offset pairs (an odd one out bleeds off the edge). */
const buildScenes = (): Scene[] => {
  const scenes: Scene[] = [];
  projects.slice(0, leadLayouts.length).forEach((project, index) => {
    scenes.push({ kind: "single", project, index, layout: leadLayouts[index] });
  });

  const rest = projects.slice(leadLayouts.length);
  for (let i = 0; i < rest.length; i += 2) {
    const a = rest[i];
    const b = rest[i + 1];
    if (b) {
      scenes.push({ kind: "pair", items: [a, b] });
    } else {
      scenes.push({ kind: "single", project: a, index: leadLayouts.length, layout: "bleed" });
    }
  }
  return scenes;
};

export const WorkPage: React.FC = () => {
  useEffect(() => {
    document.title = "Our Work | IDEV Creative Coders";
    window.scrollTo(0, 0);
  }, []);

  const scenes = buildScenes();

  return (
    <div className="w-full">
      <PageHeader
        eyebrow="OUR PORTFOLIO"
        lines={["Products built", "to perform."]}
        description="Explore our engineering works, AI automation solutions, custom platforms, and digital product designs. Each case study details our strategy, system architecture, and outcomes."
      >
        <ProjectIndex />
      </PageHeader>

      {/* One scene per project, each with its own composition and colour environment */}
      <Section className="pt-24 sm:pt-32">
        <div className="flex flex-col gap-40 sm:gap-52 lg:gap-64">
          {scenes.map((scene) =>
            scene.kind === "pair" ? (
              <ProjectPair key={scene.items[0].id} items={scene.items} titleAs="h2" />
            ) : (
              <ProjectShowcase
                key={scene.project.id}
                project={scene.project}
                index={scene.index}
                layout={scene.layout}
                titleAs="h2"
              />
            ),
          )}
        </div>
      </Section>
    </div>
  );
};
