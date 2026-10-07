import React from "react";
import { EditorialHeading } from "../components/EditorialHeading";
import { ImageFrame } from "../components/ImageFrame";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader } from "../components/Section";
import { StatsStrip } from "../components/StatsStrip";
import { ThinkingIllustration } from "../components/ThinkingIllustration";

interface AboutSectionProps {
  eyebrow?: string;
  /** The "why we exist" line. The About page already opens with it, so it passes `false`. */
  showBelief?: boolean;
  /** The headline numbers. On the home page they sit under "Why IDEV" instead, as proof. */
  showStats?: boolean;
  tight?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  eyebrow = "01 // WHO WE ARE",
  showBelief = true,
  showStats = true,
  tight = false,
}) => {
  return (
    <Section id="about" tight={tight}>
      <SectionHeader
        eyebrow={eyebrow}
        lines={["We are IDEV Creative Coders."]}
        className={tight ? "mb-10 sm:mb-14" : undefined}
      />

      {/* Calm vector panel on the right, the description card overlapping its left edge */}
      <div className="relative grid grid-cols-12 items-end lg:mb-24">
        <div className="col-span-12 row-start-1 lg:col-span-9 lg:col-start-4">
          <ScrollReveal distance={60} duration={1.2}>
            <ImageFrame
              className="aspect-[5/7] border-[var(--line-strong)] sm:aspect-[16/10] lg:aspect-auto lg:h-[640px]"
              overlay={
                <div className="absolute inset-0 p-6 text-left sm:p-10 lg:p-14">
                  <EditorialHeading
                    as="h3"
                    size="section"
                    className="!text-brand-warm !text-[clamp(2.2rem,5.2vw,5.25rem)]"
                    lines={["CREATIVE", "THINKING ×", "SOLID", "ENGINEERING"]}
                  />
                </div>
              }
            >
              <div className="absolute inset-0 bg-[#120a0c]">
                <ThinkingIllustration />
              </div>
            </ImageFrame>
          </ScrollReveal>
        </div>

        {/* Floating description panel: also the target of the "Team" navigation link */}
        <div
          id="team"
          className="relative z-20 col-span-12 row-start-2 mx-3 -mt-14 scroll-mt-28 sm:mx-6 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mt-0 lg:translate-y-20"
        >
          <ScrollReveal delay={0.2}>
            <div className="glass rounded-[1.75rem] p-6 text-left sm:rounded-[2rem] sm:p-10">
              <span className="eyebrow mb-4 block text-text-primary">THE TEAM</span>
              <p className="text-base leading-relaxed text-text-primary sm:text-lg">
                We are a creative technology team focused on turning ambitious ideas into useful digital products. From websites and business applications to AI-powered platforms and cloud solutions, we combine creative thinking with engineering discipline.
              </p>
              {showBelief && (
                <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                  IDEV Creative Coders was founded on the belief that digital solutions should perform beautifully.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {showStats && <StatsStrip />}
    </Section>
  );
};
