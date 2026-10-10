import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./Button";
import { ThemeSelector } from "./ThemeSelector";
import { Logo } from "./Logo";
import { PREMIUM_EASE } from "../lib/motion";

interface NavItem {
  name: string;
  path: string;
  hash?: string;
}

/** Narrative order: what we do, who we are, the team, the work, how we work, get in touch. */
const navLinks: NavItem[] = [
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/about", hash: "#team" },
  { name: "Projects", path: "/work" },
  { name: "Process", path: "/process" },
  { name: "Contact", path: "/contact" },
];

const isLinkActive = (link: NavItem, loc: { pathname: string; hash: string }): boolean => {
  const onPage = loc.pathname === link.path || (link.path === "/work" && loc.pathname.startsWith("/work/"));
  if (!onPage) return false;
  // "About" and "Team" share a page, so the hash decides which one is lit
  if (link.hash) return loc.hash === link.hash;
  return link.path !== "/about" || loc.hash !== "#team";
};

const linkTarget = (link: NavItem) => (link.hash ? { pathname: link.path, hash: link.hash } : link.path);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 20);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: PREMIUM_EASE }}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !isOpen
            ? "border-border-subtle bg-[var(--nav-bg)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 md:px-12">
          <Link to="/" aria-label="IDEV Creative Coders, home" className="shrink-0 whitespace-nowrap">
            <Logo />
          </Link>

          {/* Desktop navigation: small mono labels */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link, location);
              return (
                <Link
                  key={link.name}
                  to={linkTarget(link)}
                  className={`group relative flex items-baseline gap-1.5 rounded-full px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-4 -bottom-px h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeSelector />
            <Button variant="primary" to="/contact" className="px-5 py-3 text-[11px]">
              Let's Talk <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-text-primary transition-colors duration-300 hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            className="fixed inset-0 z-30 flex flex-col justify-between overflow-y-auto bg-background px-5 pb-8 pt-24 sm:px-8 lg:hidden"
          >
            <div className="flex flex-col border-t border-border-subtle">
              {navLinks.map((link, index) => {
                const isActive = isLinkActive(link, location);
                return (
                  <div key={link.name} className="overflow-hidden border-b border-border-subtle">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.08 + index * 0.06, duration: 0.8, ease: PREMIUM_EASE }}
                    >
                      <Link
                        to={linkTarget(link)}
                        className={`flex items-baseline justify-between gap-4 py-3.5 font-display text-[clamp(2.4rem,12vw,4.25rem)] font-extrabold uppercase leading-none tracking-[-0.02em] [font-stretch:88%] transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-text-primary hover:text-accent"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="h-6 w-6 shrink-0 self-center opacity-40" />
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: PREMIUM_EASE }}
              className="mt-10 flex flex-col gap-6"
            >
              <Button to="/contact" className="w-full text-center">
                Let's Talk <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
              <div className="flex items-center justify-between font-mono text-xs text-text-secondary">
                <div className="flex flex-col gap-1">
                  <span>+91 86105 82676</span>
                  <span>idevccv@gmail.com</span>
                </div>
                <ThemeSelector align="top" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
