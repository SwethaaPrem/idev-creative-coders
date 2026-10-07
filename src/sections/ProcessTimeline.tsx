import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader, TwoLayer } from "../components/Section";

interface ProcessTimelineProps {
  /** `full` is the staggered card grid; `compact` is the at-a-glance version used on the home page. */
  variant?: "full" | "compact";
  eyebrow?: string;
}

/** `plain` is the human explanation; `desc` is the original technical wording. */
const steps = [
  {
    num: "01",
    title: "DISCOVER",
    plain: "We listen first, so we know what you actually need.",
    desc: "Understand the problem and define real business requirements.",
  },
  {
    num: "02",
    title: "ARCHITECT",
    plain: "We plan how everything fits together before building.",
    desc: "Design the software, APIs, database, and cloud infrastructure structures.",
  },
  {
    num: "03",
    title: "DEVELOP",
    plain: "We build it, piece by piece, with clean and tidy code.",
    desc: "Build the application code with modular React/Next.js/TypeScript layouts.",
  },
  {
    num: "04",
    title: "SECURE",
    plain: "We lock it down so your data and your users stay safe.",
    desc: "Protect the application layer, authentication gates, and host containers.",
  },
  {
    num: "05",
    title: "DEPLOY",
    plain: "We put it online and make sure updates go out smoothly.",
    desc: "Move the system into AWS containers via automated CI/CD pipelines.",
  },
  {
    num: "06",
    title: "IMPROVE",
    plain: "We keep it healthy, fast and growing after launch.",
    desc: "Maintain, optimize core metrics, and evolve system functionalities.",
  },
];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ variant = "full", eyebrow = "03 // HOW WE BUILD" }) => {
  const compact = variant === "compact";

  return (
    <Section id="process" tight={compact} className="select-none">
      <SectionHeader
        eyebrow={eyebrow}
        className={compact ? "mb-10 sm:mb-14" : undefined}
        lines={["Our Process."]}
        description={
          <TwoLayer
            plain="A clear, step-by-step way of working, so you always know what is happening and what comes next."
            detail="We translate abstract concepts into production-grade systems using a clear, highly collaborative methodology."
          />
        }
        action={
          compact ? (
            <Link
              to="/process"
              className="group inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-primary transition-colors duration-500 hover:text-accent"
            >
              The Full Process
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] transition-all duration-500 group-hover:border-[var(--accent-edge)] group-hover:bg-accent-fill group-hover:text-on-accent">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ) : undefined
        }
      />

      {/* Full: staggered tiles, the middle column sits lower. Compact: the same tiles, shorter and level. */}
      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${compact ? "" : "lg:pb-14"}`}>
        {steps.map((step, idx) => (
          <ScrollReveal
            key={step.num}
            direction="up"
            delay={0.08 * (idx % 3)}
            className={!compact && idx % 3 === 1 ? "lg:translate-y-14" : ""}
          >
            <div
              className={`group flex flex-col justify-between rounded-[2rem] border border-[var(--line-strong)] text-left transition-colors duration-500 hover:border-[var(--accent-edge)] hover:bg-accent-fill hover:text-on-accent sm:rounded-[2.5rem] ${
                compact ? "min-h-[230px] gap-8 p-7 sm:p-8" : "min-h-[320px] p-8 sm:p-10"
              }`}
            >
              <span
                className={`ghost-numeral transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--on-accent)] ${
                  compact ? "text-[clamp(3.5rem,6vw,5rem)]" : "text-[clamp(5rem,9vw,8rem)]"
                }`}
              >
                {step.num}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-3xl font-extrabold uppercase tracking-[-0.015em] text-text-primary transition-colors duration-500 [font-stretch:88%] group-hover:text-on-accent">
                  {step.title}
                </h3>
                <p className="max-w-xs text-base font-medium leading-snug text-text-primary transition-colors duration-500 group-hover:text-on-accent">
                  {step.plain}
                </p>
                {!compact && (
                  <p className="max-w-xs text-sm leading-relaxed text-text-secondary transition-colors duration-500 group-hover:text-on-accent">
                    {step.desc}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
};
