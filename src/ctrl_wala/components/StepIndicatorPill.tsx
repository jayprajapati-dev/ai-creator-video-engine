/**
 * CTRL_WALA — StepIndicatorPill Component (Version 2.0 - Techstackbro Style)
 *
 * Exact replication of the orange/peach step indicator badge:
 *  - Background: Warm peach/coral (#FFA07A / #FF8E60)
 *  - Border: 3.5px solid #18181B with 0 5px 0px #18181B drop shadow
 *  - Text: Dark #18181B, bold, highly legible
 *  - Centered horizontally
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT_FONTS, LIGHT_FONT_SIZE, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";
import {
  ScriptDocumentIcon,
  StudioMicIcon,
  CaptionsBubbleIcon,
  ClapperMovieIcon,
  TerminalSleekIcon,
  LightningBoltIcon,
  PythonBrandIcon,
} from "./PremiumIcons";

interface StepIndicatorPillProps {
  step: number;
  label: string;
  icon?: React.ReactNode;
  emoji?: string;
  delay?: number;
}

export const StepIndicatorPill: React.FC<StepIndicatorPillProps> = ({
  step,
  label,
  icon,
  emoji,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({
    frame: f,
    fps,
    config: { stiffness: 280, damping: 20 },
  });

  const translateY = interpolate(entrance, [0, 1], [-25, 0]);
  const scale = interpolate(entrance, [0, 1], [0.85, 1]);
  const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Resolve crisp vector icon if not explicitly passed
  const resolvedIcon = icon || (() => {
    const l = label.toLowerCase();
    if (l.includes("script")) return <ScriptDocumentIcon size={24} color="#18181B" />;
    if (l.includes("awaaz") || l.includes("voice")) return <StudioMicIcon size={24} color="#18181B" />;
    if (l.includes("caption")) return <CaptionsBubbleIcon size={24} color="#18181B" />;
    if (l.includes("anim")) return <ClapperMovieIcon size={24} color="#18181B" />;
    if (l.includes("code")) return <TerminalSleekIcon size={24} color="#18181B" />;
    if (l.includes("run")) return <LightningBoltIcon size={24} color="#18181B" />;
    if (l.includes("python")) return <PythonBrandIcon size={24} />;
    return null;
  })();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        backgroundColor: "#FF8E60",
        border: "3.5px solid #18181B",
        borderRadius: 20,
        paddingLeft: 26,
        paddingRight: 28,
        paddingTop: 10,
        paddingBottom: 10,
        boxShadow: "0 5px 0px #18181B",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: LIGHT_FONTS.body,
          fontSize: LIGHT_FONT_SIZE.step,
          fontWeight: LIGHT_FONT_WEIGHT.black,
          color: "#18181B",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        step {step}
      </span>
      <span
        style={{
          fontSize: LIGHT_FONT_SIZE.step - 4,
          fontWeight: LIGHT_FONT_WEIGHT.black,
          color: "#18181B",
          lineHeight: 1,
        }}
      >
        •
      </span>
      <span
        style={{
          fontFamily: LIGHT_FONTS.body,
          fontSize: LIGHT_FONT_SIZE.step,
          fontWeight: LIGHT_FONT_WEIGHT.black,
          color: "#18181B",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      {resolvedIcon ? (
        <span style={{ display: "inline-flex", alignItems: "center", marginLeft: 2 }}>
          {resolvedIcon}
        </span>
      ) : emoji ? (
        <span
          style={{
            fontSize: LIGHT_FONT_SIZE.step + 4,
            lineHeight: 1,
            marginLeft: 2,
          }}
        >
          {emoji}
        </span>
      ) : null}
    </div>
  );
};
