import React, { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../components/Button";
import { EditorialHeading } from "../components/EditorialHeading";
import { RotatingBadge } from "../components/RotatingBadge";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionLabel } from "../components/Section";
import { ThreeArchitecture } from "../components/ThreeArchitecture";
import { PREMIUM_EASE } from "../lib/motion";

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const blockY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const scrollToIntro = () => {
    const target = document.getElementById("services");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative z-10 flex min-h-[100svh] select-none flex-col pt-24 sm:pt-28">
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 sm:px-8 md:px-12">
        {/* Technical metadata row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:mb-10">
          <ScrollReveal delay={0.2} direction="none">
            <SectionLabel>A CREATIVE TECHNOLOGY TEAM</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="none" className="hidden md:block">
            <span className="eyebrow">DESIGN × CODE × IDEAS</span>
          </ScrollReveal>
          <ScrollReveal delay={0.4} direction="none">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-fill [html.light_&]:outline [html.light_&]:outline-1 [html.light_&]:outline-text-primary" />
              Available for selected projects
            </span>
          </ScrollReveal>
        </div>

        <div className="grid flex-1 grid-cols-12 gap-y-10 lg:gap-x-8">
          {/* Oversized headline + supporting copy */}
          <div className="col-span-12 flex flex-col justify-between gap-10 text-left lg:col-span-7">
            <motion.div style={reduceMotion ? undefined : { y: headlineY }}>
              <EditorialHeading
                as="h1"
                size="hero"
                delay={0.25}
                lines={[
                  // Four wide lines on desktop; they wrap naturally into a stacked poster on phones
                  "We build digital",
                  "experiences that",
                  "move businesses",
                  <span key="forward" className="block text-accent">forward.</span>,
                ]}
              />
            </motion.div>

            <ScrollReveal delay={0.6} distance={40}>
              <div className="flex max-w-xl flex-col gap-7">
                <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
                  IDEV Creative Coders combines design, development, and emerging technology to create websites, applications, and digital products that are built to perform.
                </p>
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <Button variant="primary" to="/contact" className="w-full sm:w-auto">
                    Start a Project <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button variant="secondary" onClick={scrollToIntro} className="w-full sm:w-auto">
                    See What We Do
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Colour-blocked node system, dropping into the next section on wide screens */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: PREMIUM_EASE }}
            style={reduceMotion ? undefined : { y: blockY }}
            className="relative col-span-12 lg:col-span-5 lg:mt-14 lg:self-start"
          >
            <div className="relative h-[360px] overflow-hidden rounded-[2rem] bg-[var(--hero-block)] sm:h-[480px] sm:rounded-[2.5rem] lg:h-[min(72svh,640px)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--node-base) 1px, transparent 1px), linear-gradient(to bottom, var(--node-base) 1px, transparent 1px)",
                  backgroundSize: "3.5rem 3.5rem",
                }}
              />
              <div className="absolute inset-0">
                <ThreeArchitecture />
              </div>
              <span className="absolute left-4 top-4 z-[2] flex items-center gap-2 rounded-full bg-brand-warm px-3.5 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-brand-ink sm:left-6 sm:top-6">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-ink" />
                Interactive WebGL Node System
              </span>
            </div>
            <RotatingBadge
              text="DESIGN × CODE × IDEAS • "
              className="absolute -bottom-8 left-4 h-24 w-24 sm:h-28 sm:w-28 lg:-left-10 lg:bottom-16 lg:h-32 lg:w-32"
            />
          </motion.div>
        </div>

        {/* Scroll cue + index */}
        <div className="mt-16 flex items-center justify-between gap-4 border-t border-[var(--line-strong)] py-5 lg:mt-12 lg:w-[56%]">
          <button
            type="button"
            onClick={scrollToIntro}
            className="group inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-primary"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line-strong)] transition-colors duration-500 group-hover:bg-accent-fill group-hover:text-on-accent">
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
            </span>
            Scroll to explore
          </button>
          <span className="eyebrow hidden sm:block">Selected work</span>
        </div>
      </div>
    </section>
  );
};
