/**
 * Episode 02 — Scene 6: FINAL CLIFFHANGER (49–60s, frames 1470–1800)
 * The Climax & Hook into Episode 03:
 * - Monitor shifts to:
 *     NEXT VISITOR: AARAV
 *     ARRIVAL TIME: 02:17 AM
 * - Phone vibrates on desk: SMS from Unknown Number:
 *     "इस बार ऊपर मत जाना।"
 * - Distant elevator bell rings.
 * - Heartbeat strobe & cut to black.
 * - Episode 03 CTA Card: "तुम्हें क्या लगता है, B1 में कौन था?"
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Ep2SceneConfig } from "../episode2Config";
import { HindiCaptions } from "../../HindiCaptions";
import { HindiOverlay } from "../../HindiOverlay";
import { Aarav } from "../../Aarav";

interface Props {
  scene: Ep2SceneConfig;
}

export const Ep2Scene6Cliffhanger: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = frame;

  // SMS Notification drop-down spring at rel=120
  const smsSpring = spring({ frame: rel - 120, fps, config: { damping: 12, stiffness: 140 } });
  const smsY = interpolate(smsSpring, [0, 1], [-200, 320]);

  // Phone vibration buzz (rel 115–150)
  const phoneVibe = rel > 115 && rel < 150 ? Math.sin(rel * 2) * 5 : 0;

  // Cut to black at rel=240
  const blackFade = interpolate(rel, [238, 248], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Heartbeat strobe on border
  const heartbeatPhase = rel % 18;
  const heartbeat = heartbeatPhase < 4 ? interpolate(heartbeatPhase, [0, 2, 4], [0, 0.9, 0]) : 0;

  // Episode 03 Card slides up at rel=245
  const ctaSpring = spring({ frame: rel - 245, fps, config: { damping: 14, stiffness: 120 } });
  const ctaY = interpolate(ctaSpring, [0, 1], [400, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020408",
        overflow: "hidden",
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="cliff2Atmo" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0B1A28" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#cliff2Atmo)" />

        {/* ── Background Monitor showing NEXT VISITOR ─────────── */}
        <g transform="translate(190, 480)">
          <rect width="700" height="480" rx="16" fill="#03080E" stroke="#DC2626" strokeWidth="4" />
          <rect x="14" y="14" width="672" height="452" rx="10" fill="#0A0204" />

          {/* Ominous Text on Monitor */}
          <text x="350" y="110" textAnchor="middle" fill="#EF4444" fontSize="24" fontFamily="monospace" fontWeight="900" letterSpacing="4">
            VISITOR REGISTRY UPDATE
          </text>
          <line x1="100" y1="135" x2="600" y2="135" stroke="#7F1D1D" strokeWidth="2" />

          <text x="350" y="210" textAnchor="middle" fill="#FFFFFF" fontSize="36" fontFamily="system-ui, sans-serif" fontWeight="900" letterSpacing="3">
            NEXT VISITOR: AARAV
          </text>

          <rect x="180" y="260" width="340" height="60" rx="8" fill="#1C0508" stroke="#DC2626" strokeWidth="2" />
          <text x="350" y="302" textAnchor="middle" fill="#EF4444" fontSize="24" fontFamily="monospace" fontWeight="900">
            ARRIVAL TIME: 02:17 AM
          </text>

          {/* Timestamp Warning */}
          <text x="350" y="380" textAnchor="middle" fill="#F59E0B" fontSize="18" fontFamily="monospace" fontWeight="700">
            STATUS: AWAITING ARRIVAL
          </text>
        </g>

        {/* ── Desk & Smartphone ────────────────────────────────── */}
        <rect x="0" y="1320" width="1080" height="600" fill="#040912" />

        {/* Smartphone on desk with vibration */}
        <g transform={`translate(${540 + phoneVibe}, 1370)`}>
          <rect x="-60" y="-120" width="120" height="220" rx="18" fill="#0A1624" stroke="#00D4D4" strokeWidth="3" />
          <rect x="-52" y="-105" width="104" height="190" rx="10" fill="#00E5FF" opacity="0.4" />
          {/* Incoming message glow */}
          <circle cx="0" cy="-10" r="32" fill="#00D4D4" opacity="0.3 + 0.3 * Math.sin(rel * 0.4)" />
        </g>
      </svg>

      {/* ── Incoming SMS Notification Card (Drop Down) ───────── */}
      {rel > 165 && (
        <div
          style={{
            position: "absolute",
            top: smsY,
            left: 70,
            right: 70,
            backgroundColor: "rgba(10, 16, 26, 0.95)",
            backdropFilter: "blur(12px)",
            borderRadius: 20,
            border: "2px solid #DC2626",
            padding: "24px 28px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.8), 0 0 20px rgba(220,38,38,0.3)",
            zIndex: 60,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#DC2626" }} />
              <span style={{ color: "#EF4444", fontSize: 18, fontFamily: "monospace", fontWeight: 900 }}>
                MESSAGES • UNKNOWN SENDER
              </span>
            </div>
            <span style={{ color: "#94A3B8", fontSize: 14, fontFamily: "monospace" }}>NOW</span>
          </div>

          {/* SMS Body */}
          <div
            style={{
              fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
              fontSize: 32,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: 1,
              marginTop: 6,
            }}
          >
            "इस बार ऊपर मत जाना।"
          </div>
          <div style={{ color: "#94A3B8", fontSize: 16, marginTop: 4 }}>
            (Do not go up this time.)
          </div>
        </div>
      )}

      {/* Aarav standing in shock */}
      {rel < 250 && (
        <div
          style={{
            position: "absolute",
            bottom: 460,
            left: 140,
            zIndex: 30,
          }}
        >
          <Aarav pose="shock" scale={1.25} facing="right" />
        </div>
      )}

      {/* Black fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: blackFade,
          pointerEvents: "none",
          zIndex: 70,
        }}
      />

      {/* Heartbeat border strobe */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 70px rgba(220,38,38,${heartbeat * 0.9})`,
          pointerEvents: "none",
          zIndex: 75,
        }}
      />

      {/* ── Episode 03 Coming Soon Card ──────────────────────── */}
      {rel >= 255 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 60,
            right: 60,
            transform: `translateY(${ctaY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            zIndex: 80,
            textAlign: "center",
          }}
        >
          {/* Series Badge */}
          <div
            style={{
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 900,
              padding: "6px 18px",
              borderRadius: 6,
              letterSpacing: 3,
            }}
          >
            THE UNKNOWN CITY • EPISODE 03
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
              fontSize: 44,
              fontWeight: 900,
              color: "#F1F5F9",
              lineHeight: 1.3,
            }}
          >
            तुम्हें क्या लगता है...<br />
            <span style={{ color: "#00D4D4" }}>B1 में कौन था?</span>
          </div>

          {/* CTA Box */}
          <div
            style={{
              backgroundColor: "rgba(12, 29, 46, 0.9)",
              border: "2px solid #00D4D4",
              borderRadius: 16,
              padding: "16px 36px",
              maxWidth: 700,
            }}
          >
            <div style={{ color: "#F59E0B", fontSize: 22, fontWeight: 800 }}>
              👇 अपनी THEORIES कमेंट में लिखो!
            </div>
            <div style={{ color: "#94A3B8", fontSize: 16, marginTop: 4 }}>
              Next Episode will reveal the truth. Subscribe / Follow now!
            </div>
          </div>
        </div>
      )}

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={rel + scene.startFrame} />
    </div>
  );
};

