import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "../components/Button";
import { EditorialHeading } from "../components/EditorialHeading";
import { GlassPanel } from "../components/GlassPanel";
import { ImageFrame } from "../components/ImageFrame";
import { ProjectMetrics, StatusBadge, TechChips } from "../components/ProjectMeta";
import { ProjectPreview } from "../components/ProjectPreview";
import { projects } from "../data/projects";
import { envClass, splitTitle } from "../lib/projectEnv";

/** Numbered label that opens each narrative block. */
const BlockLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="eyebrow mb-6 flex items-center gap-3 border-b border-[var(--line-strong)] pb-4 !text-text-primary">
    <span className="h-2 w-2 shrink-0 bg-[var(--p-label)]" />
    {children}
  </h3>
);

export const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Case Study`;
    }
    window.scrollTo(0, 0);
  }, [project, id]);

  if (!project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl font-extrabold mb-4">Case Study Not Found</h1>
        <p className="text-text-secondary mb-8">The project case you are looking for does not exist or has been relocated.</p>
        <Button to="/work" variant="primary">Back to Work ↗</Button>
      </div>
    );
  }

  // Find next project in array circular loop
  const nextProjectIndex = (projectIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

  return (
    <div className={`${envClass(project.id)} w-full pb-24 text-left select-none`}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12 pt-32 sm:pt-40">

        {/* Back Link */}
        <ScrollReveal direction="down" className="mb-12 sm:mb-16">
          <Link
            to="/work"
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary transition-colors duration-500 hover:border-text-primary hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
            Back to Work
          </Link>
        </ScrollReveal>

        {/* Hero Title */}
        <div className="mb-16 grid grid-cols-1 items-end gap-10 sm:mb-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <ScrollReveal direction="none" className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="eyebrow flex items-center gap-3 !text-[var(--p-label)]">
                <span className="h-2 w-2 bg-[var(--p-label)]" />
                PROJECT {project.number}
              </span>
              <span className="eyebrow">/</span>
              <span className="eyebrow">{project.category}</span>
              <StatusBadge status={project.status} />
            </ScrollReveal>
            <EditorialHeading as="h1" size="section" lines={splitTitle(project.title, 14)} />
          </div>
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.2}>
              <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{project.description}</p>
            </ScrollReveal>
          </div>
        </div>

        {/* Project visual with floating core metrics */}
        <ScrollReveal distance={60} duration={1.2}>
          <ImageFrame className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[620px]">
            <ProjectPreview id={project.id} anchor="right" className={project.metrics ? "lg:pb-28" : ""} />
          </ImageFrame>
        </ScrollReveal>
        {project.metrics && (
          <ScrollReveal delay={0.2} className="relative z-10 mx-3 -mt-12 sm:mx-8 lg:mx-16 lg:-mt-24">
            <GlassPanel className="p-6 sm:p-10">
              <ProjectMetrics metrics={project.metrics} large className="gap-x-12 sm:gap-x-20" />
            </GlassPanel>
          </ScrollReveal>
        )}

        {/* Main Content Sections */}
        <div className="mt-24 grid grid-cols-1 items-start gap-16 sm:mt-32 lg:grid-cols-12">

          {/* Left Column: Brief details */}
          <div className="flex flex-col gap-20 lg:col-span-8">

            {/* Overview */}
            <ScrollReveal direction="up">
              <BlockLabel>01 // Overview</BlockLabel>
              <p className="font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-text-primary">
                {project.content.overview}
              </p>
            </ScrollReveal>

            {/* Problem & Objective */}
            <ScrollReveal direction="up" className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              <div>
                <BlockLabel>02 // The Problem</BlockLabel>
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  {project.content.problem}
                </p>
              </div>
              <div>
                <BlockLabel>03 // Objective</BlockLabel>
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  {project.content.objective}
                </p>
              </div>
            </ScrollReveal>

            {/* Solution & Architecture */}
            <ScrollReveal direction="up">
              <BlockLabel>04 // Engineering Solution</BlockLabel>
              <p className="mb-8 text-sm leading-relaxed text-text-secondary sm:text-base">
                {project.content.solution}
              </p>
              <GlassPanel variant="solid" className="p-6 sm:p-8">
                <span className="eyebrow mb-4 block text-text-primary">Systems Architecture</span>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {project.content.architecture}
                </p>
              </GlassPanel>
            </ScrollReveal>

            {/* Development Process */}
            <ScrollReveal direction="up">
              <BlockLabel>05 // Development Process</BlockLabel>
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                {project.content.process}
              </p>
            </ScrollReveal>

            {/* Results */}
            <ScrollReveal direction="up">
              <BlockLabel>06 // Business Outcome</BlockLabel>
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                {project.content.results}
              </p>
            </ScrollReveal>

          </div>

          {/* Right Column: Sidebar metadata specs */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <GlassPanel variant="solid" className="flex flex-col gap-8 p-8 sm:p-10">
              <div>
                <span className="eyebrow mb-4 block text-text-primary">Technologies</span>
                <TechChips technologies={project.technologies} />
              </div>

              <div className="border-t border-border-subtle pt-8">
                <span className="eyebrow mb-4 block text-text-primary">Key Features</span>
                <ul className="flex flex-col gap-4">
                  {project.content.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                      <span className="font-mono text-xs font-bold text-[var(--p-label)]">0{i+1}.</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border-subtle pt-8">
                <span className="eyebrow mb-3 block text-text-primary">Client Attribution</span>
                <span className="text-xs italic leading-relaxed text-text-secondary">
                  Proprietary architecture code and data systems developed by IDEV Creative Coders. Case statistics verified at pilot test environments.
                </span>
              </div>
            </GlassPanel>
          </div>

        </div>

        {/* Dynamic Next Project Navigation footer links */}
        <div className="mt-28 flex items-center justify-between gap-4 border-t border-[var(--line-strong)] pt-10 sm:mt-40">
          <Link
            to="/work"
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary transition-colors duration-500 hover:border-text-primary hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
            Back to Work
          </Link>
          <Link
            to={`/work/${nextProject.id}`}
            className="group inline-flex items-center gap-4 rounded-full border border-[var(--accent-edge)] bg-[var(--p-sig)] py-1.5 pl-6 pr-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--p-sig-ink)] transition-colors duration-500 hover:bg-text-primary hover:text-background"
          >
            Next Project
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--p-sig-ink)] text-[var(--p-sig)]">
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};
