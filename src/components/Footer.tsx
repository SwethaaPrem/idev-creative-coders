import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export const Footer: React.FC = () => {
  const currentYear = 2026; // Static copyright year as requested

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "GitHub", url: "https://github.com" },
  ];

  const quickLinks = [
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative select-none overflow-hidden border-t border-[var(--line-strong)] pt-16 sm:pt-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 md:col-span-5">
            <Link to="/" className="flex max-w-fit items-center">
              <Logo />
            </Link>
            <p className="max-w-sm text-left text-sm leading-relaxed text-text-secondary">
              IDEV Creative Coders combines design, development, and emerging technology to create websites, applications, and digital products that are built to perform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5 text-left md:col-span-3 md:col-start-7">
            <h4 className="eyebrow">Navigation</h4>
            <ul className="flex flex-col gap-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 font-display text-3xl font-extrabold uppercase tracking-[-0.02em] text-text-primary transition-colors duration-500 [font-stretch:88%] hover:text-accent"
                  >
                    {link.name}
                    <ArrowUpRight className="h-5 w-5 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Socials */}
          <div className="flex flex-col gap-5 text-left md:col-span-3">
            <h4 className="eyebrow">Get In Touch</h4>
            <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-text-secondary">
              <a
                href="mailto:idevccv@gmail.com"
                className="group flex w-max items-center gap-1 transition-colors duration-300 hover:text-accent"
              >
                idevccv@gmail.com
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <a href="tel:+918610582676" className="w-max transition-colors duration-300 hover:text-accent">
                +91 86105 82676
              </a>
              <a
                href="https://idevpro.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-max items-center gap-1 transition-colors duration-300 hover:text-accent"
              >
                idevpro.in
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </div>

            {/* Social Grid */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--line-strong)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-text-secondary transition-colors duration-300 hover:border-text-primary hover:bg-text-primary hover:text-background"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 sm:mt-24 md:flex-row md:items-center">
          <p className="font-mono text-[10px] text-text-secondary">
            &copy; {currentYear} IDEV Creative Coders. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1 font-mono text-[10px] text-text-secondary">
            Creative Technology. Digital Experiences.
          </p>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <div
        aria-hidden="true"
        className="ghost-wordmark pointer-events-none mt-6 translate-y-[0.12em] text-center text-[clamp(8rem,36vw,36rem)] leading-[0.78]"
      >
        IDEV
      </div>
    </footer>
  );
};
