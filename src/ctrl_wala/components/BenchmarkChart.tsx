/**
 * CTRL_WALA Benchmark Chart Component
 * Animated progress bars with benchmark metric scores and deltas.
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";

export interface BenchmarkItem {
  benchmark: string;
  category: string;
  scoreA: number; // e.g. GPT-4o 90.2
  scoreB: number; // e.g. DeepSeek 91.6
  modelAName: string;
  modelBName: string;
}

interface BenchmarkChartProps {
  benchmarks: BenchmarkItem[];
  startFrame?: number;
}

export const BenchmarkChart: React.FC<BenchmarkChartProps> = ({
  benchmarks,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);
  const animProgress = spring({
    frame: relFrame,
    fps,
    config: { stiffness: 120, damping: 18 },
  });

  return (
    <div
      style={{
        width: "100%",
        background: COLORS.bg.surfaceHigh,
        border: `1px solid ${COLORS.bg.surfaceBorder}`,
        borderRadius: RADIUS.xl,
        padding: `${SPACING[5]}px ${SPACING[5]}px`,
        display: "flex",
        flexDirection: "column",
        gap: SPACING[4],
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        fontFamily: FONTS.body,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${COLORS.bg.surfaceBorder}`,
          paddingBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            fontWeight: 800,
            color: COLORS.amber.pure,
            fontFamily: FONTS.code,
            letterSpacing: "0.1em",
          }}
        >
          BENCHMARK VERIFICATION
        </span>
        <div style={{ display: "flex", gap: 16, fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: COLORS.text.secondary }}>■ GPT-4o</span>
          <span style={{ color: COLORS.cyan.pure }}>■ DeepSeek V3</span>
        </div>
      </div>

      {benchmarks.map((item, idx) => {
        const widthA = interpolate(animProgress, [0, 1], [0, item.scoreA]);
        const widthB = interpolate(animProgress, [0, 1], [0, item.scoreB]);

        return (
          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ fontWeight: 700, color: COLORS.text.primary }}>
                {item.benchmark}{" "}
                <span style={{ color: COLORS.text.tertiary, fontSize: 12 }}>
                  ({item.category})
                </span>
              </span>
              <span
                style={{
                  fontFamily: FONTS.code,
                  fontWeight: 800,
                  color: item.scoreB >= item.scoreA ? COLORS.emerald.pure : COLORS.text.secondary,
                }}
              >
                {item.scoreB.toFixed(1)}% vs {item.scoreA.toFixed(1)}%
              </span>
            </div>

            {/* Model A Bar */}
            <div
              style={{
                height: 8,
                backgroundColor: COLORS.bg.deep,
                borderRadius: RADIUS.full,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${widthA}%`,
                  height: "100%",
                  backgroundColor: COLORS.text.tertiary,
                  borderRadius: RADIUS.full,
                }}
              />
            </div>

            {/* Model B Bar (DeepSeek / Highlight) */}
            <div
              style={{
                height: 12,
                backgroundColor: COLORS.bg.deep,
                borderRadius: RADIUS.full,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${widthB}%`,
                  height: "100%",
                  background: COLORS.gradient.cyanViolet,
                  borderRadius: RADIUS.full,
                  boxShadow: `0 0 10px ${COLORS.cyan.glowStrong}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

