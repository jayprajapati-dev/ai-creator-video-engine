/**
 * CTRL_WALA — ClaudeInterface Component (Version 3.0 - Vector Icons)
 *
 * Light-theme Claude.ai UI simulation:
 *  - 3.5px solid #18181B outline + 0 8px 0px #18181B drop shadow
 *  - macOS traffic lights + header with SparklesIcon
 *  - Prominent chat bubbles (user message & streaming assistant code)
 *  - High-legibility mobile typography
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";
import { SparklesIcon, SendIcon, CodeIcon } from "./Icons";

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
  isCode?: boolean;
  language?: string;
  toolUse?: string;
}

interface ClaudeInterfaceProps {
  messages: ClaudeMessage[];
  startFrame?: number;
  framesPerMessage?: number;
  projectName?: string;
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

const BlinkCursor: React.FC<{ visible: boolean }> = ({ visible }) => {
  const frame = useCurrentFrame();
  const on = frame % 20 < 10;
  if (!visible || !on) return null;
  return (
    <span
      style={{
        display: "inline-block",
        width: 3,
        height: "1em",
        backgroundColor: "#D97757",
        marginLeft: 2,
        verticalAlign: "text-bottom",
      }}
    />
  );
};

export const ClaudeInterface: React.FC<ClaudeInterfaceProps> = ({
  messages,
  startFrame = 0,
  framesPerMessage = 100,
  projectName = "PDF Summarizer",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - startFrame);
  const entrance = spring({ frame: f, fps, config: { stiffness: 220, damping: 22 } });
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  const visibleMessages = messages.filter((_, i) => frame >= startFrame + i * framesPerMessage);
  const lastIdx = visibleMessages.length - 1;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "3.5px solid #18181B",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 8px 0px #18181B",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 540,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* ── Top Header bar ── */}
      <div
        style={{
          backgroundColor: "#EDEEF2",
          borderBottom: "3.5px solid #18181B",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 12,
          paddingBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <TrafficLights />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SparklesIcon size={18} color="#D97757" />
          <span
            style={{
              fontFamily: LIGHT_FONTS.body,
              fontSize: 20,
              fontWeight: LIGHT_FONT_WEIGHT.bold,
              color: "#18181B",
            }}
          >
            Claude 3.5 Sonnet — {projectName}
          </span>
        </div>
      </div>

      {/* ── Conversation Area ── */}
      <div
        style={{
          flex: 1,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "hidden",
          backgroundColor: "#FDFDFD",
        }}
      >
        {visibleMessages.map((msg, i) => {
          const isUser = msg.role === "user";
          const isLast = i === lastIdx;
          const msgStartFrame = startFrame + i * framesPerMessage;
          const elapsed = Math.max(0, frame - msgStartFrame);
          const charsPerFrame = isUser ? 4 : 2.5;
          const charsVisible = isLast
            ? Math.min(msg.content.length, Math.floor(elapsed * charsPerFrame))
            : msg.content.length;
          const displayText = msg.content.slice(0, charsVisible);

          if (msg.isCode) {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: "#F4F4F6",
                  border: "2px solid #E5E7EB",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#E5E7EB",
                    padding: "6px 16px",
                    fontFamily: LIGHT_FONTS.code,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <CodeIcon size={14} color="#374151" />
                  {msg.language ?? "python"}
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: "16px 20px",
                    fontFamily: LIGHT_FONTS.code,
                    fontSize: 19,
                    fontWeight: 600,
                    color: "#18181B",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <span style={{ color: "#0066CC" }}>{displayText}</span>
                  <BlinkCursor visible={isLast && charsVisible < msg.content.length} />
                </pre>
              </div>
            );
          }

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                gap: 12,
              }}
            >
              {!isUser && (
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: "#D97757",
                    border: "2px solid #18181B",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  C
                </div>
              )}

              <div
                style={{
                  maxWidth: "85%",
                  backgroundColor: isUser ? "#EDE9FE" : "#FFFFFF",
                  border: `2.5px solid ${isUser ? "#7C3AED" : "#18181B"}`,
                  borderRadius: isUser ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
                  padding: "14px 20px",
                  fontFamily: LIGHT_FONTS.body,
                  fontSize: 22,
                  fontWeight: isUser ? LIGHT_FONT_WEIGHT.bold : LIGHT_FONT_WEIGHT.medium,
                  color: "#18181B",
                  lineHeight: 1.4,
                  boxShadow: "0 3px 0px rgba(0,0,0,0.1)",
                }}
              >
                {displayText}
                <BlinkCursor visible={isLast && !isUser && charsVisible < msg.content.length} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Input bar at bottom with SendIcon ── */}
      <div
        style={{
          borderTop: "2.5px solid #18181B",
          backgroundColor: "#F9F9FB",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            border: "2px solid #D1D5DB",
            borderRadius: 14,
            padding: "10px 18px",
            fontFamily: LIGHT_FONTS.body,
            fontSize: 20,
            color: "#9CA3AF",
          }}
        >
          Message Claude...
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#D97757",
            border: "2px solid #18181B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <SendIcon size={20} color="#FFFFFF" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};
