/**
 * CTRL_WALA — BrowserMockup Component
 *
 * Chrome-style browser frame with animated loading bar.
 * Children render as the page content area.
 */

import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";
import { loadingProgress } from "../designSystem";

type BrowserMockupProps = {
  url: string;
  startFrame: number;
  loadDurationFrames?: number;
  children: React.ReactNode;
};

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  url,
  startFrame,
  loadDurationFrames = 45,
  children,
}) => {
  const frame = useCurrentFrame();
  const progress = loadingProgress(frame, startFrame, loadDurationFrames);
  const isLoaded = progress >= 1;

  return (
    <div
      style={{
        borderRadius: RADIUS.xl,
        overflow: "hidden",
        boxShadow: `0 0 60px ${COLORS.cyan.dim}, 0 16px 48px rgba(0,0,0,0.7)`,
        border: `1px solid ${COLORS.bg.surfaceBorder}`,
        width: "100%",
      }}
    >
      {/* Browser Chrome */}
      <div
        style={{
          background: COLORS.bg.surfaceHigh,
          borderBottom: `1px solid ${COLORS.bg.surfaceBorder}`,
        }}
      >
        {/* Title bar row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: `${SPACING[3]}px ${SPACING[4]}px`,
            gap: SPACING[3],
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: SPACING[2] }}>
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#28CA42" }} />
          </div>

          {/* Back / forward dots */}
          <div style={{ display: "flex", gap: SPACING[2] }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: COLORS.bg.surface, border: `1px solid ${COLORS.bg.surfaceBorder}` }} />
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: COLORS.bg.surface, border: `1px solid ${COLORS.bg.surfaceBorder}` }} />
          </div>

          {/* URL Bar */}
          <div
            style={{
              flex: 1,
              background: COLORS.bg.deep,
              borderRadius: RADIUS.full,
              padding: `${SPACING[2]}px ${SPACING[4]}px`,
              display: "flex",
              alignItems: "center",
              gap: SPACING[2],
              border: `1px solid ${COLORS.cyan.muted}`,
            }}
          >
            {/* Lock icon */}
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="1" y="6" width="10" height="8" rx="1.5" stroke={COLORS.emerald.pure} strokeWidth="1.5" />
              <path d="M3 6V4a3 3 0 0 1 6 0v2" stroke={COLORS.emerald.pure} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: FONTS.code,
                fontSize: FONT_SIZE.xs,
                color: isLoaded ? COLORS.text.primary : COLORS.text.secondary,
                letterSpacing: "0.01em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {url}
            </span>
          </div>
        </div>

        {/* Loading bar */}
        {!isLoaded && (
          <div
            style={{
              height: 3,
              background: COLORS.bg.surface,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${progress * 100}%`,
                background: COLORS.gradient.cyanViolet,
                borderRadius: RADIUS.full,
                boxShadow: `0 0 8px ${COLORS.cyan.pure}`,
              }}
            />
          </div>
        )}
      </div>

      {/* Page Content */}
      <div
        style={{
          background: "#F8FAFC",
          minHeight: 200,
          opacity: progress,
        }}
      >
        {children}
      </div>
    </div>
  );
};
