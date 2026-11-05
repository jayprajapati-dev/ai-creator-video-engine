/**
 * Episode 02 — Scene 5: THE CCTV TWIST (35–49s, frames 1050–1470)
 * High Suspense Climax:
 * - A nearby CRT surveillance monitor turns on by itself.
 * - Shows live CAM 08: Aarav at the desk.
 * - A tall dark silhouette stands directly behind Aarav on camera.
 * - Aarav spins around: The physical corridor is completely EMPTY!
 * - Cut back to screen: Silhouette has moved CLOSER with glowing red eyes!
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

export const Ep2Scene5CCTVTwist: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = frame;

  // Phase 1 (0-225): Monitor turns on, shows Aarav + shadow behind
  // Phase 2 (225-320): Aarav turns around to real corridor, empty!
  // Phase 3 (320-390): Look back at monitor: Shadow is CLOSER with glowing eyes!
  const phase = rel < 225 ? "monitor_reveal" : rel < 320 ? "turn_empty" : "shadow_closer";

  // Monitor CRT power on flash (rel 0–25)
  const crtFlash = interpolate(rel, [0, 8, 20], [0, 1, 0], { extrapolateRight: "clamp" });

  // Camera zoom on monitor during phase 3
  const camZoom = interpolate(rel, [315, 380], [1.0, 1.25], { extrapolateRight: "clamp" });

  // Scanline roll
  const scanline = (rel * 4) % 360;

  // Shadow scale spring (triggers as voice says "स्क्रीन पर आरव के पीछे कोई खड़ा था")
  const shadowSpring = spring({ frame: rel - 75, fps, config: { damping: 14, stiffness: 120 } });

  // Aarav pose
  const aaravPose = phase === "monitor_reveal" ? "shock" : phase === "turn_empty" ? "turning" : "fear";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020408",
        overflow: "hidden",
        transform: `scale(${camZoom})`,
        transformOrigin: "540px 800px",
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="cctvTwistBg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#081E14" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
          <pattern id="scanlinesEp2" patternUnits="userSpaceOnUse" width="1" height="4">
            <rect width="1" height="2" fill="rgba(0,0,0,0.4)" />
          </pattern>
        </defs>

        <rect width="1080" height="1920" fill="url(#cctvTwistBg)" />

        {/* ── Security Room & Desk ─────────────────────────────── */}
        <rect x="0" y="1280" width="1080" height="640" fill="#040A10" />

        {/* ── The CRT Surveillance Monitor (Centerpiece) ──────── */}
        <g transform="translate(140, 340)">
          {/* Heavy Bezel */}
          <rect width="800" height="820" rx="24" fill="#03080E" stroke="#00D4D4" strokeWidth="5" />
          {/* Screen Inner Bezel */}
          <rect x="20" y="20" width="760" height="780" rx="14" fill="#06180C" />

          {/* CRT Screen Scanlines */}
          <rect x="20" y="20" width="760" height="780" fill="url(#scanlinesEp2)" opacity="0.65" />
          <rect x="20" y={20 + scanline} width="760" height="8" fill="rgba(34,197,94,0.15)" />

          {/* ── Surveillance Perspective: Live B1 Desk ────────── */}
          {/* Concrete Pillars on Camera */}
          <rect x="80" y="100" width="120" height="660" fill="#041208" />
          <rect x="600" y="100" width="120" height="660" fill="#041208" />
          {/* Desk in screen */}
          <rect x="260" y="520" width="280" height="120" rx="4" fill="#072010" stroke="#0D3818" strokeWidth="2" />

          {/* Aarav Figure on CCTV Screen */}
          <g transform="translate(380, 420)" opacity="0.85">
            <circle cx="30" cy="20" r="18" fill="#0D2E14" />
            <ellipse cx="30" cy="70" rx="22" ry="40" fill="#0D2E14" />
            <line x1="10" y1="50" x2="-5" y2="80" stroke="#0D2E14" strokeWidth="8" strokeLinecap="round" />
            <line x1="50" y1="50" x2="65" y2="80" stroke="#0D2E14" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* ══════════════════════════════════════════════════════
              THE DARK SILHOUETTE BEHIND AARAV
             ══════════════════════════════════════════════════════ */}
          {rel > 40 && phase !== "turn_empty" && (
            <g
              transform={`translate(${phase === "shadow_closer" ? 330 : 310}, ${phase === "shadow_closer" ? 310 : 340}) scale(${Math.max(0, shadowSpring)})`}
              style={{ transformOrigin: "50px 80px" }}
            >
              {/* Massive tall shadow */}
              <circle cx="50" cy="20" r={phase === "shadow_closer" ? 32 : 26} fill="#000000" />
              <ellipse cx="50" cy="110" rx={phase === "shadow_closer" ? 48 : 36} ry="80" fill="#000000" />
              {/* Arms */}
              <line x1="15" y1="60" x2="-20" y2="120" stroke="#000000" strokeWidth="14" strokeLinecap="round" />
              <line x1="85" y1="60" x2="120" y2="120" stroke="#000000" strokeWidth="14" strokeLinecap="round" />
              {/* Piercing Red Eyes */}
              <circle cx="40" cy="18" r="5" fill="#DC2626" opacity="0.9" />
              <circle cx="60" cy="18" r="5" fill="#DC2626" opacity="0.9" />
            </g>
          )}

          {/* CAM 08 HUD Info */}
          <rect x="35" y="35" width="160" height="34" rx="4" fill="rgba(0,0,0,0.6)" />
          <text x="45" y="58" fill="#22C55E" fontSize="17" fontFamily="monospace" fontWeight="900">
            CAM 08 — B1 DESK
          </text>
          <circle cx="740" cy="50" r="9" fill="#DC2626" />
          <text x="680" y="56" fill="#DC2626" fontSize="16" fontFamily="monospace" fontWeight="800">
            LIVE
          </text>

          {/* MOTION WARNING BANNER */}
          {rel > 80 && (
            <g transform="translate(30, 720)">
              <rect width="740" height="60" rx="8" fill="rgba(220,38,38,0.5)" />
              <text x="370" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontFamily="monospace" fontWeight="900">
                ⚠ MOTION DETECTED: SUBJECT IN REAR
              </text>
            </g>
          )}

          {/* Screen Flash on Power-On */}
          <rect x="20" y="20" width="760" height="780" rx="14" fill="#22C55E" opacity={crtFlash * 0.7} />
        </g>

        {/* ── If Phase 2: Aarav turns to real corridor (EMPTY!) ── */}
        {phase === "turn_empty" && (
          <g transform="translate(540, 1220)">
            <rect x="-240" y="-30" width="480" height="60" rx="12" fill="#0C1D2E" stroke="#00D4D4" strokeWidth="2" />
            <text x="0" y="8" textAnchor="middle" fill="#00D4D4" fontSize="22" fontWeight="900">
              पीछे देखा — कोई नहीं था!
            </text>
          </g>
        )}
      </svg>

      {/* Aarav standing in front of the monitor */}
      <div
        style={{
          position: "absolute",
          bottom: 440,
          left: phase === "turn_empty" ? 420 : 660,
          zIndex: 30,
        }}
      >
        <Aarav pose={aaravPose} scale={1.25} facing={phase === "turn_empty" ? "left" : "right"} />
      </div>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={rel + scene.startFrame} />
    </div>
  );
};

