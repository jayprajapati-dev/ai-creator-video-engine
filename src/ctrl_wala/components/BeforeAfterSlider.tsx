/**
 * CTRL_WALA Before/After Transformation Component
 * Demonstrates a transformation (e.g. Prompt/Sketch -> Live React Dashboard)
 * with an animated scanline slider beam.
 */

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";

interface BeforeAfterSliderProps {
  promptText: string;
  beforeTitle?: string;
  afterTitle?: string;
  startFrame?: number;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  promptText,
  beforeTitle = "1. RAW PROMPT / SKETCH",
  afterTitle = "2. GENERATED PRODUCTION APP",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Animated slider beam moving from left (20%) to right (85%)
  const sliderPercent = interpolate(
    Math.sin((relFrame / 40) * Math.PI),
    [-1, 1],
    [30, 80]
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: SPACING[3],
        fontFamily: FONTS.body,
      }}
    >
      {/* Transformation Container */}
      <div
        style={{
          width: "100%",
          height: 380,
          background: COLORS.bg.deep,
          border: `1px solid ${COLORS.bg.surfaceBorder}`,
          borderRadius: RADIUS.xl,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
        }}
      >
        {/* Left Side: Before (Raw Wireframe / Prompt) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: SPACING[5],
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#080E1C",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: COLORS.amber.pure,
              fontFamily: FONTS.code,
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            {beforeTitle}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px dashed ${COLORS.amber.pure}`,
              borderRadius: RADIUS.md,
              padding: SPACING[4],
              fontFamily: FONTS.code,
              fontSize: FONT_SIZE.xs,
              color: COLORS.text.primary,
              lineHeight: 1.5,
            }}
          >
            "{promptText}"
          </div>
        </div>

        {/* Right Side: After (Live App Render - clipped by slider) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: SPACING[5],
            clipPath: `polygon(${sliderPercent}% 0, 100% 0, 100% 100%, ${sliderPercent}% 100%)`,
            background: "linear-gradient(135deg, #101E38 0%, #080D1A 100%)",
            borderLeft: `2px solid ${COLORS.cyan.pure}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: COLORS.emerald.pure,
              fontFamily: FONTS.code,
              letterSpacing: "0.1em",
            }}
          >
            {afterTitle}
          </div>

          {/* Reconstructed Mock Dashboard Preview */}
          <div
            style={{
              background: COLORS.bg.surfaceHigh,
              borderRadius: RADIUS.lg,
              border: `1px solid ${COLORS.cyan.muted}`,
              padding: SPACING[3],
              display: "flex",
              flexDirection: "column",
              gap: 8,
              boxShadow: `0 0 20px ${COLORS.cyan.glow}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.cyan.bright }}>
                ⚡ AnalyticsDashboard.tsx
              </div>
              <span style={{ fontSize: 11, color: COLORS.emerald.pure }}>
                ● Deployed Vercel
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {["Active Users", "Revenue", "Latency"].map((lbl, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.bg.deep,
                    padding: 8,
                    borderRadius: 6,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 10, color: COLORS.text.secondary }}>{lbl}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
                    {i === 0 ? "42.8K" : i === 1 ? "$12,490" : "18ms"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 11,
              color: COLORS.cyan.pure,
              fontFamily: FONTS.code,
            }}
          >
            ✓ Tailwind + Framer Motion + TypeScript
          </div>
        </div>

        {/* Laser Divider Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sliderPercent}%`,
            width: 3,
            backgroundColor: COLORS.cyan.pure,
            boxShadow: `0 0 15px ${COLORS.cyan.pure}, 0 0 30px ${COLORS.cyan.pure}`,
          }}
        />
      </div>
    </div>
  );
};

