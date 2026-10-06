import React from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader } from "../components/Section";

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "Understand the problem and define real business requirements.",
    },
    {
      num: "02",
      title: "ARCHITECT",
      desc: "Design the software, APIs, database, and cloud infrastructure structures.",
    },
    {
      num: "03",
      title: "DEVELOP",
      desc: "Build the application code with modular React/Next.js/TypeScript layouts.",
    },
    {
      num: "04",
      title: "SECURE",
      desc: "Protect the application layer, authentication gates, and host containers.",
    },
    {
      num: "05",
      title: "DEPLOY",
      desc: "Move the system into AWS containers via automated CI/CD pipelines.",
    },
    {
      num: "06",
      title: "IMPROVE",
      desc: "Maintain, optimize core metrics, and evolve system functionalities.",
    },
  ];

  return (
    <Section id="process" className="select-none">
      <SectionHeader
        eyebrow="03 // HOW WE BUILD"
        lines={["Our Process."]}
        description="We translate abstract concepts into production-grade systems using a clear, highly collaborative methodology."
      />

      {/* Staggered tiles: the middle column sits lower for an off-grid rhythm */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:pb-14">
        {steps.map((step, idx) => (
          <ScrollReveal
            key={step.num}
            direction="up"
            delay={0.08 * (idx % 3)}
            className={idx % 3 === 1 ? "lg:translate-y-14" : ""}
          >
            <div className="group flex min-h-[320px] flex-col justify-between rounded-[2rem] border border-[var(--line-strong)] p-8 text-left transition-colors duration-500 hover:border-[var(--accent-edge)] hover:bg-accent-fill hover:text-on-accent sm:rounded-[2.5rem] sm:p-10">
              <span className="ghost-numeral text-[clamp(5rem,9vw,8rem)] transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--on-accent)]">
                {step.num}
              </span>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-3xl font-extrabold uppercase tracking-[-0.015em] text-text-primary transition-colors duration-500 [font-stretch:88%] group-hover:text-on-accent">
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-text-secondary transition-colors duration-500 group-hover:text-on-accent">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
};
