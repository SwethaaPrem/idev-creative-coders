import React, { useEffect } from "react";
import { Hero } from "../sections/Hero";
import { IntroStrip } from "../sections/IntroStrip";
import { AboutSection } from "../sections/AboutSection";
import { Services } from "../sections/Services";
import { ProcessTimeline } from "../sections/ProcessTimeline";
import { SelectedWork } from "../sections/SelectedWork";
import { WhyIDEV } from "../sections/WhyIDEV";
import { CTASection } from "../sections/CTASection";
import { ContactSection } from "../sections/ContactSection";

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = "IDEV Creative Coders | Creative Technology & Software Development";
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* The story, in order: WHAT we do → WHO we are → WHY IDEV (what makes us different) → HOW we work, then the work itself */}
      <Hero />
      <Services variant="compact" eyebrow="01 // WHAT WE DO" />
      <AboutSection eyebrow="02 // WHO WE ARE" showStats={false} tight />
      <WhyIDEV eyebrow="03 // WHY IDEV" showStats tight />
      <ProcessTimeline variant="compact" eyebrow="04 // HOW WE WORK" />
      <IntroStrip />
      <SelectedWork eyebrow="05 // OUR PROJECTS" />
      <CTASection />
      <ContactSection eyebrow="06 // INQUIRY" />
    </div>
  );
};
