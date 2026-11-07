/**
 * CTRL_WALA Split Comparison Component
 * Compares two models/technologies side-by-side or stacked
 * with live metric bars, price difference badge, and laser divider.
 */

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";

export interface SplitItem {
  name: string;
  badge: string;
  badgeColor: string;
  pricePerMillion: string;
  speed: string;
  openSource: boolean;
  highlight?: boolean;
}

interface SplitComparisonProps {
  left: SplitItem;
  right: SplitItem;
  metricLabel?: string;
  savingBadge?: string;
  startFrame?: number;
}

export const SplitComparison: React.FC<SplitComparisonProps> = ({
  left,
  right,
  metricLabel = "Price Per 1M Tokens (Blend)",
  savingBadge = "95% CHEAPER",
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

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: SPACING[4],
        fontFamily: FONTS.body,
        transform: `scale(${anim})`,
        opacity: Math.min(1, anim),
      }}
    >
      {/* Metric Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: `0 ${SPACING[2]}px`,
        }}
      >
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            fontFamily: FONTS.code,
            color: COLORS.text.secondary,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {metricLabel}
        </span>
        <div
          style={{
            background: COLORS.emerald.pure,
            color: "#000",
            fontWeight: 900,
            fontSize: FONT_SIZE.xs,
            padding: "4px 12px",
            borderRadius: RADIUS.full,
            boxShadow: `0 0 16px ${COLORS.emerald.glowStrong}`,
          }}
        >
          {savingBadge}
        </div>
      </div>

      {/* Comparison Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: SPACING[4],
          position: "relative",
        }}
      >
        {/* Left Card (e.g. OpenAI GPT-4o) */}
        <div
          style={{
            background: COLORS.bg.surfaceHigh,
            border: `1px solid ${COLORS.bg.surfaceBorder}`,
            borderRadius: RADIUS.xl,
            padding: `${SPACING[5]}px ${SPACING[4]}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: RADIUS.sm,
              background: "rgba(255,255,255,0.08)",
              color: left.badgeColor,
              marginBottom: 12,
            }}
          >
            {left.badge}
          </div>
          <div
            style={{
              fontSize: FONT_SIZE.base,
              fontWeight: 800,
              color: COLORS.text.primary,
              marginBottom: 12,
            }}
          >
            {left.name}
          </div>
          <div
            style={{
              fontSize: FONT_SIZE["2xl"],
              fontWeight: 900,
              color: COLORS.text.secondary,
              fontFamily: FONTS.code,
              textDecoration: "line-through",
              opacity: 0.7,
              marginBottom: 8,
            }}
          >
            {left.pricePerMillion}
          </div>
          <div style={{ fontSize: 13, color: COLORS.rose.pure, fontWeight: 700 }}>
            PROPRIETARY CLOSED
          </div>
        </div>

        {/* Right Card (e.g. DeepSeek V3) */}
        <div
          style={{
            background: "linear-gradient(180deg, #101E36 0%, #0E1626 100%)",
            border: `2px solid ${COLORS.cyan.pure}`,
            borderRadius: RADIUS.xl,
            padding: `${SPACING[5]}px ${SPACING[4]}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: `0 0 35px ${COLORS.cyan.glowStrong}, 0 8px 30px rgba(0,0,0,0.7)`,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: RADIUS.sm,
              background: COLORS.cyan.pure,
              color: "#000",
              marginBottom: 12,
              letterSpacing: "0.05em",
            }}
          >
            {right.badge}
          </div>
          <div
            style={{
              fontSize: FONT_SIZE.base,
              fontWeight: 800,
              color: COLORS.cyan.bright,
              marginBottom: 12,
            }}
          >
            {right.name}
          </div>
          <div
            style={{
              fontSize: FONT_SIZE["3xl"],
              fontWeight: 900,
              color: COLORS.emerald.pure,
              fontFamily: FONTS.code,
              textShadow: `0 0 20px ${COLORS.emerald.glowStrong}`,
              marginBottom: 8,
            }}
          >
            {right.pricePerMillion}
          </div>
          <div style={{ fontSize: 13, color: COLORS.emerald.pure, fontWeight: 800 }}>
            ✓ 100% OPEN WEIGHTS
          </div>
        </div>
      </div>
    </div>
  );
};
