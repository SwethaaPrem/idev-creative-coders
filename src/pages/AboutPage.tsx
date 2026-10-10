import React, { useEffect } from "react";
import { PageHeader, TwoLayer } from "../components/Section";
import { AboutSection } from "../sections/AboutSection";
import { WhyIDEV } from "../sections/WhyIDEV";
import { CTASection } from "../sections/CTASection";

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About Us | IDEV Creative Coders";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <PageHeader
        eyebrow="STUDIO PROFILE"
        lines={["We merge creative design", "with engineering discipline."]}
        description={
          <TwoLayer
            plain="We make softwares, websites, applications and industrial smart tools that work beautifully and are easy to use."
            detail="IDEV Creative Coders was founded on the belief that digital solutions should perform beautifully. We build bespoke software architectures, AI platforms, responsive applications, and technical interfaces designed from scratch to deliver real results."
          />
        }
      />

      {/* Main split sections */}
      <AboutSection showBelief={false} />
      <WhyIDEV />
      <CTASection />
    </div>
  );
};
