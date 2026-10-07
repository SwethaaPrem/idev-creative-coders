import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ProjectShowcase } from "../components/ProjectShowcase";
import type { ShowcaseLayout } from "../components/ProjectShowcase";
import { Section, SectionHeader, TwoLayer } from "../components/Section";
import { projects } from "../data/projects";

/** The first three scenes, using the same compositions as the full portfolio. */
const homeLayouts: ShowcaseLayout[] = ["hero", "left70", "right45"];

interface SelectedWorkProps {
  eyebrow?: string;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ eyebrow = "07 // PORTFOLIO" }) => {
  return (
    <Section id="work">
      <SectionHeader
        eyebrow={eyebrow}
        lines={["Selected Work."]}
        description={
          <TwoLayer
            plain="A few of the things we have built, and the problem each one solved."
            detail="A selection of digital products, applications, and experiments built by IDEV Creative Coders."
          />
        }
        action={
          <Link
            to="/work"
            className="group inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-primary transition-colors duration-500 hover:text-accent"
          >
            See All Projects
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] transition-all duration-500 group-hover:border-[var(--accent-edge)] group-hover:bg-accent-fill group-hover:text-on-accent">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        }
      />

      <div className="flex flex-col gap-40 sm:gap-52">
        {projects.slice(0, homeLayouts.length).map((project, index) => (
          <ProjectShowcase key={project.id} project={project} index={index} layout={homeLayouts[index]} />
        ))}
      </div>
    </Section>
  );
};
