import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { EditorialHeading } from "../components/EditorialHeading";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionLabel } from "../components/Section";

export const ContactSection: React.FC = () => {
  return (
    <Section className="select-none">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-12">

        {/* Left Column: Heading & Contact Info */}
        <div className="flex flex-col gap-10 text-left lg:col-span-5">
          <div>
            <ScrollReveal direction="none" className="mb-8">
              <SectionLabel>09 // INQUIRY</SectionLabel>
            </ScrollReveal>
            <EditorialHeading
              size="section"
              className="mb-8 !text-[clamp(2.75rem,6.6vw,6.5rem)]"
              lines={["LET'S CREATE", "SOMETHING", <span key="great" className="block text-accent">GREAT.</span>]}
            />
            <ScrollReveal direction="up" delay={0.2}>
              <p className="max-w-sm text-base leading-relaxed text-text-secondary">
                Have an idea, product, or business challenge? Let's turn it into a digital experience.
              </p>
            </ScrollReveal>
          </div>

          {/* Information List */}
          <div className="flex flex-col border-t border-[var(--line-strong)]">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 border-b border-border-subtle py-6">
                <span className="eyebrow">STUDIO</span>
                <span className="font-display text-2xl font-bold tracking-tight text-text-primary">
                  IDEV Creative Coders
                </span>
              </div>
            </ScrollReveal>

            {/* Email link */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col gap-2 border-b border-border-subtle py-6">
                <span className="eyebrow">EMAIL</span>
                <a
                  href="mailto:idevccv@gmail.com"
                  className="group inline-flex w-max items-center gap-2 font-display text-2xl font-bold tracking-tight text-text-primary transition-all duration-500 hover:translate-x-1 hover:text-accent"
                >
                  idevccv@gmail.com
                  <ArrowUpRight className="h-4 w-4 opacity-50 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </div>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col gap-2 border-b border-border-subtle py-6">
                <span className="eyebrow">PHONE</span>
                <a
                  href="tel:+918610582676"
                  className="inline-flex w-max items-center font-display text-2xl font-bold tracking-tight text-text-primary transition-all duration-500 hover:translate-x-1 hover:text-accent"
                >
                  +91 86105 82676
                </a>
              </div>
            </ScrollReveal>

            {/* Web URL */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-col gap-2 border-b border-border-subtle py-6">
                <span className="eyebrow">WEBSITE</span>
                <a
                  href="https://idevpro.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-max items-center gap-2 font-display text-2xl font-bold tracking-tight text-text-primary transition-all duration-500 hover:translate-x-1 hover:text-accent"
                >
                  idevpro.in
                  <ArrowUpRight className="h-4 w-4 opacity-50 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 lg:mt-24">
          <ScrollReveal direction="up" delay={0.2}>
            <ContactForm />
          </ScrollReveal>
        </div>

      </div>
    </Section>
  );
};
