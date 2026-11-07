/**
 * CTRL_WALA — AIChatSimulator Component
 *
 * Simulates an AI chat interface (Claude/ChatGPT style).
 * Messages stream in one-by-one with typing animation.
 *
 * IMPORTANT: Visual reconstruction for demonstration purposes.
 * Not a live AI response.
 */

import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SPACING } from "../designSystem";
import { typingProgress, stepVisible, blinkCursor } from "../designSystem";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  isCode?: boolean;
  language?: string;
};

type AIChatSimulatorProps = {
  messages: ChatMessage[];
  startFrame: number;
  modelName?: string;
  framesPerMessage?: number;
};

const ThinkingDots: React.FC<{ frame: number }> = ({ frame }) => {
  const dots = [0, 10, 20];
  return (
    <div style={{ display: "flex", gap: SPACING[2], padding: `${SPACING[2]}px ${SPACING[3]}px`, alignItems: "center" }}>
      {dots.map((offset, i) => {
        const phase = (frame + offset) % 40;
        const opacity = phase < 20 ? 0.3 + (phase / 20) * 0.7 : 1 - ((phase - 20) / 20) * 0.7;
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLORS.violet.pure,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export const AIChatSimulator: React.FC<AIChatSimulatorProps> = ({
  messages,
  startFrame,
  modelName = "Claude 3.5 Sonnet",
  framesPerMessage = 90,
}) => {
  const frame = useCurrentFrame();
  const showCursor = blinkCursor(frame);

  const visibleMessages = messages.filter((_, i) =>
    stepVisible(frame, i, startFrame, framesPerMessage)
  );

  const lastIndex = visibleMessages.length - 1;

  return (
    <div
      style={{
        fontFamily: FONTS.body,
        background: COLORS.bg.deep,
        borderRadius: RADIUS.xl,
        overflow: "hidden",
        border: `1px solid ${COLORS.bg.surfaceBorder}`,
        boxShadow: `0 0 40px ${COLORS.violet.glow}, 0 8px 32px rgba(0,0,0,0.5)`,
        width: "100%",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: COLORS.bg.surfaceHigh,
          padding: `${SPACING[3]}px ${SPACING[4]}px`,
          borderBottom: `1px solid ${COLORS.bg.surfaceBorder}`,
          display: "flex",
          alignItems: "center",
          gap: SPACING[3],
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: COLORS.gradient.cyanViolet,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: FONT_SIZE.sm,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          AI
        </div>
        <div>
          <div style={{ fontSize: FONT_SIZE.sm, fontWeight: 600, color: COLORS.text.primary }}>{modelName}</div>
          <div style={{ fontSize: FONT_SIZE.xs, color: COLORS.emerald.pure }}>● Online</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: SPACING[4], display: "flex", flexDirection: "column", gap: SPACING[3] }}>
        {visibleMessages.map((msg, i) => {
          const isUser = msg.role === "user";
          const isLast = i === lastIndex;
          const msgStartFrame = startFrame + i * framesPerMessage;
          const totalChars = msg.content.length;
          const charsVisible = isLast
            ? typingProgress(frame, msgStartFrame + (isUser ? 0 : 15), totalChars, isUser ? 3 : 1.8)
            : totalChars;
          const displayText = msg.content.slice(0, charsVisible);
          const isTyping = isLast && !isUser && charsVisible < totalChars;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                gap: SPACING[3],
                alignItems: "flex-start",
              }}
            >
              {!isUser && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: COLORS.gradient.cyanViolet,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
              )}

              <div
                style={{
                  maxWidth: "80%",
                  background: isUser ? COLORS.bg.surface : COLORS.bg.surfaceHigh,
                  borderRadius: isUser
                    ? `${RADIUS.lg}px ${RADIUS.lg}px ${RADIUS.sm}px ${RADIUS.lg}px`
                    : `${RADIUS.lg}px ${RADIUS.lg}px ${RADIUS.lg}px ${RADIUS.sm}px`,
                  padding: `${SPACING[3]}px ${SPACING[4]}px`,
                  border: `1px solid ${isUser ? COLORS.cyan.muted : COLORS.bg.surfaceBorder}`,
                }}
              >
                {msg.isCode ? (
                  <pre
                    style={{
                      fontFamily: FONTS.code,
                      fontSize: FONT_SIZE.xs,
                      color: COLORS.emerald.pure,
                      background: COLORS.bg.deep,
                      borderRadius: RADIUS.md,
                      padding: SPACING[3],
                      margin: 0,
                      overflow: "hidden",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.language && (
                      <div style={{ color: COLORS.amber.pure, marginBottom: SPACING[2], fontSize: FONT_SIZE.xs }}>{msg.language}</div>
                    )}
                    {displayText}
                    {isLast && showCursor && <span style={{ color: COLORS.cyan.pure }}>▌</span>}
                  </pre>
                ) : (
                  <span
                    style={{
                      fontSize: FONT_SIZE.sm,
                      color: isUser ? COLORS.text.primary : COLORS.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {displayText}
                    {isLast && showCursor && !isUser && <span style={{ color: COLORS.violet.pure }}>▌</span>}
                  </span>
                )}

                {!isUser && isTyping && charsVisible === 0 && (
                  <ThinkingDots frame={frame} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div
        style={{
          padding: `${SPACING[2]}px ${SPACING[4]}px`,
          borderTop: `1px solid ${COLORS.bg.surfaceBorder}`,
          fontSize: 11,
          color: COLORS.text.tertiary,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Visual reconstruction for demonstration purposes — not a live AI response
      </div>
    </div>
  );
};
