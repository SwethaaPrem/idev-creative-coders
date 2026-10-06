// Design-sync entry: the reusable IDEV UI only. Page sections, the site shell
// (Navbar/Footer), the contact form and the WebGL hero are site-specific and stay out.
export { Button } from "../src/components/Button";
export { EditorialHeading } from "../src/components/EditorialHeading";
export { FloatingInfoCard } from "../src/components/FloatingInfoCard";
export { GlassPanel } from "../src/components/GlassPanel";
export { ImageFrame } from "../src/components/ImageFrame";
export { Logo } from "../src/components/Logo";
export { Marquee } from "../src/components/Marquee";
export { ProjectMetrics, StatusBadge, TechChips, ViewCaseStudyLink } from "../src/components/ProjectMeta";
export { ProjectPreview } from "../src/components/ProjectPreview";
export { ProjectShowcase } from "../src/components/ProjectShowcase";
export { ScrollReveal } from "../src/components/ScrollReveal";
export { PageHeader, Section, SectionHeader } from "../src/components/Section";
export { ThemeSelector } from "../src/components/ThemeSelector";

// Real portfolio data (7 projects) so previews and designs use IDEV content, not lorem ipsum.
export { projects } from "../src/data/projects";

// Provider for previews: Button/ViewCaseStudyLink/FloatingInfoCard render router links.
export { MemoryRouter } from "react-router-dom";
