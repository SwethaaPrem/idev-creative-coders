import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader, TwoLayer } from "../components/Section";

type Category = "frontend" | "backend" | "cloud" | "security" | "ai" | "core";

interface TechNode {
  name: string;
  category: Category;
  x: number; // percentage coordinate
  y: number; // percentage coordinate
}

const nodes: TechNode[] = [
  // Core Central
  { name: "IDEV CORE", category: "core", x: 50, y: 50 },

  // Frontend Nodes
  { name: "React / Next.js", category: "frontend", x: 30, y: 35 },
  { name: "TypeScript", category: "frontend", x: 20, y: 40 },
  { name: "Tailwind CSS", category: "frontend", x: 25, y: 25 },

  // Backend / Data Nodes
  { name: "Node.js", category: "backend", x: 65, y: 30 },
  { name: "Java / Spring", category: "backend", x: 75, y: 35 },
  { name: "PostgreSQL", category: "backend", x: 70, y: 20 },
  { name: "Redis Cache", category: "backend", x: 60, y: 15 },

  // Cloud / DevOps Nodes
  { name: "AWS ECS/EKS", category: "cloud", x: 68, y: 65 },
  { name: "Docker", category: "cloud", x: 78, y: 60 },
  { name: "CI / CD Pipelines", category: "cloud", x: 75, y: 75 },

  // Security Nodes
  { name: "OAuth2 / IAM", category: "security", x: 35, y: 68 },
  { name: "API Security", category: "security", x: 25, y: 72 },
  { name: "Secured Boundaries", category: "security", x: 22, y: 60 },

  // AI Nodes
  { name: "Python / PyTorch", category: "ai", x: 48, y: 22 },
  { name: "OpenAI / LLM API", category: "ai", x: 52, y: 12 },
];

const categories: { name: string; id: Exclude<Category, "core"> }[] = [
  { name: "Frontend", id: "frontend" },
  { name: "Backend & Data", id: "backend" },
  { name: "Cloud & Infrastructure", id: "cloud" },
  { name: "Identity & Security", id: "security" },
  { name: "AI Integration", id: "ai" },
];

const categoryName = (id: Category) => categories.find((c) => c.id === id)?.name ?? "";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Interactive map of the tools IDEV uses.
 *  - Move over it and nearby nodes lean toward the cursor.
 *  - Grab any node and drag it; the line follows, and it springs back when released.
 *  - Hover (or focus) a node to spotlight it and its group; click or tap to lock the spotlight.
 *  - The group chips work the same way, and they lock on tap too (hover alone doesn't exist on touch).
 *  - Click the empty space or the core to clear.
 */
export const TechnologyConstellation: React.FC = () => {
  const reduceMotion = useReducedMotion();

  // What is spotlighted. Hover previews; a click/tap locks.
  const [hoverNode, setHoverNode] = useState<number | null>(null);
  const [lockedNode, setLockedNode] = useState<number | null>(null);
  const [hoverCat, setHoverCat] = useState<Exclude<Category, "core"> | null>(null);
  const [lockedCat, setLockedCat] = useState<Exclude<Category, "core"> | null>(null);

  const focusNode = hoverNode ?? lockedNode;
  const focusCat: Category | null = focusNode !== null ? nodes[focusNode].category : (hoverCat ?? lockedCat);

  // --- motion: positions are driven imperatively (no re-render per frame) ---
  const panelRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const frame = useRef(0);
  const tickRef = useRef<() => void>(() => {});
  const movedRef = useRef(false);
  const downAt = useRef({ x: 0, y: 0 });
  const sim = useRef({
    w: 0,
    h: 0,
    pointer: null as { x: number; y: number } | null,
    drag: -1,
    off: nodes.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })),
  });

  /** Write the current offsets to the DOM: node position and the line that ends at it. */
  const apply = useCallback(() => {
    const s = sim.current;
    if (s.w === 0 || s.h === 0) return;
    nodes.forEach((n, i) => {
      if (n.category === "core") return;
      const o = s.off[i];
      const el = nodeRefs.current[i];
      if (el) el.style.transform = `translate(${o.x}px, ${o.y}px)`;
      const line = lineRefs.current[i];
      if (line) {
        line.setAttribute("x1", String(s.w / 2));
        line.setAttribute("y1", String(s.h / 2));
        line.setAttribute("x2", String((n.x / 100) * s.w + o.x));
        line.setAttribute("y2", String((n.y / 100) * s.h + o.y));
      }
    });
  }, []);

  const tick = useCallback(() => {
    const s = sim.current;
    let moving = false;

    nodes.forEach((n, i) => {
      if (n.category === "core") return;
      const o = s.off[i];
      const hx = (n.x / 100) * s.w;
      const hy = (n.y / 100) * s.h;
      let tx = 0;
      let ty = 0;

      if (s.pointer) {
        const dx = s.pointer.x - hx;
        const dy = s.pointer.y - hy;
        if (s.drag === i) {
          tx = dx; // a grabbed node follows the pointer exactly
          ty = dy;
        } else if (s.drag === -1 && !reduceMotion) {
          const d = Math.hypot(dx, dy);
          const reach = Math.min(s.w, s.h) * 0.36; // nearby nodes lean toward the cursor
          if (d < reach) {
            const f = (1 - d / reach) ** 1.5;
            tx = dx * 0.9 * f; // peaks at roughly 25px, so the lean is easy to see
            ty = dy * 0.9 * f;
          }
        }
      }

      if (reduceMotion) {
        o.x = tx;
        o.y = ty;
        o.vx = 0;
        o.vy = 0;
      } else {
        o.vx = (o.vx + (tx - o.x) * 0.16) * 0.78;
        o.vy = (o.vy + (ty - o.y) * 0.16) * 0.78;
        o.x += o.vx;
        o.y += o.vy;
        if (Math.abs(o.vx) > 0.02 || Math.abs(o.vy) > 0.02 || Math.abs(tx - o.x) > 0.3 || Math.abs(ty - o.y) > 0.3) {
          moving = true;
        }
      }
    });

    apply();
    frame.current = moving || s.pointer || s.drag !== -1 ? requestAnimationFrame(() => tickRef.current()) : 0;
  }, [apply, reduceMotion]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const kick = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(() => tickRef.current());
  }, []);

  // Keep pixel sizes in sync with the panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const measure = () => {
      sim.current.w = panel.clientWidth;
      sim.current.h = panel.clientHeight;
      apply();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [apply]);

  const toLocal = (e: React.PointerEvent) => {
    const r = panelRef.current!.getBoundingClientRect();
    return { x: clamp(e.clientX - r.left, 8, r.width - 8), y: clamp(e.clientY - r.top, 8, r.height - 8) };
  };

  const onPanelMove = (e: React.PointerEvent) => {
    const s = sim.current;
    if (e.pointerType !== "mouse" && s.drag === -1) return; // touch scrolls the page; only a grabbed node reacts
    s.pointer = toLocal(e);
    if (s.drag !== -1 && Math.hypot(s.pointer.x - downAt.current.x, s.pointer.y - downAt.current.y) > 5) {
      movedRef.current = true;
    }
    kick();
  };

  const onPanelLeave = () => {
    if (sim.current.drag === -1) {
      sim.current.pointer = null;
      kick();
    }
  };

  const grab = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const s = sim.current;
    s.drag = i;
    s.pointer = toLocal(e);
    downAt.current = { ...s.pointer };
    movedRef.current = false;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety */
    }
    kick();
  };

  const release = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = sim.current;
    s.drag = -1;
    if (e.pointerType !== "mouse") s.pointer = null;
    kick();
  };

  // Selection
  const clearAll = () => {
    setLockedNode(null);
    setLockedCat(null);
  };

  const toggleNode = (i: number) => {
    if (movedRef.current) {
      movedRef.current = false; // that was a drag, not a click
      return;
    }
    setLockedCat(null);
    setLockedNode((cur) => (cur === i ? null : i));
  };

  const toggleCat = (id: Exclude<Category, "core">) => {
    setLockedNode(null);
    setLockedCat((cur) => (cur === id ? null : id));
  };

  const spotlightNames = nodes.filter((n) => focusCat && n.category === focusCat).map((n) => n.name);

  return (
    <Section className="select-none">
      <SectionHeader
        eyebrow="06 // TECHNOLOGY STEERAGE"
        lines={["Technology Constellation."]}
        description={
          <TwoLayer
            plain="We stick to reliable, well-understood tools instead of chasing every trend."
            detail="We focus on a highly robust stack built around modern standards. Rather than adopting every trend, we master the tools that power stable systems."
          />
        }
      />

      {/* Constellation Canvas Block */}
      <ScrollReveal direction="up" delay={0.1}>
        <div
          ref={panelRef}
          onPointerMove={onPanelMove}
          onPointerLeave={onPanelLeave}
          className="panel relative flex min-h-[600px] items-center justify-center overflow-hidden rounded-[2rem] p-6 sm:rounded-[2.5rem] md:min-h-[500px] md:p-12"
        >
          <div className="stage-grid pointer-events-none absolute inset-0 opacity-60" />

          {/* Empty space clears the spotlight */}
          <div aria-hidden="true" onClick={clearAll} className="absolute inset-0 z-[5]" />

          {/* SVG connecting lines. They start in percentages and are rewritten in pixels as nodes move. */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true">
            {nodes.map((node, i) => {
              if (node.category === "core") return null;
              const inGroup = focusCat === node.category;
              const isFocus = focusNode === i;
              const dimmed = focusCat !== null && !inGroup;
              return (
                <line
                  key={node.name}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  x1="50%"
                  y1="50%"
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke="var(--accent)"
                  strokeWidth={isFocus ? 3 : inGroup ? 2 : 1}
                  strokeDasharray={inGroup ? "0" : "3 3"}
                  className="transition-[stroke-width,opacity] duration-500"
                  opacity={isFocus ? 1 : inGroup ? 0.9 : dimmed ? 0.1 : 0.3}
                />
              );
            })}
          </svg>

          {/* Group chips: hover previews, click or tap locks */}
          {/* On phones the chips sit in one swipeable row so they never cover the nodes */}
          <div className="absolute left-4 right-4 top-4 z-20 flex flex-nowrap justify-start gap-2 overflow-x-auto [scrollbar-width:none] md:bottom-4 md:right-auto md:top-auto md:max-w-lg md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={lockedCat === cat.id}
                onMouseEnter={() => setHoverCat(cat.id)}
                onMouseLeave={() => setHoverCat(null)}
                onClick={() => toggleCat(cat.id)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  focusCat === cat.id
                    ? "border-accent bg-accent/10 text-text-primary"
                    : "border-border-subtle bg-background text-text-secondary hover:text-text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Readout of what is spotlighted, or a hint when nothing is */}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 md:bottom-auto md:left-auto md:right-4 md:top-4 md:w-[min(300px,40%)]">
            {focusCat && focusCat !== "core" ? (
              <div className="rounded-xl border border-accent/30 bg-surface/90 px-4 py-2.5 text-left shadow-xl backdrop-blur">
                <span className="mb-1 block font-mono text-[9px] uppercase tracking-widest text-accent">
                  {categoryName(focusCat)}
                </span>
                <span className="block font-mono text-xs font-bold leading-relaxed text-text-primary">
                  {focusNode !== null ? nodes[focusNode].name : spotlightNames.join(" · ")}
                </span>
              </div>
            ) : (
              <span className="inline-block rounded-full border border-border-subtle bg-background px-3.5 py-2 font-mono text-[9px] uppercase tracking-widest text-text-secondary">
                Hover, drag or tap a technology
              </span>
            )}
          </div>

          {/* Nodes Coordinates Plot */}
          <div className="pointer-events-none absolute inset-0 z-10 h-full w-full">
            {nodes.map((node, i) => {
              const isCore = node.category === "core";
              const inGroup = focusCat === node.category;
              const isFocus = focusNode === i;
              const dimmed = focusCat !== null && !isCore && !inGroup;

              const dot = (
                <span
                  className={`block h-2.5 w-2.5 rounded-full border-2 transition-all duration-500 ${
                    isCore
                      ? "scale-125 border-text-primary bg-accent"
                      : isFocus
                      ? "scale-150 border-accent bg-accent shadow-[0_0_14px_var(--accent)]"
                      : inGroup
                      ? "scale-110 border-accent bg-accent shadow-[0_0_10px_var(--accent)]"
                      : "border-text-secondary bg-surface group-hover:border-accent"
                  }`}
                />
              );

              const label = (
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider transition-all duration-500 ${
                    isCore
                      ? "border border-accent/20 bg-accent/10 uppercase text-accent"
                      : isFocus
                      ? "border border-accent bg-surface text-text-primary"
                      : inGroup
                      ? "border border-accent/30 bg-surface text-text-primary"
                      : "border border-transparent bg-background/60 text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {node.name}
                </span>
              );

              if (isCore) {
                return (
                  <div
                    key={node.name}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 scale-110 cursor-pointer items-center gap-2"
                    onClick={clearAll}
                  >
                    {dot}
                    {label}
                  </div>
                );
              }

              return (
                <button
                  key={node.name}
                  type="button"
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  aria-pressed={lockedNode === i}
                  aria-label={`${node.name}, ${categoryName(node.category)}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onPointerDown={grab(i)}
                  onPointerUp={release}
                  onPointerCancel={release}
                  onMouseEnter={() => setHoverNode(i)}
                  onMouseLeave={() => setHoverNode(null)}
                  onFocus={() => setHoverNode(i)}
                  onBlur={() => setHoverNode(null)}
                  onClick={() => toggleNode(i)}
                  className={`group pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none items-center gap-2 rounded-full transition-opacity duration-500 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:cursor-grabbing ${
                    dimmed ? "opacity-30" : "opacity-100"
                  }`}
                >
                  {dot}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
};
