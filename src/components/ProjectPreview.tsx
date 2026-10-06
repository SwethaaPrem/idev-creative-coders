import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { envClass } from "../lib/projectEnv";

interface ProjectPreviewProps {
  id: string;
  /** Extra classes for the layer that positions the product window, e.g. bottom padding to clear an overlapping panel. */
  className?: string;
  /** Where the product window sits on the poster. */
  anchor?: "left" | "center" | "right";
  valign?: "center" | "end";
  /** Show the outlined project number behind the window. */
  ghost?: boolean;
}

/* ------------------------------------------------------------------ */
/* Product window (the existing mock UI, set large inside the poster)  */
/* ------------------------------------------------------------------ */

const lineColor = "color-mix(in srgb, var(--p-win-fg) 14%, transparent)";
const barColor = "color-mix(in srgb, var(--p-win-fg) 16%, transparent)";
const labelFill = "color-mix(in srgb, var(--p-win-label) 22%, transparent)";

const ProductWindow: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="relative w-[min(100%,38rem)]">
    {/* Offset pane behind the window, for a layered-interface feel */}
    <div
      className="pointer-events-none absolute inset-0 translate-x-[4%] translate-y-[7%] rounded-[1.5rem] border"
      style={{
        borderColor: "color-mix(in srgb, var(--p-fg) 24%, transparent)",
        background: "color-mix(in srgb, var(--p-win) 35%, transparent)",
      }}
    />
    <div className="relative flex min-h-[15rem] flex-col justify-between gap-4 rounded-[1.5rem] bg-[var(--p-win)] p-5 text-[var(--p-win-fg)] shadow-[0_44px_70px_-36px_rgba(0,0,0,0.55)] sm:min-h-[19rem] sm:p-7">
      {children}
    </div>
  </div>
);

const MockHeader: React.FC<{ label: string; badge: string }> = ({ label, badge }) => (
  <div className="flex items-start justify-between gap-3">
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.04em] text-[var(--p-win-label)] sm:text-[11px]">
      {label}
    </span>
    <span
      className="whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-bold text-[var(--p-win-label)]"
      style={{ background: labelFill }}
    >
      {badge}
    </span>
  </div>
);

const MockFooter: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <div
    className="flex justify-between gap-3 border-t pt-3 font-mono text-[10px] text-[var(--p-win-muted)] sm:text-[11px]"
    style={{ borderColor: lineColor }}
  >
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const metricValue = (project: Project | undefined, label: string): string =>
  project?.metrics?.find((m) => m.label === label)?.value ?? "";

const WindowContent: React.FC<{ id: string; project?: Project }> = ({ id, project }) => {
  switch (id) {
    case "smart-traffic":
      return (
        <>
          <MockHeader label="DETECTING: VEHICLE" badge="LIVE FEEDS" />
          {/* SVG traffic simulation mockup */}
          <svg viewBox="0 0 200 80" className="my-1 h-auto w-full">
            <line x1="10" y1="40" x2="190" y2="40" strokeWidth="2.5" strokeDasharray="4 4" style={{ stroke: "var(--p-win-muted)" }} />
            <rect x="24" y="22" width="34" height="28" rx="3" strokeWidth="1" strokeDasharray="3 2" fill="none" style={{ stroke: "var(--p-win-label)" }} />
            <rect x="30" y="30" width="20" height="12" rx="3" strokeWidth="1.5" style={{ stroke: "var(--p-win-label)", fill: labelFill }} />
            <rect x="90" y="38" width="25" height="12" rx="3" strokeWidth="1.5" style={{ stroke: "var(--p-win-muted)", fill: barColor }} />
            <circle cx="160" cy="40" r="4.5" fill="#ff3b3b" className="animate-pulse" />
          </svg>
          <MockFooter left="FPS: 60" right="FLOW RATE: 24/MIN" />
        </>
      );
    case "receipt-processing":
      return (
        <>
          <MockHeader label="AWS TEXTRACT PIPELINE" badge="COMPLETED" />
          {/* Receipt schema abstract mock */}
          <div className="my-1 flex w-full flex-col gap-3">
            <div className="h-3 w-1/3 rounded-full" style={{ background: "var(--p-win-label)" }} />
            <div className="h-2.5 w-full rounded-full" style={{ background: barColor }} />
            <div className="h-2.5 w-5/6 rounded-full" style={{ background: barColor }} />
            <div className="h-2.5 w-4/5 rounded-full" style={{ background: barColor }} />
            <div className="mt-2 h-4 w-1/4 self-end rounded-full" style={{ background: "var(--p-win-label)" }} />
          </div>
          <MockFooter left="MATCHING: 99.1%" right="STATUS: JSON_OK" />
        </>
      );
    case "internal-developer-platform":
      return (
        <>
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: lineColor }}>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: barColor }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: barColor }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: barColor }} />
            </div>
            <span className="font-mono text-[11px] font-bold text-[var(--p-win-label)]">dev-portal-v2</span>
          </div>
          <div className="my-1 flex flex-col gap-2 text-left font-mono text-[11px] sm:text-xs">
            <span>$ npm run deploy --prod</span>
            <span className="font-bold text-[var(--p-win-label)]">&gt; Building container layers... [Done]</span>
            <span className="text-[var(--p-win-muted)]">&gt; Injecting variables... [Ok]</span>
            <span className="font-bold text-[var(--p-win-label)]">&gt; Routing active SSL...</span>
          </div>
          <MockFooter left="DOCKER STATUS: UP" right="CPU: 4.8%" />
        </>
      );
    case "iot-monitoring":
      return (
        <>
          <MockHeader label="SENSOR: ESP32_GRID_04" badge="CONNECTED" />
          {/* Waveform mock */}
          <svg viewBox="0 0 200 60" className="my-1 h-auto w-full">
            <path
              d="M 0,30 Q 15,10 30,30 T 60,30 T 90,30 T 120,45 T 150,15 T 180,30 T 200,30"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ stroke: "var(--p-win-label)" }}
            />
          </svg>
          <MockFooter left="TEMP: 42.5°C" right="VIB: NORMAL" />
        </>
      );
    case "ss-agencies":
      return (
        <>
          <MockHeader label="BILLING APPLICATION" badge="PRODUCTION LIVE" />
          {/* Abstract payment card */}
          <div
            className="flex h-32 w-60 max-w-full flex-col justify-between self-center rounded-2xl border p-4 text-left sm:h-36 sm:w-72"
            style={{ borderColor: lineColor, background: "color-mix(in srgb, var(--p-win-fg) 6%, transparent)" }}
          >
            <div className="flex items-start justify-between">
              <div className="h-6 w-8 rounded" style={{ background: "var(--p-win-label)" }} />
              <span className="font-mono text-[8px] font-bold text-[var(--p-win-label)]">SS PLATFORM</span>
            </div>
            <div className="font-mono text-sm tracking-[0.1em]">•••• •••• •••• 8840</div>
            <div className="flex justify-between font-mono text-[8px] text-[var(--p-win-muted)]">
              <span>VAL: 12/28</span>
              <span>PCI SECURE</span>
            </div>
          </div>
          <MockFooter left="VOL: ₹12.4Cr" right="LATENCY: 120MS" />
        </>
      );
    case "fintech-startup": {
      // Built only from this project's own data (category + metrics)
      const lastCategory = project?.category.split("/").pop()?.trim().toUpperCase() ?? "";
      return (
        <>
          <MockHeader label={lastCategory} badge={metricValue(project, "Current Phase").toUpperCase()} />
          {/* Ledger rows: debit / credit bars */}
          <div className="my-1 flex w-full flex-col gap-3">
            {[
              ["w-3/5", "w-1/6", false],
              ["w-2/5", "w-1/4", true],
              ["w-4/5", "w-1/6", false],
              ["w-1/2", "w-1/5", true],
            ].map(([left, right, credit], i) => (
              <div key={i} className="flex items-center justify-between gap-6">
                <div className={`h-2.5 rounded-full ${left as string}`} style={{ background: barColor }} />
                <div
                  className={`h-3 rounded-full ${right as string}`}
                  style={{ background: credit ? "var(--p-win-label)" : barColor }}
                />
              </div>
            ))}
          </div>
          <MockFooter
            left={`LEDGER SPEED: ${metricValue(project, "Ledger Speed").toUpperCase()}`}
            right={metricValue(project, "Security Scale").toUpperCase()}
          />
        </>
      );
    }
    case "direct-market-access":
    default:
      return (
        <>
          <MockHeader label="PROGRESSIVE WEB APP" badge="OFFLINE ENABLED" />
          {/* Agriculture market layout abstract */}
          <div className="my-1 grid w-full grid-cols-2 gap-3">
            {[true, false].map((lit) => (
              <div
                key={String(lit)}
                className="flex flex-col gap-2 rounded-xl border p-3"
                style={{ borderColor: lineColor }}
              >
                <div className="h-7 w-7 rounded-lg" style={{ background: lit ? labelFill : barColor }} />
                <div className="h-1.5 w-4/5 rounded-full" style={{ background: barColor }} />
                <div className="h-2.5 w-1/2 rounded-full" style={{ background: lit ? "var(--p-win-label)" : barColor }} />
              </div>
            ))}
          </div>
          <MockFooter left="LATENCY: 85MS" right="SYNC: OK" />
        </>
      );
  }
};

/* ------------------------------------------------------------------ */
/* Poster decoration: geometric colour blocks unique to each project   */
/* ------------------------------------------------------------------ */

const Decor: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case "ss-agencies":
      return (
        <>
          <div className="absolute -right-[8cqw] -top-[14cqw] h-[48cqw] w-[48cqw] rounded-full bg-[var(--p-acc)]" />
          <div className="absolute left-[66cqw] top-[18cqw] h-[7cqw] w-[7cqw] rounded-full border-2 border-[var(--p-bg)]" />
        </>
      );
    case "fintech-startup":
      return (
        <>
          <div className="absolute -bottom-[20cqw] -left-[16cqw] h-[52cqw] w-[52cqw] rounded-full bg-[var(--p-acc)]" />
          <div className="absolute right-[6cqw] top-[8cqw] h-[6cqw] w-[24cqw] rounded-full bg-[var(--p-acc2)]" />
        </>
      );
    case "smart-traffic":
      return (
        <>
          <div className="absolute right-[5cqw] top-[7cqw] h-[34cqw] w-[34cqw] rotate-12 rounded-[5cqw] bg-[var(--p-acc)]" />
          <div className="absolute -left-[4cqw] bottom-[12cqw] h-[3.5cqw] w-[38cqw] -rotate-3 bg-[var(--p-acc2)]" />
          <div className="absolute inset-x-0 bottom-[6cqw] border-t-4 border-dashed border-[color-mix(in_srgb,var(--p-fg)_22%,transparent)]" />
        </>
      );
    case "receipt-processing":
      return (
        <>
          <div className="absolute left-[6cqw] top-[7cqw] h-[34cqw] w-[26cqw] -rotate-6 rounded-[2cqw] bg-[var(--p-acc2)]" />
          <div className="absolute bottom-[7cqw] right-[6cqw] h-[8cqw] w-[30cqw] rounded-full bg-[var(--p-fg)]" />
        </>
      );
    case "internal-developer-platform":
      return (
        <>
          <div className="absolute bottom-[7cqw] left-[6cqw] h-[22cqw] w-[22cqw] rotate-[14deg] rounded-[3cqw] bg-[var(--p-acc)]" />
          <div className="absolute right-[6cqw] top-[7cqw] h-[26cqw] w-[26cqw] rounded-full border-2 border-[color-mix(in_srgb,var(--p-fg)_45%,transparent)]" />
        </>
      );
    case "iot-monitoring":
      return (
        <div className="absolute -right-[12cqw] top-1/2 -translate-y-1/2">
          {[64, 46, 28].map((size, i) => (
            <div
              key={size}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: `${size}cqw`,
                height: `${size}cqw`,
                borderColor: `color-mix(in srgb, var(--p-acc) ${[45, 30, 20][i]}%, transparent)`,
              }}
            />
          ))}
          <div className="absolute h-[3cqw] w-[3cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--p-acc)]" />
        </div>
      );
    case "direct-market-access":
    default:
      return (
        <>
          <div className="absolute -bottom-[30cqw] left-1/2 h-[64cqw] w-[64cqw] -translate-x-1/2 rounded-full bg-[var(--p-acc)]" />
          <div className="absolute right-[7cqw] top-[8cqw] h-[10cqw] w-[10cqw] rounded-full bg-[var(--p-acc2)]" />
        </>
      );
  }
};

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, color-mix(in srgb, var(--p-fg) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--p-fg) 8%, transparent) 1px, transparent 1px)",
  backgroundSize: "4rem 4rem",
};

const anchorClass = { left: "justify-start", center: "justify-center", right: "justify-end" } as const;

/**
 * A project "poster": a colour-blocked environment with decorative geometry and
 * the project's product window floating on it. Stands in for a screenshot, since
 * the repository has no project imagery.
 */
export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  id,
  className = "",
  anchor = "center",
  valign = "center",
  ghost = true,
}) => {
  const project = projects.find((p) => p.id === id);

  return (
    <div
      className={`${envClass(id)} absolute inset-0 select-none overflow-hidden bg-[var(--p-bg)] text-[var(--p-fg)] [container-type:inline-size]`}
    >
      <div className="absolute inset-0 opacity-90" style={gridStyle} />
      <Decor id={id} />
      {ghost && project && (
        <span
          className="ghost-numeral absolute -bottom-[3cqw] left-[1cqw] text-[27cqw]"
          style={{ WebkitTextStroke: "1.5px color-mix(in srgb, var(--p-fg) 30%, transparent)" }}
        >
          {project.number}
        </span>
      )}
      <div
        className={`absolute inset-0 flex p-[6cqw] ${valign === "end" ? "items-end" : "items-center"} ${anchorClass[anchor]} ${className}`}
      >
        <ProductWindow>
          <WindowContent id={id} project={project} />
        </ProductWindow>
      </div>
    </div>
  );
};
