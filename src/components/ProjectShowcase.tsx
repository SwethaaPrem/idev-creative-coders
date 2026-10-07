import React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { envClass, pad, splitTitle } from "../lib/projectEnv";
import { EditorialHeading } from "./EditorialHeading";
import { FloatingInfoCard } from "./FloatingInfoCard";
import { ImageFrame } from "./ImageFrame";
import { ProjectMetrics, StatusBadge, TechChips, ViewCaseStudyLink } from "./ProjectMeta";
import { ProjectPreview } from "./ProjectPreview";
import { ScrollReveal } from "./ScrollReveal";

export type ShowcaseLayout = "hero" | "left70" | "right45" | "cinema" | "bleed";

/** Default order, so neighbouring scenes never share a composition. */
const showcaseLayouts: ShowcaseLayout[] = ["hero", "left70", "right45", "cinema", "bleed"];

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  titleAs?: "h2" | "h3";
  layout?: ShowcaseLayout;
}

/** 01 / 07 ——— CATEGORY  [STATUS] */
export const SceneMeta: React.FC<{ project: Project; className?: string }> = ({ project, className = "" }) => (
  <ScrollReveal direction="none" className={className}>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <span className="font-mono text-base font-bold tracking-[0.04em] text-text-primary">
        {project.number}
        <span className="text-[var(--p-label)]"> / </span>
        {pad(projects.length)}
      </span>
      <span className="hidden h-px min-w-8 flex-1 bg-[var(--line-strong)] sm:block" />
      <span className="eyebrow leading-snug">{project.category}</span>
      <StatusBadge status={project.status} />
    </div>
  </ScrollReveal>
);

/** The project poster, linked to its case study. */
const ProjectVisual: React.FC<{
  project: Project;
  className?: string;
  radius?: string;
  anchor?: "left" | "center" | "right";
  valign?: "center" | "end";
  ghost?: boolean;
  previewClassName?: string;
}> = ({ project, className = "", radius, anchor, valign, ghost, previewClassName }) => (
  <ScrollReveal distance={60} duration={1.2} className="relative">
    <div data-cursor="view" className="group/visual relative">
      <ImageFrame className={className} radius={radius}>
        <ProjectPreview id={project.id} anchor={anchor} valign={valign} ghost={ghost} className={previewClassName} />
      </ImageFrame>
      <Link
        to={`/work/${project.id}`}
        aria-label={project.title}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      />
    </div>
  </ScrollReveal>
);

const SceneTitle: React.FC<{
  project: Project;
  as: "h2" | "h3";
  max: number;
  /** `section` is uppercase and condensed; `card` is the quieter sentence-case size. */
  size?: "section" | "card";
  className?: string;
}> = ({ project, as, max, size = "section", className = "" }) => (
  <EditorialHeading as={as} size={size} lines={splitTitle(project.title, max)} className={className} />
);

/** Typographic info block used where there is no floating panel. */
const InfoBlock: React.FC<{ project: Project; className?: string; children?: ReactNode }> = ({
  project,
  className = "",
  children,
}) => (
  <ScrollReveal delay={0.1} className={`flex flex-col gap-8 ${className}`}>
    <div className="flex max-w-md flex-col gap-2">
      <p className="text-base font-medium leading-snug text-text-primary">{project.plain}</p>
      <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>
    </div>
    <TechChips technologies={project.technologies} />
    {project.metrics && (
      <ProjectMetrics metrics={project.metrics} className="max-w-md border-t border-border-subtle pt-6" />
    )}
    {children}
    <ViewCaseStudyLink id={project.id} className="self-start" />
  </ScrollReveal>
);

/**
 * One portfolio "scene" per project. Every scene is built from the same project
 * data; only the composition (and the project's colour environment) changes.
 */
export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  project,
  index,
  titleAs = "h3",
  layout = showcaseLayouts[index % showcaseLayouts.length],
}) => {
  const articleProps = {
    id: `project-${project.id}`,
    className: `${envClass(project.id)} group/scene relative scroll-mt-28`,
  };

  /* 01 — hero: full-width poster, title set INTO the poster, panel bleeding off its corner */
  if (layout === "hero") {
    return (
      <article {...articleProps}>
        <SceneMeta project={project} className="mb-6 sm:mb-8" />
        <div className="relative lg:mb-24">
          <div className="mb-6 lg:pointer-events-none lg:absolute lg:left-12 lg:top-12 lg:z-20 lg:mb-0 lg:w-[54%]">
            <SceneTitle
              project={project}
              as={titleAs}
              max={14}
              className="lg:!text-[var(--p-fg)]"
            />
          </div>
          <ProjectVisual
            project={project}
            anchor="left"
            valign="end"
            ghost={false}
            className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[min(84svh,780px)]"
          />
          <div className="relative z-20 mx-3 -mt-14 sm:mx-6 lg:absolute lg:bottom-0 lg:right-10 lg:mx-0 lg:mt-0 lg:w-[min(31rem,40%)] lg:translate-y-20">
            <FloatingInfoCard project={project} titleAs={titleAs} showTitle={false} />
          </div>
        </div>
      </article>
    );
  }

  /* 02 — 70% poster on the left, panel overlapping its right edge and dropped low */
  if (layout === "left70") {
    return (
      <article {...articleProps}>
        <SceneMeta project={project} className="mb-6 sm:mb-8" />
        <div className="mb-8 max-w-4xl sm:mb-12">
          <SceneTitle project={project} as={titleAs} max={16} />
        </div>
        <div className="grid grid-cols-12 items-end lg:mb-28">
          <div className="col-span-12 row-start-1 lg:col-span-8 lg:col-start-1">
            <ProjectVisual
              project={project}
              className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[640px]"
            />
          </div>
          <div className="relative z-20 col-span-12 row-start-2 mx-3 -mt-14 sm:mx-6 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0 lg:mt-0 lg:translate-y-28">
            <FloatingInfoCard project={project} titleAs={titleAs} showTitle={false} />
          </div>
        </div>
      </article>
    );
  }

  /* 03 — narrow (45%) portrait poster on the right, typographic block on the left */
  if (layout === "right45") {
    return (
      <article {...articleProps}>
        <SceneMeta project={project} className="mb-6 sm:mb-10" />
        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 flex flex-col justify-between gap-10 lg:col-span-6 lg:pr-10 lg:pb-6">
            <SceneTitle project={project} as={titleAs} max={13} />
            <InfoBlock project={project} />
          </div>
          <div className="relative col-span-12 lg:col-span-6 lg:col-start-7">
            <ProjectVisual
              project={project}
              valign="end"
              className="aspect-[4/5] lg:aspect-auto lg:h-[760px]"
              radius="rounded-[1.75rem] sm:rounded-[2.5rem] lg:rounded-b-[2.5rem] lg:rounded-t-[7rem]"
            />
          </div>
        </div>
      </article>
    );
  }

  /* 04 — cinematic full-width poster with a wide information bar */
  if (layout === "cinema") {
    return (
      <article {...articleProps}>
        <SceneMeta project={project} className="mb-6 sm:mb-8" />
        <div className="relative lg:mb-20">
          <ProjectVisual
            project={project}
            anchor="right"
            className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[min(72svh,680px)]"
            previewClassName="pb-24 lg:pb-[14rem]"
          />
          <div className="relative z-20 mx-3 -mt-14 sm:mx-6 lg:absolute lg:inset-x-8 lg:bottom-0 lg:mx-0 lg:mt-0 lg:translate-y-16">
            <FloatingInfoCard project={project} variant="bar" titleAs={titleAs} />
          </div>
        </div>
      </article>
    );
  }

  /* 05 — poster bleeds off the right edge of the viewport */
  return (
    <article {...articleProps}>
      <div className="grid grid-cols-12 items-center gap-y-12">
        <div className="col-span-12 flex flex-col gap-8 text-left lg:col-span-5 lg:pr-12">
          <SceneMeta project={project} />
          <SceneTitle project={project} as={titleAs} max={14} />
          <InfoBlock project={project} />
        </div>
        <div className="col-span-12 lg:col-span-7 lg:-mr-[calc((100vw-min(100vw,1400px))/2+3rem)]">
          <ProjectVisual
            project={project}
            anchor="left"
            className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[700px]"
            radius="rounded-[1.75rem] sm:rounded-[2.5rem] lg:rounded-r-none"
          />
        </div>
      </div>
    </article>
  );
};

/** Two smaller projects set side by side, the second dropped for an offset rhythm. */
export const ProjectPair: React.FC<{ items: [Project, Project]; titleAs?: "h2" | "h3" }> = ({
  items,
  titleAs = "h3",
}) => (
  <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2 lg:gap-x-10">
    {items.map((project, i) => (
      <article
        key={project.id}
        id={`project-${project.id}`}
        className={`${envClass(project.id)} group/scene relative scroll-mt-28 ${i === 1 ? "lg:mt-44" : ""}`}
      >
        <SceneMeta project={project} className="mb-6 sm:mb-8" />
        <ProjectVisual
          project={project}
          anchor="center"
          className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
          previewClassName="pb-16 lg:pb-[7rem]"
        />
        <div className="relative z-20 mx-3 -mt-12 sm:mx-6 lg:mx-5">
          <FloatingInfoCard project={project} variant="compact" titleAs={titleAs} />
        </div>
      </article>
    ))}
  </div>
);
