import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HINDI_DESIGN } from "./designSystem";

export const HindiVotingPoll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 130 },
  });

  // Urgent pulse
  const pulse = 1 + 0.025 * Math.sin((frame / fps) * 9);

  // Countdown: 6s scene from frame 0 → 6s
  const secsLeft = Math.max(0, 6 - frame / fps).toFixed(0);

  return (
    <div
      style={{
        position: "absolute",
        top: 480,
        left: 60,
        right: 60,
        transform: `scale(${entrance})`,
        transformOrigin: "center top",
        zIndex: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        fontFamily: HINDI_DESIGN.fonts.hindi,
      }}
    >
      {/* ── Series logo on cliffhanger ─────────────────────────── */}
      <div
        style={{
          backgroundColor: "rgba(5,8,15,0.95)",
          border: `2px solid ${HINDI_DESIGN.colors.red}`,
          borderRadius: 16,
          padding: "10px 28px",
          boxShadow: `0 0 30px ${HINDI_DESIGN.colors.red}44`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: HINDI_DESIGN.colors.red,
            boxShadow: `0 0 10px ${HINDI_DESIGN.colors.red}`,
          }}
        />
        <span
          style={{
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 900,
            fontFamily: HINDI_DESIGN.fonts.english,
            letterSpacing: 2,
          }}
        >
          THE UNKNOWN CITY
        </span>
        <span
          style={{
            fontFamily: HINDI_DESIGN.fonts.english,
            color: HINDI_DESIGN.colors.red,
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          {secsLeft}s
        </span>
      </div>

      {/* ── Question ───────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "rgba(5,8,15,0.9)",
          border: `1.5px solid rgba(0,212,212,0.3)`,
          borderRadius: 20,
          padding: "16px 24px",
          textAlign: "center",
          maxWidth: 920,
        }}
      >
        <span
          style={{
            fontFamily: HINDI_DESIGN.fonts.hindi,
            color: HINDI_DESIGN.colors.text,
            fontSize: 36,
            fontWeight: 800,
            lineHeight: 1.3,
          }}
        >
          आरव को क्या करना चाहिए?
        </span>
      </div>

      {/* ── Option A ───────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(5,8,15,0.92)",
          border: `4px solid ${HINDI_DESIGN.colors.gold}`,
          borderRadius: 22,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: `0 10px 30px ${HINDI_DESIGN.colors.gold}30`,
          transform: `scale(${pulse})`,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            backgroundColor: HINDI_DESIGN.colors.gold,
            color: "#111111",
            fontWeight: 900,
            fontSize: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: HINDI_DESIGN.fonts.english,
            flexShrink: 0,
          }}
        >
          A
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 30,
              fontWeight: 900,
              fontFamily: HINDI_DESIGN.fonts.hindi,
            }}
          >
            CCTV रूम में छुपो
          </span>
          <span
            style={{
              color: HINDI_DESIGN.colors.gold,
              fontSize: 17,
              fontWeight: 600,
              fontFamily: HINDI_DESIGN.fonts.english,
            }}
          >
            Hide in the CCTV Room
          </span>
        </div>
        <span style={{ marginLeft: "auto", fontSize: 34 }}>🤫</span>
      </div>

      {/* ── Option B ───────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(5,8,15,0.92)",
          border: `4px solid ${HINDI_DESIGN.colors.red}`,
          borderRadius: 22,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: `0 10px 30px ${HINDI_DESIGN.colors.red}40`,
          transform: `scale(${pulse})`,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            backgroundColor: HINDI_DESIGN.colors.red,
            color: "#FFFFFF",
            fontWeight: 900,
            fontSize: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: HINDI_DESIGN.fonts.english,
            flexShrink: 0,
          }}
        >
          B
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 30,
              fontWeight: 900,
              fontFamily: HINDI_DESIGN.fonts.hindi,
            }}
          >
            लिफ्ट के अंदर जाओ
          </span>
          <span
            style={{
              color: HINDI_DESIGN.colors.red,
              fontSize: 17,
              fontWeight: 600,
              fontFamily: HINDI_DESIGN.fonts.english,
            }}
          >
            Go inside the Elevator
          </span>
        </div>
        <span style={{ marginLeft: "auto", fontSize: 34 }}>⬆️</span>
      </div>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
          borderRadius: 24,
          padding: "10px 28px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: HINDI_DESIGN.fonts.english,
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          👇 COMMENT "A" OR "B" — EPISODE 02 DEPENDS ON YOU!
        </span>
      </div>
    </div>
  );
};

