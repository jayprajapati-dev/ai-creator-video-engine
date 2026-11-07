/**
 * CTRL_WALA — TopEpisodeBadge Component
 *
 * Faithfully reproduces the signature creator top emblem from the Techstackbro reference:
 *  - Circular avatar with dark chocolate base (#4A2E1C) and 3.5px black border
 *  - Adorable pink cartoon brain mascot with giant shiny anime eyes, blush cheeks, and smile
 *  - Overlapping cream oval pill at the bottom with bold episode number (e.g. "11", "15")
 *  - 4px retro hard shadow (0 4px 0 #18181B)
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";

interface TopEpisodeBadgeProps {
  episode?: number | string;
  delay?: number;
}

export const TopEpisodeBadge: React.FC<TopEpisodeBadgeProps> = ({
  episode = "15",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { stiffness: 240, damping: 20 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const translateY = interpolate(entrance, [0, 1], [-20, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  // Subtle breathing float
  const floatY = Math.sin((frame / 20) * Math.PI) * 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${translateY + floatY}px) scale(${scale})`,
        opacity,
        position: "relative",
      }}
    >
      {/* ── Outer Mascot Circle ── */}
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: "50%",
          backgroundColor: "#583420",
          border: "3.5px solid #18181B",
          boxShadow: "0 4px 0px #18181B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Adorable Vector Brain with Big Anime Eyes */}
        <svg
          viewBox="0 0 100 100"
          style={{ width: 72, height: 72, overflow: "visible" }}
        >
          {/* Brain Lobes Outline & Pink Fill */}
          <path
            d="
              M 28 62
              C 14 62 14 46 22 36
              C 16 26 26 14 40 18
              C 46 12 56 12 62 18
              C 76 14 86 26 80 36
              C 88 46 88 62 74 62
              C 72 70 60 74 51 70
              C 42 74 30 70 28 62 Z
            "
            fill="#F472B6"
            stroke="#18181B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Brain Midline & Sulcus folds */}
          <path
            d="M 51 22 Q 49 42 51 68"
            stroke="#DB2777"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 32 38 Q 40 40 38 48"
            stroke="#DB2777"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 70 38 Q 62 40 64 48"
            stroke="#DB2777"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Blush Cheeks */}
          <circle cx="30" cy="54" r="5" fill="#FB7185" opacity={0.85} />
          <circle cx="72" cy="54" r="5" fill="#FB7185" opacity={0.85} />

          {/* Giant Shiny Anime Eyes */}
          {/* Left Eye */}
          <ellipse cx="38" cy="46" rx="8.5" ry="10" fill="#18181B" />
          <ellipse cx="36" cy="43" rx="3.5" ry="4.5" fill="#FFFFFF" />
          <circle cx="41" cy="49" r="1.8" fill="#FFFFFF" />

          {/* Right Eye */}
          <ellipse cx="64" cy="46" rx="8.5" ry="10" fill="#18181B" />
          <ellipse cx="62" cy="43" rx="3.5" ry="4.5" fill="#FFFFFF" />
          <circle cx="67" cy="49" r="1.8" fill="#FFFFFF" />

          {/* Cute Smile */}
          <path
            d="M 47 55 Q 51 59 55 55"
            stroke="#18181B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Overlapping Oval Episode Counter Pill ── */}
      <div
        style={{
          marginTop: -16,
          backgroundColor: "#FFF8ED",
          border: "3.5px solid #18181B",
          borderRadius: 24,
          paddingLeft: 18,
          paddingRight: 18,
          paddingTop: 2,
          paddingBottom: 2,
          boxShadow: "0 4px 0px #18181B",
          zIndex: 3,
          minWidth: 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: LIGHT_FONTS.body,
            fontSize: 22,
            fontWeight: LIGHT_FONT_WEIGHT.black,
            color: "#18181B",
            letterSpacing: "-0.02em",
          }}
        >
          {episode}
        </span>
      </div>
    </div>
  );
};

