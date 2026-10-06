import React from "react";

/**
 * Quiet vector backdrop for "Creative thinking × solid engineering".
 *  - a dark ground with soft, tonal contour lines (the pattern only just shows)
 *  - two overlapping cards in the corner: a cream one carrying a single pen-tool
 *    curve (creative thinking) and a lime one carrying a single </> (engineering)
 * Deliberately sparse, so the headline over the top-left does the talking.
 */

const INK = "#0b0b0d";
const CREAM = "#f4efe4";
const LIME = "#d8ff3e";
const CRIMSON = "#6f1526";

/** Flowing contour lines, generated once: a stack of gently phase-shifted waves. */
const contourPaths: string[] = Array.from({ length: 17 }, (_, i) => {
  const points: string[] = [];
  for (let x = -40; x <= 1040; x += 20) {
    const y = 44 * i - 10 + 36 * Math.sin(x / 165 + i * 0.5) + 18 * Math.sin(x / 72 + i * 1.1);
    points.push(`${x === -40 ? "M" : "L"}${x},${y.toFixed(1)}`);
  }
  return points.join(" ");
});

const round = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const ThinkingIllustration: React.FC = () => (
  <>
    {/* Tonal contour pattern, covers the whole frame */}
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 h-full w-full"
    >
      <g fill="none" stroke="#8f2a40" strokeWidth={2.2} opacity={0.3}>
        {contourPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>

    {/* Two cards, tucked into the bottom-right corner */}
    <svg
      viewBox="430 290 530 360"
      aria-hidden="true"
      focusable="false"
      className="absolute bottom-16 right-5 h-auto w-[88%] sm:right-8 sm:w-[54%] lg:bottom-8 lg:w-[48%]"
    >
      {/* dark plate behind the cream card */}
      <rect x="452" y="312" width="372" height="276" rx="28" fill="#050304" transform="rotate(3 638 450)" />

      {/* cream card: a single pen-tool curve */}
      <g transform="rotate(-4 642 452)">
        <rect x="462" y="318" width="360" height="268" rx="26" fill={CREAM} />
        {Array.from({ length: 20 }, (_, i) => (
          <line
            key={i}
            x1={494 + i * 14}
            x2={494 + i * 14}
            y1={348}
            y2={372}
            stroke={i >= 16 ? CRIMSON : INK}
            strokeOpacity={i >= 16 ? 1 : 0.14}
            strokeWidth={3.5}
            {...round}
          />
        ))}
        <path d="M 500,540 C 560,400 650,560 780,420" fill="none" stroke={CRIMSON} strokeWidth={9} {...round} />
        <g stroke={INK} strokeWidth={2.5} fill="none">
          <line x1="500" y1="540" x2="560" y2="400" />
          <line x1="780" y1="420" x2="650" y2="560" />
        </g>
        <g fill={INK}>
          <circle cx="560" cy="400" r="6" />
          <circle cx="650" cy="560" r="6" />
        </g>
        <g fill={CREAM} stroke={INK} strokeWidth={4}>
          <rect x="492" y="532" width="16" height="16" />
          <rect x="772" y="412" width="16" height="16" />
        </g>
      </g>

      {/* lime card: a single </> (tucked into the corner so the curve stays readable) */}
      <g transform="rotate(5 841 553)">
        <rect x="730" y="470" width="222" height="166" rx="24" fill={LIME} />
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={i}
            x1={758 + i * 14}
            x2={758 + i * 14}
            y1={496}
            y2={514}
            stroke={INK}
            strokeOpacity={0.12 + i * 0.07}
            strokeWidth={3.5}
            {...round}
          />
        ))}
        <g fill="none" stroke={INK} strokeWidth={12} {...round}>
          <polyline points="806,558 784,578 806,598" />
          <polyline points="876,558 898,578 876,598" />
          <line x1="852" y1="550" x2="832" y2="606" />
        </g>
      </g>
    </svg>
  </>
);
