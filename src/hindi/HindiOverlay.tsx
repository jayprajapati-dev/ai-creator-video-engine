import React from "react";
import { useCurrentFrame } from "remotion";
import { HINDI_DESIGN } from "./designSystem";

interface HindiOverlayProps {
  seriesTitle?: string;
  episodeNumber?: number;
  sceneTitle?: string;
  timecode?: string;
}

export const HindiOverlay: React.FC<HindiOverlayProps> = ({
  seriesTitle = "THE UNKNOWN CITY",
  episodeNumber = 1,
  sceneTitle = "HOOK",
  timecode = "12:07 AM",
}) => {
  const frame = useCurrentFrame();

  // Blinking REC dot
  const isRec = frame % 24 < 12;

  const margin = HINDI_DESIGN.safeMargin;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 55,
        fontFamily: HINDI_DESIGN.fonts.english,
      }}
    >
      {/* ── Corner crop marks ──────────────────────────────────────── */}
      {[
        { top: margin, left: margin, borderTop: true, borderLeft: true },
        { top: margin, right: margin, borderTop: true, borderRight: true },
        { bottom: margin, left: margin, borderBottom: true, borderLeft: true },
        { bottom: margin, right: margin, borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 24,
            height: 24,
            ...(pos.top !== undefined ? { top: pos.top } : {}),
            ...(pos.bottom !== undefined ? { bottom: pos.bottom } : {}),
            ...(pos.left !== undefined ? { left: pos.left } : {}),
            ...(pos.right !== undefined ? { right: pos.right } : {}),
            borderTop: pos.borderTop ? `2px solid rgba(0,212,212,0.4)` : undefined,
            borderLeft: pos.borderLeft ? `2px solid rgba(0,212,212,0.4)` : undefined,
            borderBottom: pos.borderBottom ? `2px solid rgba(0,212,212,0.4)` : undefined,
            borderRight: pos.borderRight ? `2px solid rgba(0,212,212,0.4)` : undefined,
          }}
        />
      ))}

      {/* ── Top header row ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: margin + 8,
          left: margin + 10,
          right: margin + 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Series + Episode badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              backgroundColor: HINDI_DESIGN.colors.red,
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 9px",
              borderRadius: 4,
              letterSpacing: 1,
            }}
          >
            EP.{String(episodeNumber).padStart(2, "0")}
          </div>
          <span
            style={{
              color: HINDI_DESIGN.colors.text,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {seriesTitle}
          </span>
        </div>

        {/* Timecode + REC */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: isRec ? HINDI_DESIGN.colors.red : "transparent",
            }}
          />
          <span
            style={{
              fontFamily: HINDI_DESIGN.fonts.mono,
              color: HINDI_DESIGN.colors.textDim,
              fontSize: 15,
              letterSpacing: 1,
            }}
          >
            {timecode}
          </span>
        </div>
      </div>

      {/* ── Scene badge ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: margin + 50,
          left: margin + 10,
        }}
      >
        <div
          style={{
            border: `1.5px solid ${HINDI_DESIGN.colors.cyanDim}`,
            color: HINDI_DESIGN.colors.cyan,
            fontSize: 13,
            fontWeight: 700,
            padding: "3px 12px",
            borderRadius: 20,
            letterSpacing: 2,
          }}
        >
          {sceneTitle}
        </div>
      </div>
    </div>
  );
};

