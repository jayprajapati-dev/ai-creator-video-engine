/**
 * CTRL_WALA — CommentCtaBanner Component
 *
 * Animated call-to-action banner that pulsates and spring-entrances from bottom.
 * Used for comment-driven engagement: "Comment PROMPT to get this system prompt".
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";
import { slideInFromBottom, pulsate } from "../designSystem";

type Accent = "cyan" | "violet" | "emerald" | "amber";

type CommentCtaBannerProps = {
  keyword: string;
  instruction: string;
  accent?: Accent;
  startFrame: number;
};

type AccentTokens = {
  color: string;
  glow: string;
  glowStrong: string;
  dim: string;
};

const getAccentTokens = (accent: Accent): AccentTokens => {
  switch (accent) {
    case "violet":  return { color: COLORS.violet.pure, glow: COLORS.violet.glow, glowStrong: COLORS.violet.glowStrong, dim: COLORS.violet.dim };
    case "emerald": return { color: COLORS.emerald.pure, glow: COLORS.emerald.glow, glowStrong: COLORS.emerald.glowStrong, dim: COLORS.emerald.dim };
    case "amber":   return { color: COLORS.amber.pure, glow: COLORS.amber.glow, glowStrong: COLORS.amber.glowStrong, dim: COLORS.amber.dim };
    case "cyan":
    default:        return { color: COLORS.cyan.pure, glow: COLORS.cyan.glow, glowStrong: COLORS.cyan.glowStrong, dim: COLORS.cyan.dim };
  }
};

export const CommentCtaBanner: React.FC<CommentCtaBannerProps> = ({
  keyword,
  instruction,
  accent = "cyan",
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = slideInFromBottom(frame, fps, startFrame, 80);
  const scale = pulsate(frame - startFrame, 0.025, 50);
  const tokens = getAccentTokens(accent);

  return (
    <div
      style={{
        transform: `translateY(${entrance.translateY}px) scale(${scale})`,
        opacity: entrance.opacity,
        width: "100%",
      }}
    >
      <div
        style={{
          background: COLORS.bg.surfaceHigh,
          border: `2px solid ${tokens.color}`,
          borderRadius: RADIUS.xl,
          padding: `${SPACING[4]}px ${SPACING[5]}px`,
          display: "flex",
          alignItems: "center",
          gap: SPACING[4],
          boxShadow: `0 0 32px ${tokens.glowStrong}, 0 8px 24px rgba(0,0,0,0.6)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${tokens.glow} 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Comment icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke={tokens.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              fontSize: FONT_SIZE.xs,
              color: COLORS.text.secondary,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: FONTS.code,
            }}
          >
            Comment करो 👇
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING[3], flexWrap: "wrap" }}>
            {/* Keyword badge */}
            <div
              style={{
                background: tokens.color,
                color: "#000",
                fontFamily: FONTS.code,
                fontSize: FONT_SIZE.base,
                fontWeight: 800,
                padding: `${SPACING[1]}px ${SPACING[3]}px`,
                borderRadius: RADIUS.md,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                boxShadow: `0 0 16px ${tokens.glowStrong}`,
              }}
            >
              {keyword}
            </div>
            {/* Instruction */}
            <span
              style={{
                fontSize: FONT_SIZE.sm,
                color: COLORS.text.secondary,
                fontFamily: FONTS.body,
              }}
            >
              {instruction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
