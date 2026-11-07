/**
 * CTRL_WALA — MacOSCard Component (Version 2.0 - Techstackbro Style)
 *
 * Detailed macOS window card:
 *  - 3.5px solid #18181B outline with 0 8px 0px #18181B retro shadow
 *  - Traffic light buttons with subtle stroke
 *  - Filename in header
 *  - JetBrains Mono / monospace code view with peach/orange full-row highlight
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";

interface MacOSCardProps {
  filename: string;
  children: React.ReactNode;
  delay?: number;
  width?: string | number;
}

const TrafficLights: React.FC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {[
      { bg: "#FF5F56", border: "#E0443E" },
      { bg: "#FFBD2E", border: "#DEA123" },
      { bg: "#27C93F", border: "#1AAB29" },
    ].map((dot, i) => (
      <div
        key={i}
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: dot.bg,
          border: `1.5px solid ${dot.border}`,
          flexShrink: 0,
        }}
      />
    ))}
  </div>
);

export const MacOSCard: React.FC<MacOSCardProps> = ({
  filename,
  children,
  delay = 0,
  width = "100%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({ frame: f, fps, config: { stiffness: 220, damping: 22 } });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(entrance, [0, 1], [0.97, 1]);

  return (
    <div
      style={{
        width,
        backgroundColor: "#FFFFFF",
        border: "3.5px solid #18181B",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 8px 0px #18181B",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        flexShrink: 0,
      }}
    >
      {/* macOS Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "#EDEEF2",
          borderBottom: "3.5px solid #18181B",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        <TrafficLights />
        <span
          style={{
            fontFamily: LIGHT_FONTS.code,
            fontSize: 20,
            fontWeight: LIGHT_FONT_WEIGHT.bold,
            color: "#18181B",
            letterSpacing: "0.01em",
          }}
        >
          {filename}
        </span>
      </div>

      {/* Content area */}
      <div style={{ padding: "24px 28px" }}>{children}</div>
    </div>
  );
};

export const CodeLine: React.FC<{
  code: string;
  highlighted?: boolean;
  indent?: number;
  delay?: number;
}> = ({ code, highlighted = false, indent = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: LIGHT_FONTS.code,
        fontSize: 22,
        fontWeight: LIGHT_FONT_WEIGHT.bold,
        lineHeight: 1.7,
        color: "#18181B",
        backgroundColor: highlighted ? "#FFA07A" : "transparent",
        borderRadius: highlighted ? 8 : 0,
        paddingLeft: 12 + indent * 20,
        paddingRight: 12,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 2,
        marginBottom: 2,
        opacity,
        whiteSpace: "pre",
      }}
    >
      {code}
    </div>
  );
};
