/**
 * CTRL_WALA Numbered Tip Card Component
 * High-impact numbered card for tutorial/hack reels (01, 02, 03)
 * with animated entrance, code snippet, and action pill.
 */

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";

interface NumberedTipCardProps {
  number: string; // "01", "02", "03"
  title: string;
  tagline: string;
  codeSnippet: string;
  takeaway: string;
  accent?: "cyan" | "violet" | "emerald" | "amber";
  startFrame?: number;
}

export const NumberedTipCard: React.FC<NumberedTipCardProps> = ({
  number,
  title,
  tagline,
  codeSnippet,
  takeaway,
  accent = "violet",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);
  const anim = spring({
    frame: relFrame,
    fps,
    config: { stiffness: 180, damping: 16 },
  });

  const accentColor =
    accent === "cyan"
      ? COLORS.cyan.pure
      : accent === "emerald"
      ? COLORS.emerald.pure
      : accent === "amber"
      ? COLORS.amber.pure
      : COLORS.violet.pure;

  const glowShadow =
    accent === "cyan"
      ? COLORS.cyan.glowStrong
      : accent === "emerald"
      ? COLORS.emerald.glowStrong
      : accent === "amber"
      ? COLORS.amber.glowStrong
      : COLORS.violet.glowStrong;

  return (
    <div
      style={{
        width: "100%",
        background: COLORS.bg.surfaceHigh,
        border: `2px solid ${accentColor}`,
        borderRadius: RADIUS.xl,
        padding: `${SPACING[5]}px ${SPACING[5]}px`,
        display: "flex",
        flexDirection: "column",
        gap: SPACING[3],
        boxShadow: `0 0 35px ${glowShadow}, 0 10px 40px rgba(0,0,0,0.7)`,
        fontFamily: FONTS.body,
        transform: `scale(${anim})`,
        opacity: Math.min(1, anim),
      }}
    >
      {/* Top Bar with Number Badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: RADIUS.md,
              backgroundColor: accentColor,
              color: "#000",
              fontWeight: 900,
              fontSize: 22,
              fontFamily: FONTS.code,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 15px ${accentColor}`,
            }}
          >
            {number}
          </div>
          <div>
            <div style={{ fontSize: FONT_SIZE.base, fontWeight: 800, color: COLORS.text.primary }}>
              {title}
            </div>
            <div style={{ fontSize: 13, color: COLORS.text.secondary }}>{tagline}</div>
          </div>
        </div>

        <div
          style={{
            fontSize: 11,
            color: accentColor,
            fontFamily: FONTS.code,
            border: `1px solid ${accentColor}`,
            padding: "4px 10px",
            borderRadius: RADIUS.full,
          }}
        >
          COPY READY
        </div>
      </div>

      {/* Code Snippet Box */}
      <div
        style={{
          background: COLORS.bg.deep,
          borderRadius: RADIUS.lg,
          border: `1px solid ${COLORS.bg.surfaceBorder}`,
          padding: SPACING[4],
          fontFamily: FONTS.code,
          fontSize: 13,
          color: COLORS.emerald.pure,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 10,
            fontSize: 10,
            color: COLORS.text.tertiary,
          }}
        >
          PROMPT
        </div>
        {codeSnippet}
      </div>

      {/* Takeaway / Impact Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(255,255,255,0.04)",
          borderRadius: RADIUS.md,
          padding: "8px 12px",
        }}
      >
        <span style={{ fontSize: 16 }}>⚡</span>
        <span style={{ fontSize: 13, color: COLORS.text.secondary, fontWeight: 600 }}>
          {takeaway}
        </span>
      </div>
    </div>
  );
};

