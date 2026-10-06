import { ImageFrame, ProjectPreview } from "idev-creative-coders";
import { Stage } from "../preview-kit";

/** A project visual in the large rounded frame. */
export const ProjectVisual = () => (
  <Stage>
    <ImageFrame className="aspect-[4/3] sm:aspect-[16/9]" parallax={false}>
      <ProjectPreview id="receipt-processing" />
    </ImageFrame>
  </Stage>
);

/** Static overlay: a caption that stays put while the media layer scales and drifts behind it. */
export const WithOverlay = () => (
  <Stage>
    <ImageFrame
      className="aspect-[4/3] sm:aspect-[16/10]"
      parallax={false}
      overlay={
        <div style={{ position: "absolute", left: 0, bottom: 0, padding: 28 }}>
          <span className="eyebrow">AI / AWS / AUTOMATION</span>
        </div>
      }
    >
      <ProjectPreview id="iot-monitoring" />
    </ImageFrame>
  </Stage>
);

/** Portrait aspect, the mobile composition: the same visual in a tall frame. */
export const Portrait = () => (
  <Stage width={380}>
    <ImageFrame className="aspect-[4/5]" parallax={false}>
      <ProjectPreview id="ss-agencies" />
    </ImageFrame>
  </Stage>
);
