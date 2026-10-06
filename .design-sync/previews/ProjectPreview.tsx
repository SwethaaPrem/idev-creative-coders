import { ProjectPreview } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** ProjectPreview fills its parent, so each story gives it a rounded, sized, clipped frame. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <Stage>
    <div
      style={{
        position: "relative",
        height: 340,
        borderRadius: 32,
        overflow: "hidden",
        border: "1px solid var(--glass-border)",
      }}
    >
      {children}
    </div>
  </Stage>
);

/** Billing platform: payment card in a floating window. */
export const Billing = () => (
  <Frame>
    <ProjectPreview id="ss-agencies" />
  </Frame>
);

/** Computer-vision dashboard: lane with detected vehicles. */
export const TrafficDetection = () => (
  <Frame>
    <ProjectPreview id="smart-traffic" />
  </Frame>
);

/** Developer platform: deploy terminal. */
export const DeployTerminal = () => (
  <Frame>
    <ProjectPreview id="internal-developer-platform" />
  </Frame>
);

/** IoT monitoring: sensor waveform. */
export const SensorWaveform = () => (
  <Frame>
    <ProjectPreview id="iot-monitoring" />
  </Frame>
);
