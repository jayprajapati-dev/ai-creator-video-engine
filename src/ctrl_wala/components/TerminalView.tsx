/**
 * CTRL_WALA — TerminalView Component
 *
 * Mac-style terminal window with animated line-by-line reveal and typing cursor.
 * Deterministic rendering — no Math.random(), no CSS animations.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";
import { stepVisible, blinkCursor, typingProgress } from "../designSystem";

export type TerminalLine = {
  command?: string;
  output?: string;
  type: "command" | "success" | "error" | "info" | "dim";
};

type TerminalViewProps = {
  lines: TerminalLine[];
  startFrame: number;
  title?: string;
  framesPerLine?: number;
};

const lineColor = (type: TerminalLine["type"]): string => {
  switch (type) {
    case "command": return COLORS.cyan.pure;
    case "success": return COLORS.emerald.pure;
    case "error":   return COLORS.rose.pure;
    case "info":    return COLORS.amber.pure;
    case "dim":     return COLORS.text.secondary;
  }
};

export const TerminalView: React.FC<TerminalViewProps> = ({
  lines,
  startFrame,
  title = "terminal",
  framesPerLine = 20,
}) => {
  const frame = useCurrentFrame();
  // fps needed for type-safety with useVideoConfig but unused in stepVisible/blinkCursor
  useVideoConfig();

  const visibleLines = lines.filter((_, i) =>
    stepVisible(frame, i, startFrame, framesPerLine)
  );

  const lastIndex = visibleLines.length - 1;
  const lastLine = visibleLines[lastIndex];
  const lastLineStartFrame = startFrame + lastIndex * framesPerLine;
  const lastLineText = lastLine ? (lastLine.command ?? lastLine.output ?? "") : "";
  const charsVisible = typingProgress(frame, lastLineStartFrame, lastLineText.length, 2);
  const showCursor = blinkCursor(frame);

  return (
    <div
      style={{
        fontFamily: FONTS.code,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
        boxShadow: `0 0 40px ${COLORS.cyan.glow}, 0 8px 32px rgba(0,0,0,0.6)`,
        border: `1px solid ${COLORS.bg.surfaceBorder}`,
        width: "100%",
      }}
    >
      {/* Window Title Bar */}
      <div
        style={{
          background: COLORS.bg.surfaceHigh,
          padding: `${SPACING[3]}px ${SPACING[4]}px`,
          display: "flex",
          alignItems: "center",
          gap: SPACING[3],
          borderBottom: `1px solid ${COLORS.bg.surfaceBorder}`,
        }}
      >
        <div style={{ display: "flex", gap: SPACING[2] }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28CA42" }} />
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            color: COLORS.text.secondary,
            fontSize: FONT_SIZE.xs,
            letterSpacing: "0.08em",
          }}
        >
          {title}
        </span>
      </div>

      {/* Terminal Body */}
      <div
        style={{
          background: COLORS.bg.deep,
          padding: SPACING[4],
          minHeight: 220,
        }}
      >
        {visibleLines.map((line, i) => {
          const isLast = i === lastIndex;
          const text = line.command ?? line.output ?? "";
          const displayText = isLast ? text.slice(0, charsVisible) : text;
          const color = lineColor(line.type);
          const prefix = line.type === "command" ? "❯ " : "  ";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: SPACING[2],
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  color: COLORS.text.tertiary,
                  fontSize: FONT_SIZE.xs,
                  minWidth: 28,
                  userSelect: "none",
                  paddingTop: 2,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ color, fontSize: FONT_SIZE.sm }}>
                <span style={{ color: COLORS.text.secondary }}>{prefix}</span>
                {displayText}
                {isLast && showCursor && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: "1em",
                      background: COLORS.cyan.pure,
                      marginLeft: 2,
                      verticalAlign: "text-bottom",
                    }}
                  />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
