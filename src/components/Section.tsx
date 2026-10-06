import React from "react";
import type { ReactNode } from "react";
import { EditorialHeading } from "./EditorialHeading";
import type { HeadingSize } from "./EditorialHeading";
import { ScrollReveal } from "./ScrollReveal";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

/** Page-width content section with the shared gutter and vertical rhythm. */
export const Section: React.FC<SectionProps> = ({ id, className = "", children }) => (
  <section id={id} className={`relative py-24 sm:py-36 ${className}`}>
    <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 md:px-12">{children}</div>
  </section>
);

/** Tiny technical label with a lime square, e.g. "02 // WHAT WE BUILD". */
export const SectionLabel: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <span className={`eyebrow flex items-center gap-3 text-text-primary ${className}`}>
    <span className="h-2 w-2 shrink-0 bg-accent-fill [html.light_&]:outline [html.light_&]:outline-1 [html.light_&]:outline-text-primary" />
    {children}
  </span>
);

interface SectionHeaderProps {
  eyebrow: string;
  lines: ReactNode[];
  as?: "h1" | "h2";
  size?: HeadingSize;
  /** Supporting copy, set in the right-hand column on wide screens. */
  description?: ReactNode;
  /** Optional trailing element (e.g. a link) beneath the description. */
  action?: ReactNode;
  /** `split` sets the copy beside the heading; `stacked` gives the heading the full width and drops the copy below, to the right. */
  layout?: "split" | "stacked";
  className?: string;
}

/** Label + oversized heading on the left, supporting copy dropped low on the right. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  lines,
  as = "h2",
  size = "section",
  description,
  action,
  layout = "split",
  className = "mb-16 sm:mb-24",
}) => (
  <div className={`grid grid-cols-1 items-end gap-8 text-left lg:grid-cols-12 lg:gap-x-12 ${className}`}>
    <div className={layout === "stacked" ? "lg:col-span-12" : "lg:col-span-8"}>
      <ScrollReveal direction="none" className="mb-6 sm:mb-8">
        <SectionLabel>{eyebrow}</SectionLabel>
      </ScrollReveal>
      <EditorialHeading as={as} size={size} lines={lines} />
    </div>
    {(description || action) && (
      <div
        className={`flex flex-col items-start gap-6 ${
          layout === "stacked" ? "lg:col-span-5 lg:col-start-8 lg:mt-6" : "lg:col-span-4 lg:pb-2"
        }`}
      >
        {description && (
          <ScrollReveal delay={0.2}>
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{description}</p>
          </ScrollReveal>
        )}
        {action && <ScrollReveal delay={0.3}>{action}</ScrollReveal>}
      </div>
    )}
  </div>
);

interface PageHeaderProps {
  eyebrow: string;
  lines: ReactNode[];
  description?: ReactNode;
  /** Optional element set under the header (e.g. a project index). */
  children?: ReactNode;
}

/** Opening block of every top-level page (sits below the fixed navigation). */
export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, lines, description, children }) => (
  <header className="mx-auto w-full max-w-[1400px] px-5 pt-36 sm:px-8 sm:pt-44 md:px-12">
    <SectionHeader
      as="h1"
      size="page"
      layout="stacked"
      eyebrow={eyebrow}
      lines={lines}
      description={description}
      className=""
    />
    {children}
  </header>
);
