import { PageHeader } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** The Work page opener: eyebrow, two-line page-size heading, intro paragraph on the right. */
export const WorkPage = () => (
  <Stage pad={0}>
    <PageHeader
      eyebrow="OUR PORTFOLIO"
      lines={["Products built", "to perform."]}
      description="Explore our engineering works, AI automation solutions, custom platforms, and digital product designs. Each case study details our strategy, system architecture, and outcomes."
    />
  </Stage>
);

/** The About page opener. */
export const AboutPage = () => (
  <Stage pad={0}>
    <PageHeader
      eyebrow="STUDIO PROFILE"
      lines={["We merge creative design", "with engineering discipline."]}
      description="IDEV Creative Coders was founded on the belief that digital solutions should perform beautifully."
    />
  </Stage>
);
