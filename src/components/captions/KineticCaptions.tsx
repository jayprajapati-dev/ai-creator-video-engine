import React from "react";
import { spring, useVideoConfig } from "remotion";
import { CaptionChunk } from "../../types/story";

interface KineticCaptionsProps {
  captions: CaptionChunk[];
  sceneFrame: number;
}

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({
  captions,
  sceneFrame,
}) => {
  const { fps } = useVideoConfig();

  // Find the currently active caption
  const activeCue = captions.find(
    (c) =>
      sceneFrame >= c.startFrame &&
      sceneFrame < c.startFrame + c.durationFrames
  );

  if (!activeCue) return null;

  const frameInCue = sceneFrame - activeCue.startFrame;

  // Kinetic spring pop on new phrase
  const scale = spring({
    frame: frameInCue,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const words = activeCue.text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        bottom: 220,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 55,
      }}
    >
      <div
        style={{
          transformOrigin: "center center",
          transform: `scale(${scale})`,
          backgroundColor: "rgba(17, 17, 17, 0.92)",
          padding: "16px 36px",
          borderRadius: 28,
          border: "3px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(230,57,70,0.3)",
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 960,
        }}
      >
        {words.map((w, idx) => {
          // Check if word or cleaned word is in highlight list
          const cleanW = w.replace(/[^a-zA-Z0-9%]/g, "").toUpperCase();
          const isHighlighted = activeCue.highlightWords?.some(
            (hw) => hw.toUpperCase() === cleanW
          );

          let color = "#FFFFFF";
          let fontStyle = "normal";
          let textShadow = "none";

          if (isHighlighted) {
            if (activeCue.highlightColor === "red") {
              color = "#FF334B";
              fontStyle = "italic";
              textShadow = "0 0 25px rgba(255, 51, 75, 0.8)";
            } else if (activeCue.highlightColor === "yellow") {
              color = "#FFD166";
              fontStyle = "italic";
              textShadow = "0 0 25px rgba(255, 209, 102, 0.8)";
            }
          }

          return (
            <span
              key={idx}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 54,
                fontWeight: 900,
                color,
                fontStyle,
                letterSpacing: -1,
                textTransform: "uppercase",
                textShadow,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
