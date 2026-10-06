import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Desktop-only cursor. A small inverted dot normally; over anything marked
 * `data-cursor="view"` (project posters) it grows into a labelled disc.
 */
export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<"default" | "view" | "open">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile/touch devices
    const checkDevice = () => {
      const mobile =
        window.matchMedia("(max-width: 768px)").matches ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest element with custom cursor attribute
      const interactiveEl = target.closest("[data-cursor]");
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor") as "view" | "open";
        setCursorType(type || "view");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  const isInteractive = cursorType === "view" || cursorType === "open";

  return (
    <motion.div
      style={{
        x: cursorSpringX,
        y: cursorSpringY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={`pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.06em] transition-[width,height,background-color] duration-300 ${
        isInteractive
          ? "h-[88px] w-[88px] border border-brand-ink bg-brand-warm text-brand-ink"
          : "h-3 w-3 bg-white mix-blend-difference"
      }`}
    >
      {isInteractive && (
        <span className="flex select-none flex-col items-center gap-1 leading-none">
          {cursorType === "open" ? "OPEN" : "VIEW"}
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
        </span>
      )}
    </motion.div>
  );
};
