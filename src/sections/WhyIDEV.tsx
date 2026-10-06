import React from "react";
import { Target, Layers, Shield, Cpu } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader } from "../components/Section";

type Tone = "plain" | "lime" | "inverse";

const toneClasses: Record<Tone, { card: string; num: string; desc: string; icon: string }> = {
  plain: {
    card: "border border-[var(--line-strong)] text-text-primary",
    num: "",
    desc: "text-text-secondary",
    icon: "border-[var(--line-strong)] text-accent",
  },
  lime: {
    card: "bg-brand-lime text-brand-ink",
    num: "[-webkit-text-stroke-color:rgba(11,11,13,0.55)]",
    desc: "text-brand-ink/75",
    icon: "border-brand-ink/50 text-brand-ink",
  },
  inverse: {
    card: "bg-text-primary text-background",
    num: "[-webkit-text-stroke-color:color-mix(in_srgb,var(--background)_50%,transparent)]",
    desc: "text-background/70",
    icon: "border-background/40 text-background",
  },
};

export const WhyIDEV: React.FC = () => {
  const points: { num: string; icon: React.ReactNode; title: string; desc: string; tone: Tone }[] = [
    {
      num: "01",
      icon: <Target className="w-5 h-5" />,
      title: "BUSINESS-FIRST",
      desc: "Engineering starts with understanding the actual requirement. We align technical choices with commercial outcomes.",
      tone: "plain",
    },
    {
      num: "02",
      icon: <Layers className="w-5 h-5" />,
      title: "CUSTOM",
      desc: "Solutions are designed around the client's workflow. We build proprietary assets rather than wrapping generic SaaS scripts.",
      tone: "lime",
    },
    {
      num: "03",
      icon: <Shield className="w-5 h-5" />,
      title: "SECURE",
      desc: "Security is considered throughout architecture and development. We design security boundaries into every layer of our code.",
      tone: "inverse",
    },
    {
      num: "04",
      icon: <Cpu className="w-5 h-5" />,
      title: "SCALABLE",
      desc: "Systems are designed with maintainability and future growth in mind. We build architectures that grow with your user base.",
      tone: "plain",
    },
  ];

  return (
    <Section className="select-none">
      <SectionHeader eyebrow="08 // WHY IDEV CREATIVE CODERS" lines={["WHY IDEV CREATIVE CODERS."]} />

      {/* Offset 2x2: the right-hand column drops down for an asymmetric rhythm */}
      <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2 md:gap-6 lg:pb-16">
        {points.map((point, idx) => {
          const tone = toneClasses[point.tone];
          return (
            <ScrollReveal
              key={point.title}
              direction="up"
              delay={0.1 * (idx % 2)}
              className={idx % 2 === 1 ? "md:translate-y-16" : ""}
            >
              <div
                className={`flex h-full min-h-[360px] flex-col justify-between rounded-[2rem] p-8 sm:rounded-[2.5rem] sm:p-12 ${tone.card}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`ghost-numeral text-[clamp(4.5rem,8vw,7rem)] ${tone.num}`}>{point.num}</span>
                  <span className={`grid h-12 w-12 place-items-center rounded-full border ${tone.icon}`}>
                    {point.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-display text-3xl font-extrabold uppercase tracking-[-0.015em] [font-stretch:88%] sm:text-4xl">
                    {point.title}
                  </h3>
                  <p className={`max-w-md text-sm leading-relaxed sm:text-base ${tone.desc}`}>{point.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
};
