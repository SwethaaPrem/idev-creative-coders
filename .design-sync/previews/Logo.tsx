import { Logo } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** The full lockup: hexagon mark in the accent colour, iDev wordmark, CREATIVE CODERS subtitle. */
export const Lockup = () => (
  <Stage>
    <Logo />
  </Stage>
);

/** Mark only, for tight spaces. */
export const IconOnly = () => (
  <Stage>
    <Logo iconOnly />
  </Stage>
);
