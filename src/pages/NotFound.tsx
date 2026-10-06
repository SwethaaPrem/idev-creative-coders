import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../components/Button";
import { EditorialHeading } from "../components/EditorialHeading";
import { ScrollReveal } from "../components/ScrollReveal";

export const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "404 - Page Off Grid | IDEV Creative Coders";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-[90vh] select-none items-center justify-center px-6 pt-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <ScrollReveal direction="none">
          <span className="eyebrow flex items-center gap-3 text-accent">
            <span className="h-px w-6 bg-accent" />
            ERROR 404
            <span className="h-px w-6 bg-accent" />
          </span>
        </ScrollReveal>

        <EditorialHeading
          as="h1"
          size="page"
          className="text-center"
          lines={["Looks like this page went off the grid."]}
        />

        <ScrollReveal direction="up" delay={0.2} className="max-w-sm">
          <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
            The link you followed may be broken, or the page has been moved into another developer deployment.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <Button to="/" variant="primary">
            Back Home <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </ScrollReveal>
      </div>
    </div>
  );
};
