import React from "react";
import { EditorialHeading } from "../components/EditorialHeading";
import { Marquee } from "../components/Marquee";
import { ScrollReveal } from "../components/ScrollReveal";

export const IntroStrip: React.FC = () => {
  const technologies = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "AI",
    "Cloud Solutions",
    "UI / UX Design",
    "Next.js",
    "Docker",
    "Machine Learning",
    "REST APIs"
  ];

  return (
    <section id="intro-strip" className="relative overflow-hidden pb-24 pt-40 sm:pb-36 sm:pt-52 lg:pt-64">
      <div className="mx-auto mb-20 w-full max-w-[1400px] px-5 sm:mb-28 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <EditorialHeading
              size="section"
              className="!text-[clamp(3rem,10.5vw,9.25rem)]"
              lines={[
                "Designing.",
                <span key="developing" className="outline-text block lg:pl-[0.9em]">Developing.</span>,
                <span key="deploying" className="block text-accent lg:pl-[1.7em]">Deploying.</span>,
              ]}
            />
          </div>
          <div className="lg:col-span-3 lg:pb-4">
            <ScrollReveal delay={0.2}>
              <p className="max-w-sm text-base leading-relaxed text-text-secondary sm:text-lg">
                We transform ideas into reliable digital products through thoughtful design, clean engineering, and modern technology.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Horizontally scrolling technology strip */}
      <ScrollReveal delay={0.2} direction="none">
        <Marquee items={technologies} speed="medium" />
      </ScrollReveal>
    </section>
  );
};
