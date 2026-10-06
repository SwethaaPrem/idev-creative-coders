import React, { useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader } from "../components/Section";

interface TechNode {
  name: string;
  category: "frontend" | "backend" | "cloud" | "security" | "ai" | "core";
  x: number; // percentage coordinate
  y: number; // percentage coordinate
}

export const TechnologyConstellation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const nodes: TechNode[] = [
    // Core Central
    { name: "IDEV CORE", category: "core", x: 50, y: 50 },

    // Frontend Nodes
    { name: "React / Next.js", category: "frontend", x: 30, y: 35 },
    { name: "TypeScript", category: "frontend", x: 20, y: 40 },
    { name: "Tailwind CSS", category: "frontend", x: 25, y: 25 },

    // Backend / Data Nodes
    { name: "Node.js", category: "backend", x: 65, y: 30 },
    { name: "Java / Spring", category: "backend", x: 75, y: 35 },
    { name: "PostgreSQL", category: "backend", x: 70, y: 20 },
    { name: "Redis Cache", category: "backend", x: 60, y: 15 },

    // Cloud / DevOps Nodes
    { name: "AWS ECS/EKS", category: "cloud", x: 68, y: 65 },
    { name: "Docker", category: "cloud", x: 78, y: 60 },
    { name: "CI / CD Pipelines", category: "cloud", x: 75, y: 75 },

    // Security Nodes
    { name: "OAuth2 / IAM", category: "security", x: 35, y: 68 },
    { name: "API Security", category: "security", x: 25, y: 72 },
    { name: "Secured Boundaries", category: "security", x: 22, y: 60 },

    // AI Nodes
    { name: "Python / PyTorch", category: "ai", x: 48, y: 22 },
    { name: "OpenAI / LLM API", category: "ai", x: 52, y: 12 },
  ];

  // Draw lines from core node to category child nodes
  const categories = [
    { name: "Frontend", id: "frontend", color: "#d8ff3e" },
    { name: "Backend & Data", id: "backend", color: "#7c3aed" },
    { name: "Cloud & Infrastructure", id: "cloud", color: "#55d6ff" },
    { name: "Identity & Security", id: "security", color: "#ff5ccf" },
    { name: "AI Integration", id: "ai", color: "#f4f1ea" },
  ];

  return (
    <Section className="select-none">
      <SectionHeader
        eyebrow="06 // TECHNOLOGY STEERAGE"
        lines={["Technology Constellation."]}
        description="We focus on a highly robust stack built around modern standards. Rather than adopting every trend, we master the tools that power stable systems."
      />

      {/* Constellation Canvas Block */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="panel relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[2rem] p-6 sm:rounded-[2.5rem] md:p-12">
          <div className="stage-grid pointer-events-none absolute inset-0 opacity-60" />

          {/* SVG Connecting lines layers */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
            {nodes.map((node) => {
              if (node.category === "core") return null;
              // Core coordinates is always 50% / 50%
              return (
                <line
                  key={node.name}
                  x1="50%"
                  y1="50%"
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke="var(--accent)"
                  strokeWidth={activeCategory === node.category ? "2" : "1"}
                  strokeDasharray={activeCategory === node.category ? "0" : "3 3"}
                  className="transition-all duration-500"
                  opacity={activeCategory === node.category ? "0.9" : "0.3"}
                />
              );
            })}
          </svg>

          {/* Interactive category toggles (floating desktop HUD) */}
          <div className="absolute left-4 right-4 top-4 z-10 flex max-w-lg flex-wrap justify-start gap-2 md:bottom-4 md:right-auto md:top-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-500 ${
                  activeCategory === cat.id
                    ? "border-accent bg-accent/10 text-text-primary"
                    : "border-border-subtle bg-background text-text-secondary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Nodes Coordinates Plot */}
          <div className="absolute inset-0 z-10 h-full w-full">
            {nodes.map((node) => {
              const isCore = node.category === "core";
              const isMatchingCategory = activeCategory === node.category;

              return (
                <div
                  key={node.name}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 transition-all duration-500 ${
                    isCore ? "scale-110" : ""
                  }`}
                >
                  {/* Node Dot */}
                  <div
                    className={`h-2.5 w-2.5 rounded-full border-2 transition-all duration-500 ${
                      isCore
                        ? "scale-125 border-text-primary bg-accent"
                        : isMatchingCategory
                        ? "scale-110 border-accent bg-accent shadow-[0_0_10px_var(--accent)]"
                        : "border-text-secondary bg-surface group-hover:border-accent"
                    }`}
                  />

                  {/* Node Text label */}
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider transition-all duration-500 ${
                      isCore
                        ? "border border-accent/20 bg-accent/10 uppercase text-accent"
                        : isMatchingCategory
                        ? "border border-accent/30 bg-surface text-text-primary"
                        : "border border-transparent bg-background/60 text-text-secondary group-hover:text-text-primary"
                    }`}
                  >
                    {node.name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </ScrollReveal>
    </Section>
  );
};
