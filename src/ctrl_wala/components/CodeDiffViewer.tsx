/**
 * CTRL_WALA — CodeDiffViewer Component
 *
 * Git diff-style code viewer with animated line-by-line reveal.
 * Color-codes added, removed, context and header lines.
 */

import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";
import { stepVisible } from "../designSystem";

export type DiffLine = {
  content: string;
  type: "added" | "removed" | "context" | "header";
};

type CodeDiffViewerProps = {
  lines: DiffLine[];
  language?: string;
  startFrame: number;
  title?: string;
  framesPerLine?: number;
};

type LineStyle = {
  bg: string;
  borderLeft: string;
  prefix: string;
  color: string;
};

const getLineStyle = (type: DiffLine["type"]): LineStyle => {
  switch (type) {
    case "added":
      return {
        bg: COLORS.emerald.dim,
        borderLeft: `3px solid ${COLORS.emerald.pure}`,
        prefix: "+",
        color: COLORS.emerald.pure,
      };
    case "removed":
      return {
        bg: COLORS.rose.dim,
        borderLeft: `3px solid ${COLORS.rose.pure}`,
        prefix: "-",
        color: COLORS.rose.pure,
      };
    case "header":
      return {
        bg: COLORS.amber.dim,
        borderLeft: "3px solid transparent",
        prefix: " ",
        color: COLORS.amber.pure,
      };
    case "context":
    default:
      return {
        bg: "transparent",
        borderLeft: "3px solid transparent",
        prefix: " ",
        color: COLORS.text.secondary,
      };
  }
};

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({
  lines,
  language = "typescript",
  startFrame,
  title = "diff",
  framesPerLine = 6,
}) => {
  const frame = useCurrentFrame();

  const visibleLines = lines.filter((_, i) =>
    stepVisible(frame, i, startFrame, framesPerLine)
  );

  return (
    <div
      style={{
        fontFamily: FONTS.code,
        borderRadius: RADIUS.xl,
        overflow: "hidden",
        border: `1px solid ${COLORS.bg.surfaceBorder}`,
        boxShadow: `0 0 40px ${COLORS.emerald.glow}, 0 8px 32px rgba(0,0,0,0.5)`,
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: COLORS.bg.surfaceHigh,
          padding: `${SPACING[3]}px ${SPACING[4]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${COLORS.bg.surfaceBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: SPACING[3] }}>
          <div style={{ display: "flex", gap: SPACING[2] }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28CA42" }} />
          </div>
          <span style={{ fontSize: FONT_SIZE.xs, color: COLORS.text.secondary }}>{title}</span>
        </div>

        <div
          style={{
            background: COLORS.bg.surface,
            border: `1px solid ${COLORS.bg.surfaceBorder}`,
            borderRadius: RADIUS.full,
            padding: `2px ${SPACING[3]}px`,
            fontSize: 11,
            color: COLORS.amber.pure,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {language}
        </div>
      </div>

      {/* Diff Lines */}
      <div style={{ background: COLORS.bg.deep }}>
        {visibleLines.map((line, i) => {
          const style = getLineStyle(line.type);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "stretch",
                background: style.bg,
                borderLeft: style.borderLeft,
              }}
            >
              <div
                style={{
                  width: 36,
                  padding: `${SPACING[1]}px ${SPACING[2]}px`,
                  textAlign: "right",
                  fontSize: 11,
                  color: COLORS.text.tertiary,
                  borderRight: `1px solid ${COLORS.bg.surfaceBorder}`,
                  flexShrink: 0,
                  userSelect: "none",
                }}
              >
                {i + 1}
              </div>

              <div
                style={{
                  width: 20,
                  padding: `${SPACING[1]}px ${SPACING[1]}px`,
                  textAlign: "center",
                  fontSize: FONT_SIZE.xs,
                  color: style.color,
                  flexShrink: 0,
                  fontWeight: 700,
                }}
              >
                {style.prefix}
              </div>

              <div
                style={{
                  flex: 1,
                  padding: `${SPACING[1]}px ${SPACING[3]}px`,
                  fontSize: FONT_SIZE.xs,
                  color: style.color,
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
              >
                {line.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
