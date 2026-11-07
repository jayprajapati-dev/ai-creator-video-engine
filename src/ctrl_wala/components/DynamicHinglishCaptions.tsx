/**
 * CTRL_WALA Dynamic Hinglish Captions — High Retention Kinetic Subtitles
 * Features:
 *  - Word-level neon highlighting on key terms (AI, numbers, tools)
 *  - Spring pop bounce effect on new lines
 *  - Frosted dark glass container with mobile safe-zone alignment
 */

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SAFE_ZONE, SPACING } from "../designSystem";

interface DynamicHinglishCaptionsProps {
  text: string;
  accent?: "cyan" | "violet" | "emerald" | "amber";
  startFrame?: number;
}

// Words to automatically pop out with neon highlight
const KEYWORDS_TO_HIGHLIGHT = new Set([
  "OpenAI",
  "DeepSeek",
  "V-Three",
  "V3",
  "GPT",
  "Four-O",
  "4o",
  "Claude",
  "Three",
  "point",
  "Five",
  "Sonnet",
  "Ten-X",
  "10X",
  "Next",
  "dot",
  "js",
  "V-Zero",
  "V0",
  "React",
  "Tailwind",
  "Shadcn",
  "Ninety",
  "Percent",
  "One",
  "Million",
  "Two",
  "Fifty",
  "Dollars",
  "Fourteen",
  "Cents",
  "Six",
  "Seventy",
  "Billion",
  "Open",
  "Weights",
  "DEEPSEEK",
  "PROMPT",
  "Architect",
  "Debugger",
  "Generator",
  "Hundred",
]);

export const DynamicHinglishCaptions: React.FC<DynamicHinglishCaptionsProps> = ({
  text,
  accent = "cyan",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);
  const popAnim = spring({
    frame: relFrame,
    fps,
    config: { stiffness: 260, damping: 15 },
  });

  const accentColor =
    accent === "cyan"
      ? COLORS.cyan.pure
      : accent === "emerald"
      ? COLORS.emerald.pure
      : accent === "amber"
      ? COLORS.amber.pure
      : COLORS.violet.pure;

  const words = text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: SAFE_ZONE.horizontalMargin,
        right: SAFE_ZONE.horizontalMargin,
        bottom: SAFE_ZONE.bottomRestricted + 30,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        transform: `scale(${popAnim})`,
        opacity: Math.min(1, popAnim),
      }}
    >
      <div
        style={{
          background: "rgba(8, 13, 26, 0.92)",
          backdropFilter: "blur(20px)",
          border: `2px solid ${accentColor}`,
          borderRadius: RADIUS.xl,
          padding: `${SPACING[3]}px ${SPACING[5]}px`,
          maxWidth: 920,
          textAlign: "center",
          boxShadow: `0 12px 40px rgba(0,0,0,0.85), 0 0 25px ${accentColor}44`,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 8px",
          alignItems: "center",
        }}
      >
        {words.map((w, idx) => {
          const cleanWord = w.replace(/[.,?!:;—"']/g, "");
          const isHighlight = KEYWORDS_TO_HIGHLIGHT.has(cleanWord);

          return (
            <span
              key={idx}
              style={{
                fontFamily: isHighlight ? FONTS.display : FONTS.hindi,
                fontSize: isHighlight ? FONT_SIZE.md : FONT_SIZE.base,
                fontWeight: isHighlight ? 900 : 700,
                color: isHighlight ? "#FCD34D" : "#FFFFFF",
                textShadow: isHighlight
                  ? "0 0 16px rgba(252, 211, 77, 0.6)"
                  : "0 2px 6px rgba(0,0,0,0.9)",
                letterSpacing: isHighlight ? "0.02em" : "0.01em",
                backgroundColor: isHighlight ? "rgba(252, 211, 77, 0.12)" : "transparent",
                padding: isHighlight ? "2px 8px" : "0px",
                borderRadius: isHighlight ? RADIUS.sm : 0,
                border: isHighlight ? "1px solid rgba(252, 211, 77, 0.3)" : "none",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
