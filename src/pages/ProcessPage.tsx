import React, { useEffect } from "react";
import { PageHeader } from "../components/Section";
import { ProcessTimeline } from "../sections/ProcessTimeline";
import { CTASection } from "../sections/CTASection";

export const ProcessPage: React.FC = () => {
  useEffect(() => {
    document.title = "Our Process | IDEV Creative Coders";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <PageHeader
        eyebrow="ENGINEERING WORKFLOWS"
        lines={["How we turn ideas", "into production code."]}
        description="We follow a disciplined, transparent engineering methodology. From system architecture modeling and agile sprints to automated CI/CD staging and security auditing, we ensure your product is built to perform."
      />

      {/* Main Process Timeline */}
      <ProcessTimeline />

      {/* Footer CTA */}
      <CTASection />
    </div>
  );
};
