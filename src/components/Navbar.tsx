import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./Button";
import { ThemeSelector } from "./ThemeSelector";
import { Logo } from "./Logo";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "Process", path: "/process" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-background/80 border-b border-border-subtle backdrop-blur-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center group">
            <Logo />
          </Link>

          {/* Desktop Navigation Links (Maroon/Rose Capsule Container) */}
          <div className="hidden md:flex items-center gap-3 bg-accent border border-accent-secondary px-5 py-2.5 rounded-full shadow-[0_12px_36px_rgba(74,21,33,0.2)]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-widest transition-colors duration-300 px-4 py-2 outline-none focus-visible:text-white font-mono ${
                    isActive ? "text-[#faf7f2] font-bold" : "text-[#faf7f2]/80 hover:text-[#faf7f2]"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeSelector />
            <Button variant="secondary" to="/contact" className="px-5 py-2.5 text-xs">
              Let's Talk <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-primary hover:text-accent focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 pt-28 px-6 bg-background flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      to={link.path}
                      className={`text-2xl font-semibold tracking-wide uppercase ${
                        isActive ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6 border-t border-border-subtle pt-8"
            >
              <Button to="/contact" className="w-full text-center">
                Let's Talk <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <div className="flex justify-between items-center text-xs text-text-secondary font-mono">
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
