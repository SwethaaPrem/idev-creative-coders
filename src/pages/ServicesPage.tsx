import React, { useEffect } from "react";
import { PageHeader, TwoLayer } from "../components/Section";
import { Services } from "../sections/Services";
import { ProcessTimeline } from "../sections/ProcessTimeline";
import { SecuritySection } from "../sections/SecuritySection";
import { CloudDevOps } from "../sections/CloudDevOps";
import { TechnologyConstellation } from "../sections/TechnologyConstellation";
import { CTASection } from "../sections/CTASection";

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    document.title = "Our Services | IDEV Creative Coders";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <PageHeader
        eyebrow="WHAT WE DO"
        lines={["Digital solutions designed", "around business workflows."]}
        description={
          <TwoLayer
            plain="Everything needed to take an idea online: design, software, cloud, security and AI, all from one team."
            detail="We provide full-lifecycle technical and creative services. From custom cloud configurations and automation pipelines to intelligent NLP systems and responsive layouts, our solutions are built to support growth."
          />
        }
      />

      <Services />
      <ProcessTimeline />
      <SecuritySection />
      <CloudDevOps />
      <TechnologyConstellation />
      <CTASection />
    </div>
  );
};
