import React from "react";
import { useCurrentFrame } from "remotion";

interface EditorialOverlayProps {
  seriesTitle?: string;
  episodeNumber?: number;
  sceneTitle?: string;
  timecode?: string;
  isDark?: boolean;
}

export const EditorialOverlay: React.FC<EditorialOverlayProps> = ({
  seriesTitle = "NIGHT STORIES",
  episodeNumber = 1,
  sceneTitle = "THE LOCKDOWN",
  timecode = "21:00:00",
  isDark = false,
}) => {
  const frame = useCurrentFrame();

  // Blinking REC dot
  const isRecBlink = frame % 30 < 15;

  const textColor = isDark ? "#FFFFFF" : "#111111";
  const subColor = isDark ? "#94A3B8" : "#64748B";
  const borderColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        fontFamily: "'Courier New', Courier, monospace, sans-serif",
      }}
    >
      {/* Editorial Corner Crop Marks */}
      {/* Top Left */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 30,
          height: 30,
          borderTop: `3px solid ${borderColor}`,
          borderLeft: `3px solid ${borderColor}`,
        }}
      />
      {/* Top Right */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          width: 30,
          height: 30,
          borderTop: `3px solid ${borderColor}`,
          borderRight: `3px solid ${borderColor}`,
        }}
      />
      {/* Bottom Left */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          width: 30,
          height: 30,
          borderBottom: `3px solid ${borderColor}`,
          borderLeft: `3px solid ${borderColor}`,
        }}
      />
      {/* Bottom Right */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 30,
          height: 30,
          borderBottom: `3px solid ${borderColor}`,
          borderRight: `3px solid ${borderColor}`,
        }}
      />

      {/* TOP HEADER BAR */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        {/* Series & Episode */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              backgroundColor: "#E63946",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 3,
            }}
          >
            EP.{String(episodeNumber).padStart(2, "0")}
          </span>
          <span style={{ color: textColor }}>{seriesTitle}</span>
        </div>

        {/* Live Surveillance Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: isRecBlink ? "#E63946" : "transparent",
            }}
          />
          <span style={{ color: subColor, fontSize: 16 }}>{timecode}</span>
        </div>
      </div>

      {/* SCENE BADGE */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: isDark ? "#FFD166" : "#E76F51",
            border: `1.5px solid ${isDark ? "#FFD166" : "#E76F51"}`,
            padding: "3px 10px",
            borderRadius: 20,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          {sceneTitle}
        </div>
      </div>
    </div>
  );
};

