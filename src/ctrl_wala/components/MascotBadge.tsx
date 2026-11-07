/**
 * CTRL_WALA Mascot Badge — Version 2.0
 * Features:
 *  - Animated breathing float + neon cyber orbit
 *  - Live audio spectrum equalizer bars
 *  - High-impact creator commentary speech card with glassmorphism
 */

import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";

interface MascotBadgeProps {
  size?: number;
  speechText?: string;
  isSpeaking?: boolean;
  accent?: "cyan" | "violet" | "emerald" | "amber";
}

export const MascotBadge: React.FC<MascotBadgeProps> = ({
  size = 190,
  speechText,
  isSpeaking = true,
  accent = "violet",
}) => {
  const frame = useCurrentFrame();

  // Natural breathing float
  const floatY = Math.sin((frame / 22) * Math.PI) * 7;
  const pulseScale = 1 + Math.sin((frame / 28) * Math.PI) * 0.025;
  const ringRotation = (frame * 1.5) % 360;

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
        display: "flex",
        alignItems: "center",
        gap: SPACING[5],
        transform: `translateY(${floatY}px) scale(${pulseScale})`,
      }}
    >
      {/* Outer Glow & Mascot Circle */}
      <div style={{ position: "relative", width: size + 20, height: size + 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Animated Cyber Ring Orbit */}
        <div
          style={{
            position: "absolute",
            width: size + 16,
            height: size + 16,
            borderRadius: "50%",
            border: `2px dashed ${accentColor}`,
            boxShadow: `0 0 25px ${glowShadow}`,
            transform: `rotate(${ringRotation}deg)`,
            opacity: 0.8,
          }}
        />

        {/* Mascot Circular Emblem */}
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: `3.5px solid ${accentColor}`,
            boxShadow: `0 0 40px ${glowShadow}, inset 0 0 25px ${glowShadow}`,
            backgroundColor: "#070B16",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile("ctrl_wala/logo.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          {/* Speaking Equalizer Waveform Overlay */}
          {isSpeaking && (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 4,
                zIndex: 10,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const h = interpolate(
                  Math.sin((frame * 0.4 + i * 1.1) * Math.PI),
                  [-1, 1],
                  [5, 20]
                );
                return (
                  <div
                    key={i}
                    style={{
                      width: 3.5,
                      height: h,
                      backgroundColor: accentColor,
                      borderRadius: 3,
                      boxShadow: `0 0 8px ${accentColor}`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Creator Commentary Speech Bubble */}
      {speechText && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(21, 31, 50, 0.95) 0%, rgba(14, 22, 38, 0.95) 100%)",
            backdropFilter: "blur(16px)",
            border: `1.5px solid ${accentColor}`,
            borderRadius: RADIUS.xl,
            padding: `${SPACING[4]}px ${SPACING[5]}px`,
            maxWidth: 580,
            boxShadow: `0 10px 35px rgba(0,0,0,0.7), 0 0 20px ${accentColor}33`,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.emerald.pure, boxShadow: `0 0 8px ${COLORS.emerald.pure}` }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: accentColor,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: FONTS.code,
              }}
            >
              CTRL_WALA INSIGHT
            </span>
          </div>

          <div
            style={{
              fontSize: FONT_SIZE.base,
              color: "#FFFFFF",
              fontFamily: FONTS.body,
              fontWeight: 700,
              lineHeight: 1.35,
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {speechText}
          </div>
        </div>
      )}
    </div>
  );
};
