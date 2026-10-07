import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Cpu, Globe, Smartphone, Database, Cloud, Shield, Brain, Layers } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader, TwoLayer } from "../components/Section";
import { services } from "../data/services";

interface ServicesProps {
  /** `full` lists every service with its technical detail; `compact` is the at-a-glance version for the home page. */
  variant?: "full" | "compact";
  eyebrow?: string;
}

const getIcon = (num: string) => {
  switch (num) {
    case "01": return <Cpu className="w-5 h-5" />;
    case "02": return <Globe className="w-5 h-5" />;
    case "03": return <Smartphone className="w-5 h-5" />;
    case "04": return <Database className="w-5 h-5" />;
    case "05": return <Cloud className="w-5 h-5" />;
    case "06": return <Shield className="w-5 h-5" />;
    case "07": return <Brain className="w-5 h-5" />;
    case "08":
    default:
      return <Layers className="w-5 h-5" />;
  }
};

export const Services: React.FC<ServicesProps> = ({ variant = "full", eyebrow = "02 // WHAT WE BUILD" }) => {
  const compact = variant === "compact";

  return (
    <Section id="services" tight={compact} className="select-none">
      <SectionHeader
        eyebrow={eyebrow}
        className={compact ? "mb-10 sm:mb-14" : undefined}
        lines={["WHAT WE BUILD."]}
        description={
          <TwoLayer
            plain="We design and build websites, apps and smart tools for businesses, from the first idea to something people use every day."
            detail="From business requirements to production-ready systems. We design, build, and deploy custom technology solutions."
          />
        }
        action={
          compact ? (
            <Link
              to="/services"
              className="group inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-primary transition-colors duration-500 hover:text-accent"
            >
              All Services &amp; Technical Detail
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] transition-all duration-500 group-hover:border-[var(--accent-edge)] group-hover:bg-accent-fill group-hover:text-on-accent">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ) : undefined
        }
      />

      {/* Editorial index: one row per service; a row floods with colour on hover */}
      <ul className={`border-t border-[var(--line-strong)] ${compact ? "lg:grid lg:grid-cols-2 lg:gap-x-12" : ""}`}>
        {services.map((service, index) => (
          <li key={service.number} className="border-b border-[var(--line-strong)]">
            <ScrollReveal delay={compact ? 0.03 * (index % 4) : 0.04 * index}>
              {compact ? (
                <div className="group relative -mx-4 flex items-start gap-5 rounded-[1.75rem] px-4 py-6 text-left transition-colors duration-500 hover:bg-accent-fill hover:text-on-accent sm:-mx-6 sm:px-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-text-secondary transition-colors duration-500 group-hover:border-on-accent group-hover:text-on-accent">
                    {getIcon(service.number)}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-bold text-text-secondary transition-colors duration-500 group-hover:text-on-accent">
                        {service.number}
                      </span>
                      <h3 className="font-display text-[clamp(1.3rem,2vw,1.9rem)] font-extrabold uppercase leading-[1] tracking-[-0.015em] text-text-primary transition-colors duration-500 [font-stretch:88%] group-hover:text-on-accent">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary transition-colors duration-500 group-hover:text-on-accent sm:text-base">
                      {service.summary}
                    </p>
                  </div>
                  <Link
                    to="/services"
                    aria-label={`${service.title}: see detail`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-text-secondary transition-all duration-500 after:absolute after:inset-0 after:rounded-[1.75rem] group-hover:border-on-accent group-hover:bg-on-accent group-hover:text-accent-fill"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              ) : (
                <div className="group relative -mx-4 grid grid-cols-12 items-start gap-y-5 rounded-[1.75rem] px-4 py-8 text-left transition-colors duration-500 hover:bg-accent-fill hover:text-on-accent sm:-mx-6 sm:px-6 sm:py-10 lg:gap-x-8">
                  {/* Number + icon */}
                  <div className="col-span-12 flex items-center gap-4 lg:col-span-2">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line-strong)] text-text-secondary transition-colors duration-500 group-hover:border-on-accent group-hover:text-on-accent">
                      {getIcon(service.number)}
                    </span>
                    <span className="font-mono text-xs font-bold text-text-secondary transition-colors duration-500 group-hover:text-on-accent">
                      {service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="col-span-12 font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.015em] text-text-primary transition-all duration-500 [font-stretch:88%] group-hover:translate-x-2 group-hover:text-on-accent lg:col-span-4">
                    {service.title}
                  </h3>

                  {/* Plain explanation first, technical detail second, then capabilities */}
                  <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
                    <p className="text-base font-medium leading-relaxed text-text-primary transition-colors duration-500 group-hover:text-on-accent">
                      {service.summary}
                    </p>
                    <p className="text-sm leading-relaxed text-text-secondary transition-colors duration-500 group-hover:text-on-accent">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {service.capabilities.slice(0, 3).map((capability) => (
                        <li
                          key={capability}
                          className="rounded-full border border-[var(--line-strong)] px-3 py-1.5 font-mono text-[10px] uppercase leading-none text-text-secondary transition-colors duration-500 group-hover:border-on-accent group-hover:text-on-accent"
                        >
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More (stretched link makes the whole row clickable) */}
                  <div className="col-span-12 lg:col-span-2 lg:justify-self-end">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary transition-colors duration-500 after:absolute after:inset-0 after:rounded-[1.75rem] group-hover:text-on-accent"
                    >
                      <span>Learn More</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] transition-all duration-500 group-hover:border-on-accent group-hover:bg-on-accent group-hover:text-accent-fill">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </Section>
  );
};
