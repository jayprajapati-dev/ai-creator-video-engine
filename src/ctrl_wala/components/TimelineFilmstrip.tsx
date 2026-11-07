/**
 * CTRL_WALA — TimelineFilmstrip Component (Techstackbro Step 5 Feature)
 *
 * Shows the rendered video timeline frames in a horizontal filmstrip card:
 *  - Purple arrow indicator: "↓ React code → video"
 *  - Filmstrip card with rendered mini scene frames
 *  - Center video play overlay button
 *  - "epXX reel ke asli frames" annotation
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";
import { PlayIcon, ArrowDownIcon } from "./Icons";

interface TimelineFilmstripProps {
  label?: string;
  delay?: number;
}

export const TimelineFilmstrip: React.FC<TimelineFilmstripProps> = ({
  label = "ep11 reel ke asli frames",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({ frame: f, fps, config: { stiffness: 220, damping: 22 } });
  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const scrollOffset = (frame * 1.5) % 180;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: `translateY(${translateY}px)`,
        opacity,
        width: "100%",
      }}
    >
      {/* ── Transition Arrow Badge (↓ React code → video) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          alignSelf: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#7C3AED",
            border: "3px solid #18181B",
            borderRadius: 12,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 0px #18181B",
          }}
        >
          <ArrowDownIcon size={24} color="#FFFFFF" strokeWidth={3} />
        </div>
        <div
          style={{
            backgroundColor: "#FF8E60",
            border: "3.5px solid #18181B",
            borderRadius: 16,
            paddingLeft: 22,
            paddingRight: 24,
            paddingTop: 8,
            paddingBottom: 8,
            boxShadow: "0 4px 0px #18181B",
          }}
        >
          <span
            style={{
              fontFamily: LIGHT_FONTS.body,
              fontSize: 22,
              fontWeight: LIGHT_FONT_WEIGHT.black,
              color: "#18181B",
            }}
          >
            React code → video
          </span>
        </div>
      </div>

      {/* ── Filmstrip Container Card ── */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "3.5px solid #18181B",
          borderRadius: 22,
          height: 180,
          overflow: "hidden",
          boxShadow: "0 8px 0px #18181B",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "0 16px",
            transform: `translateX(-${scrollOffset}px)`,
            width: "max-content",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((frameIdx) => (
            <div
              key={frameIdx}
              style={{
                width: 140,
                height: 140,
                backgroundColor: "#F3F4F6",
                border: "2px solid #E5E7EB",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                flexShrink: 0,
                padding: 8,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 24,
                  backgroundColor: frameIdx % 2 === 0 ? "#EDE9FE" : "#FEF3C7",
                  borderRadius: 6,
                  border: "1px solid #D1D5DB",
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: 14,
                  backgroundColor: "#E5E7EB",
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#236B5E",
                  border: "1.5px solid #18181B",
                  marginTop: 4,
                }}
              />
            </div>
          ))}
        </div>

        {/* Center Playhead Overlay Button with Vector PlayIcon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              backgroundColor: "rgba(24, 24, 27, 0.75)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 4,
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
            }}
          >
            <PlayIcon size={32} color="#FFFFFF" />
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          fontFamily: LIGHT_FONTS.code,
          fontSize: 18,
          fontWeight: LIGHT_FONT_WEIGHT.bold,
          color: "#737373",
          paddingRight: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
};
