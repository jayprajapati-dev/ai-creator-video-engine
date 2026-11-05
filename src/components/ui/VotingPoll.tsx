import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const VotingPoll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const scaleEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Pulse animation for high urgency
  const pulse = 1 + 0.03 * Math.sin((frame / fps) * 8);

  // Countdown timer from 3.0s down to 0.0s
  const secondsLeft = Math.max(0, (3 - frame / fps)).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 260,
        left: 60,
        right: 60,
        transformOrigin: "center center",
        transform: `scale(${scaleEntrance})`,
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Urgency Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#111111",
          border: "2px solid #E63946",
          padding: "8px 22px",
          borderRadius: 30,
          boxShadow: "0 0 25px rgba(230,57,70,0.6)",
        }}
      >
        <span
          style={{
            color: "#E63946",
            fontSize: 20,
            fontWeight: 900,
            animation: "blink",
          }}
        >
          ● CRITICAL CHOICE
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          {secondsLeft}s
        </span>
      </div>

      {/* Main Choice Buttons Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        {/* OPTION A: HIDE */}
        <div
          style={{
            backgroundColor: "#18181B",
            border: "4px solid #FFD166",
            borderRadius: 24,
            padding: "22px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(255,209,102,0.3)",
            transform: `scale(${pulse})`,
            transformOrigin: "center center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#FFD166",
                color: "#111111",
                fontWeight: 900,
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  fontWeight: 900,
                  letterSpacing: -0.5,
                }}
              >
                HIDE IN THE VENT
              </span>
              <span style={{ color: "#FFD166", fontSize: 16, fontWeight: 700 }}>
                Silent, but trapped if found
              </span>
            </div>
          </div>
          <span style={{ fontSize: 36 }}>🤫</span>
        </div>

        {/* OPTION B: RUN */}
        <div
          style={{
            backgroundColor: "#18181B",
            border: "4px solid #E63946",
            borderRadius: 24,
            padding: "22px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(230,57,70,0.4)",
            transform: `scale(${pulse})`,
            transformOrigin: "center center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#E63946",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  fontWeight: 900,
                  letterSpacing: -0.5,
                }}
              >
                RUN FOR EXITS
              </span>
              <span style={{ color: "#F87171", fontSize: 16, fontWeight: 700 }}>
                Fast, but footsteps echo
              </span>
            </div>
          </div>
          <span style={{ fontSize: 36 }}>⚡</span>
        </div>
      </div>

      {/* Audience CTA Banner */}
      <div
        style={{
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: 2,
          textAlign: "center",
          textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "8px 24px",
          borderRadius: 20,
        }}
      >
        👇 COMMENT "A" OR "B" TO CHOOSE NEXT EPISODE!
      </div>
    </div>
  );
};
