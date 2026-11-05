import React from "react";
import { spring, useVideoConfig } from "remotion";
import { HindiCaptionChunk } from "./episodeConfig";
import { HINDI_DESIGN } from "./designSystem";

interface HindiCaptionsProps {
  captions: HindiCaptionChunk[];
  sceneFrame: number; // frame relative to composition start (absolute)
}

export const HindiCaptions: React.FC<HindiCaptionsProps> = ({
  captions,
  sceneFrame,
}) => {
  const { fps } = useVideoConfig();

  const activeCue = captions.find(
    (c) => sceneFrame >= c.startFrame && sceneFrame < c.startFrame + c.durationFrames
  );

  if (!activeCue) return null;

  const frameInCue = sceneFrame - activeCue.startFrame;

  const entrance = spring({
    frame: frameInCue,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  // Exit fade in last 8 frames
  const exitFade = frameInCue > activeCue.durationFrames - 8
    ? Math.max(0, 1 - (frameInCue - (activeCue.durationFrames - 8)) / 8)
    : 1;

  const hindiWords = activeCue.hindi.split(" ");

  const getWordColor = (word: string): string => {
    const clean = word.replace(/[।"",?!]/g, "").trim();
    const isHL = activeCue.highlightWords?.some(
      (hw) => hw.toLowerCase() === clean.toLowerCase()
    );
    if (!isHL) return HINDI_DESIGN.colors.text;
    switch (activeCue.highlightColor) {
      case "red": return "#FF334B";
      case "cyan": return "#00D4D4";
      case "gold": return "#F59E0B";
      default: return "#FFFFFF";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: HINDI_DESIGN.captionBottom,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
        zIndex: 60,
        opacity: exitFade,
      }}
    >
      {/* ── Hindi primary caption ──────────────────────────────────── */}
      <div
        style={{
          transform: `scale(${entrance}) translateY(${(1 - entrance) * 20}px)`,
          transformOrigin: "center bottom",
          backgroundColor: "rgba(5, 8, 15, 0.88)",
          padding: "14px 32px",
          borderRadius: 24,
          border: "2px solid rgba(0, 212, 212, 0.25)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(0,212,212,0.08)",
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: HINDI_DESIGN.captionMaxWidth,
        }}
      >
        {hindiWords.map((w, idx) => (
          <span
            key={idx}
            style={{
              fontFamily: HINDI_DESIGN.fonts.hindi,
              fontSize: 52,
              fontWeight: 800,
              color: getWordColor(w),
              textShadow:
                getWordColor(w) !== HINDI_DESIGN.colors.text
                  ? `0 0 20px ${getWordColor(w)}88`
                  : "none",
              letterSpacing: 0,
              lineHeight: 1.2,
            }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* ── English subtitle (smaller, dimmer) ───────────────────── */}
      {activeCue.english && (
        <div
          style={{
            transform: `scale(${entrance})`,
            transformOrigin: "center top",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "6px 20px",
            borderRadius: 14,
            maxWidth: 880,
          }}
        >
          <span
            style={{
              fontFamily: HINDI_DESIGN.fonts.english,
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: 0.3,
              fontStyle: "italic",
            }}
          >
            {activeCue.english}
          </span>
        </div>
      )}
    </div>
  );
};

