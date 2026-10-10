import React from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { envClass } from "../lib/projectEnv";
import { ScrollReveal } from "./ScrollReveal";

/** Jump list to every project scene on the page: number, title, arrow. */
export const ProjectIndex: React.FC = () => (
  <ScrollReveal delay={0.2}>
    <nav aria-label="Projects" className="mt-16 border-t border-[var(--line-strong)] sm:mt-24">
      <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {projects.map((project) => (
          <li key={project.id} className={envClass(project.id)}>
            <a
              href={`#project-${project.id}`}
              className="group flex items-center gap-5 border-b border-border-subtle py-4 transition-colors duration-500 hover:text-[var(--p-label)]"
            >
              <span className="flex-1 font-display text-lg font-bold tracking-[-0.02em] sm:text-xl">
                {project.title}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </ScrollReveal>
);
