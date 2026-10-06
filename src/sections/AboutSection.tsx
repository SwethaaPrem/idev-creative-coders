import React from "react";
import { EditorialHeading } from "../components/EditorialHeading";
import { ImageFrame } from "../components/ImageFrame";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader } from "../components/Section";

export const AboutSection: React.FC = () => {
  const stats = [
    { label: "Projects & Experiments", value: "25+", tone: "neutral" },
    { label: "Core Technologies", value: "10+", tone: "neutral" },
    { label: "Commitment", value: "100%", tone: "lime" },
  ];

  return (
    <Section id="about">
      <SectionHeader eyebrow="01 // WHO WE ARE" lines={["We are IDEV Creative Coders."]} />

      {/* Team imagery on the right, the description card overlapping its left edge */}
      <div className="relative grid grid-cols-12 items-end lg:mb-24">
        <div className="col-span-12 row-start-1 lg:col-span-9 lg:col-start-4">
          <ScrollReveal distance={60} duration={1.2}>
            <ImageFrame
              className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[640px]"
              overlay={
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/35 to-transparent p-6 text-left sm:p-10 lg:p-14">
                  <EditorialHeading
                    as="h3"
                    size="section"
                    className="!text-brand-warm !text-[clamp(2.2rem,5.2vw,5.25rem)]"
                    lines={["CREATIVE", "THINKING ×", "SOLID", "ENGINEERING"]}
                  />
                </div>
              }
            >
              <img
                src="/assets/branding/team_tech_background.jpg"
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </ImageFrame>
          </ScrollReveal>
        </div>

        {/* Floating description panel */}
        <div className="relative z-20 col-span-12 row-start-2 mx-3 -mt-14 sm:mx-6 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mt-0 lg:translate-y-20">
          <ScrollReveal delay={0.2}>
            <div className="glass rounded-[1.75rem] p-6 text-left sm:rounded-[2rem] sm:p-10">
              <p className="text-base leading-relaxed text-text-primary sm:text-lg">
                We are a creative technology team focused on turning ambitious ideas into useful digital products. From websites and business applications to AI-powered platforms and cloud solutions, we combine creative thinking with engineering discipline.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Stat tiles: the middle one drops, the last one is colour-blocked */}
      <div className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-36">
        {stats.map((stat, index) => (
          <ScrollReveal key={stat.label} direction="up" delay={0.1 * index} className={index === 1 ? "sm:translate-y-12" : ""}>
            <div
              className={`flex h-full min-h-[240px] flex-col justify-between gap-12 rounded-[2rem] p-7 text-left sm:min-h-[300px] sm:rounded-[2.5rem] sm:p-9 ${
                stat.tone === "lime"
                  ? "bg-brand-lime text-brand-ink"
                  : "border border-[var(--line-strong)] text-text-primary"
              }`}
            >
              <span className={`eyebrow ${stat.tone === "lime" ? "!text-brand-ink" : ""}`}>{stat.label}</span>
              <span className="display text-[clamp(4rem,8vw,7.5rem)] leading-[0.85]">{stat.value}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
};
