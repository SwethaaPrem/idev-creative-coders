import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

/** Completed / Ongoing pill. Colours come from the surrounding project environment. */
export const StatusBadge: React.FC<{ status: Project["status"] }> = ({ status }) => {
  const ongoing = status === "Ongoing";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-3 py-1.5 font-mono text-[10px] font-bold leading-none uppercase tracking-[0.06em] text-text-primary">
      <span
        className={`h-1.5 w-1.5 rounded-full bg-[var(--p-label)] ${ongoing ? "animate-pulse" : ""}`}
      />
      {status}
    </span>
  );
};

export const TechChips: React.FC<{ technologies: string[]; className?: string }> = ({
  technologies,
  className = "",
}) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`}>
    {technologies.map((tech) => (
      <li
        key={tech}
        className="rounded-full border border-border-subtle px-3 py-1.5 font-mono text-[10px] leading-none text-text-secondary"
      >
        {tech}
      </li>
    ))}
  </ul>
);

export const ProjectMetrics: React.FC<{
  metrics: NonNullable<Project["metrics"]>;
  large?: boolean;
  className?: string;
}> = ({ metrics, large = false, className = "" }) => (
  <dl className={`flex flex-wrap gap-x-8 gap-y-5 ${className}`}>
    {metrics.map((metric) => (
      <div key={metric.label} className="flex flex-col-reverse gap-1.5">
        <dt className="font-mono text-[10px] leading-snug uppercase tracking-[0.04em] text-text-secondary">
          {metric.label}
        </dt>
        <dd
          className={`font-display font-extrabold [font-stretch:92%] whitespace-nowrap text-text-primary ${
            large ? "text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.03em]" : "text-xl tracking-[-0.015em] sm:text-2xl"
          }`}
        >
          {metric.value}
        </dd>
      </div>
    ))}
  </dl>
);

/** Primary project call-to-action, coloured by the project's signature colour. */
export const ViewCaseStudyLink: React.FC<{ id: string; className?: string }> = ({ id, className = "" }) => (
  <Link
    to={`/work/${id}`}
    className={`group/cta inline-flex items-center gap-4 whitespace-nowrap rounded-full border border-[var(--accent-edge)] bg-[var(--p-sig)] py-1.5 pl-6 pr-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--p-sig-ink)] transition-colors duration-500 hover:bg-text-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
  >
    View Case Study
    <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[var(--p-sig-ink)] text-[var(--p-sig)] transition-colors duration-500 group-hover/cta:bg-background group-hover/cta:text-text-primary">
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover/scene:translate-x-0.5 group-hover/scene:-translate-y-0.5" />
    </span>
  </Link>
);
