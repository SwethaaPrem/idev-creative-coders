import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Project } from "../data/projects";
import { EditorialHeading } from "./EditorialHeading";
import { ProjectMetrics, TechChips, ViewCaseStudyLink } from "./ProjectMeta";

interface FloatingInfoCardProps {
  project: Project;
  /** `card` stacks vertically; `bar` spreads across a wide strip; `compact` drops the metrics. */
  variant?: "card" | "bar" | "compact";
  titleAs?: "h2" | "h3";
  /** Hide the title when the scene already sets it in oversized type elsewhere. */
  showTitle?: boolean;
  /** Slow vertical drift against the scroll for a sense of depth. */
  drift?: boolean;
  className?: string;
}

/** Project details presented as a panel floating over (or beside) the project visual. */
export const FloatingInfoCard: React.FC<FloatingInfoCardProps> = ({
  project,
  variant = "card",
  titleAs = "h3",
  showTitle = true,
  drift = true,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [26, -26]);

  const title = showTitle ? (
    <EditorialHeading
      as={titleAs}
      size="card"
      lines={[
        <Link key="title" to={`/work/${project.id}`} className="transition-colors duration-500 hover:text-[var(--p-label)]">
          {project.title}
        </Link>,
      ]}
    />
  ) : null;

  const description = <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>;

  return (
    <motion.div
      ref={ref}
      style={drift && !reduceMotion && variant !== "bar" ? { y } : undefined}
      className={`group/panel text-left ${className}`}
    >
      {variant === "bar" ? (
        <div className="glass grid grid-cols-1 gap-8 rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8 lg:grid-cols-2 xl:grid-cols-12 xl:items-end xl:gap-10">
          <div className="flex flex-col gap-4 xl:col-span-5">
            {title}
            {description}
          </div>
          <div className="flex flex-col gap-6 lg:row-span-2 xl:col-span-4 xl:row-span-1">
            <TechChips technologies={project.technologies} />
            {project.metrics && <ProjectMetrics metrics={project.metrics} />}
          </div>
          <div className="xl:col-span-3 xl:flex xl:justify-end">
            <ViewCaseStudyLink id={project.id} />
          </div>
        </div>
      ) : (
        <div className="glass flex flex-col gap-6 rounded-[1.75rem] p-6 transition-transform duration-700 ease-[var(--ease-premium)] sm:rounded-[2rem] sm:p-8 lg:group-hover/panel:-translate-y-1.5 lg:group-hover/scene:-translate-y-1.5">
          {(title || description) && (
            <div className="flex flex-col gap-4">
              {title}
              {description}
            </div>
          )}
          <TechChips technologies={project.technologies} />
          {variant === "card" && project.metrics && (
            <ProjectMetrics metrics={project.metrics} className="border-t border-[var(--panel-border)] pt-6" />
          )}
          <ViewCaseStudyLink id={project.id} className="self-start" />
        </div>
      )}
    </motion.div>
  );
};
