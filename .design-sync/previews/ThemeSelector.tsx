import * as React from "react";
import { ThemeSelector } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** Closed: the round icon button shows the active mode. */
export const Closed = () => (
  <Stage>
    <ThemeSelector />
  </Stage>
);

/** Open: Light / Dark / System menu (opened programmatically so it renders statically). */
export const MenuOpen = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    ref.current?.querySelector("button")?.click();
  }, []);
  return (
    <Stage>
      <div ref={ref} style={{ minHeight: 190, paddingLeft: 120 }}>
        <ThemeSelector />
      </div>
    </Stage>
  );
};
