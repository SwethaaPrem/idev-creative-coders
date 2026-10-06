import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EditorialHeading } from "../components/EditorialHeading";
import { RotatingBadge } from "../components/RotatingBadge";
import { ScrollReveal } from "../components/ScrollReveal";

export const CTASection: React.FC = () => {
  return (
    <section className="select-none px-3 py-10 sm:px-5 sm:py-16">
      {/* A single loud colour block: the page's one big accent moment */}
      <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-brand-lime px-6 [--outline-fill:#d8ff3e] py-24 text-brand-ink sm:rounded-[2.75rem] sm:px-12 sm:py-36 lg:px-20">
        {/* Concentric rings */}
        <div className="pointer-events-none absolute -right-[18%] top-1/2 -z-10 aspect-square w-[70%] -translate-y-1/2 rounded-full border border-brand-ink/20" />
        <div className="pointer-events-none absolute -right-[8%] top-1/2 -z-10 aspect-square w-[50%] -translate-y-1/2 rounded-full border border-brand-ink/20" />
        <div className="pointer-events-none absolute right-[4%] top-1/2 -z-10 aspect-square w-[30%] -translate-y-1/2 rounded-full border border-brand-ink/20" />

        <div className="relative flex flex-col items-start text-left">
          <ScrollReveal direction="none" delay={0.1}>
            <span className="eyebrow mb-8 flex items-center gap-3 !text-brand-ink">
              <span className="h-2 w-2 bg-brand-ink" />
              NEXT STEPS
            </span>
          </ScrollReveal>

          <EditorialHeading
            size="section"
            className="mb-8 !text-brand-ink !text-[clamp(3rem,9.5vw,9.5rem)]"
            lines={[
              "LET'S DEFINE",
              <>
                WHAT'S <span className="outline-text">NEXT</span>.
              </>,
            ]}
          />

          <ScrollReveal direction="up" delay={0.3} className="max-w-xl">
            <p className="mb-12 text-base leading-relaxed text-brand-ink/80 sm:text-lg">
              Have a software requirement, product idea or technical challenge? Let's discuss it.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.06em] text-brand-lime transition-colors duration-500 hover:bg-brand-warm hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
              >
                START A PROJECT <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center rounded-full border border-brand-ink px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.06em] text-brand-ink transition-colors duration-500 hover:bg-brand-ink hover:text-brand-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
              >
                VIEW PROJECTS
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <RotatingBadge
          text="DESIGN × CODE × IDEAS • "
          className="absolute right-6 top-6 h-24 w-24 sm:right-12 sm:top-12 sm:h-32 sm:w-32"
        />
      </div>
    </section>
  );
};
