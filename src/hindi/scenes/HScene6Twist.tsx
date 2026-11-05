/**
 * Scene 6: THE TWIST — 50–54s (frames 1500–1620, relative 0–120)
 * Aarav turns around in corridor — it's empty.
 * Cut back to CCTV — silhouette has MOVED CLOSER.
 * Dramatic impact flash.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HindiScene } from "../episodeConfig";
import { HindiCaptions } from "../HindiCaptions";
import { HindiOverlay } from "../HindiOverlay";
import { Aarav } from "../Aarav";

interface Props { scene: HindiScene; }

export const HScene6Twist: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = frame;

  // Phase 1: rel 0-50 — Aarav turning in corridor
  // Phase 2: rel 50-80 — Impact flash + black frame
  // Phase 3: rel 80-120 — CCTV cut showing silhouette closer

  const phase = rel < 50 ? "corridor" : rel < 80 ? "impact" : "cctv";

  // Impact flash at rel=50-60
  const impactFlash = interpolate(rel, [48, 52, 58, 64], [0, 1, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CCTV fade in after flash
  const cctvOpacity = interpolate(rel, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Corridor cam — Aarav turns, then reveal of empty corridor
  const camZoom = interpolate(rel, [0, 50], [1.1, 1.0], { extrapolateRight: "clamp" });

  // Scanlines for CCTV phase
  const scanline = (rel * 4) % 300;

  // Aarav pose: lookAround → turning → shock
  const aaravPose = rel < 20 ? "lookAround" : rel < 50 ? "turning" : "shock";

  // "KHAALI THA" text spring
  const khaaliScale = spring({ frame: rel - 30, fps, config: { damping: 14, stiffness: 200 } });

  // Screen shake at impact
  const shakeX = phase === "impact" ? Math.sin(rel * 3.5) * 12 : 0;
  const shakeY = phase === "impact" ? Math.cos(rel * 2.8) * 8 : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020408",
        overflow: "hidden",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* ── Phase 1: CORRIDOR — Aarav turns to find nothing ───── */}
      {phase !== "cctv" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${camZoom})`,
            transformOrigin: "540px 900px",
          }}
        >
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <radialGradient id="twist6Atmo" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#0A1A30" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#020408" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1080" height="1920" fill="#030609" />
            <rect width="1080" height="1920" fill="url(#twist6Atmo)" />

            {/* Floor */}
            <rect x="0" y="1340" width="1080" height="580" fill="#04070C" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={i * 140} y1="1340" x2={i * 140} y2="1920" stroke="#06080F" strokeWidth="2" />
            ))}

            {/* Corridor walls */}
            <rect x="0" y="260" width="150" height="1080" fill="#050818" stroke="#0A1322" strokeWidth="2" />
            <rect x="930" y="260" width="150" height="1080" fill="#050818" stroke="#0A1322" strokeWidth="2" />

            {/* Single dim overhead lamp — survival lamp */}
            <rect x="470" y="68" width="140" height="8" rx="4" fill="rgba(244,161,54,0.3)" />
            <ellipse cx="540" cy="75" rx="200" ry="300" fill="rgba(244,161,54,0.06)" />

            {/* Depth perspective lines */}
            <line x1="0" y1="1340" x2="540" y2="800" stroke="#07090F" strokeWidth="1.5" />
            <line x1="1080" y1="1340" x2="540" y2="800" stroke="#07090F" strokeWidth="1.5" />
            <line x1="0" y1="260" x2="540" y2="800" stroke="#07090F" strokeWidth="1.5" />
            <line x1="1080" y1="260" x2="540" y2="800" stroke="#07090F" strokeWidth="1.5" />

            {/* Corridor is EMPTY — emphasize with text at rel>30 */}
            {rel > 30 && (
              <g transform={`translate(540, 760) scale(${Math.max(0, khaaliScale)})`}
                style={{ transformOrigin: "0 0" }}>
                <text
                  textAnchor="middle"
                  fill="rgba(0,212,212,0.3)"
                  fontSize="28"
                  fontFamily="monospace"
                  fontWeight="600"
                  letterSpacing="8"
                >
                  — KHAALI —
                </text>
              </g>
            )}
          </svg>

          {/* Aarav turning to look behind */}
          <div
            style={{
              position: "absolute",
              bottom: 500,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 30,
            }}
          >
            <Aarav pose={aaravPose} scale={1.3} facing="left" />
          </div>
        </div>
      )}

      {/* ── Phase 3: CCTV showing silhouette CLOSER ─────────────── */}
      {phase === "cctv" && (
        <div style={{ position: "absolute", inset: 0, opacity: cctvOpacity }}>
          <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id="scan6" patternUnits="userSpaceOnUse" width="1" height="4">
                <rect width="1" height="2" fill="rgba(0,0,0,0.35)" />
              </pattern>
            </defs>
            <rect width="1080" height="1920" fill="#040C06" />

            {/* Full-screen CAM-07 view */}
            <rect x="0" y="0" width="1080" height="1920" fill="#061008" />
            <rect x="0" y={-300 + scanline} width="1080" height="2240" fill="url(#scan6)" opacity="0.8" />

            {/* Corridor scene in green phosphor */}
            <polygon points="0,1920 540,600 1080,1920" fill="#08180A" />
            <line x1="540" y1="600" x2="0" y2="1920" stroke="#0D2210" strokeWidth="2" />
            <line x1="540" y1="600" x2="1080" y2="1920" stroke="#0D2210" strokeWidth="2" />
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={i} x1="0" y1={900 + i * 200} x2="1080" y2={900 + i * 200}
                stroke="#08140A" strokeWidth="2" />
            ))}

            {/* Aarav figure on CCTV (small) */}
            <g transform="translate(430, 860)" opacity="0.7">
              <circle cx="50" cy="30" r="28" fill="#0E2A14" />
              <ellipse cx="50" cy="100" rx="26" ry="52" fill="#0E2A14" />
              <line x1="24" y1="68" x2="8" y2="118" stroke="#0E2A14" strokeWidth="10" strokeLinecap="round" />
              <line x1="76" y1="68" x2="92" y2="118" stroke="#0E2A14" strokeWidth="10" strokeLinecap="round" />
              <line x1="38" y1="150" x2="30" y2="210" stroke="#0E2A14" strokeWidth="10" strokeLinecap="round" />
              <line x1="62" y1="150" x2="70" y2="210" stroke="#0E2A14" strokeWidth="10" strokeLinecap="round" />
            </g>

            {/* SILHOUETTE — VERY CLOSE — just behind Aarav */}
            <g transform="translate(300, 720)" opacity="0.95">
              {/* Much larger this time — it moved */}
              <ellipse cx="80" cy="180" rx="55" ry="90" fill="#000000" />
              <circle cx="80" cy="45" r="42" fill="#000000" />
              <line x1="25" y1="110" x2="-30" y2="190" stroke="#000000" strokeWidth="18" strokeLinecap="round" />
              <line x1="135" y1="110" x2="190" y2="190" stroke="#000000" strokeWidth="18" strokeLinecap="round" />
              <line x1="58" y1="268" x2="48" y2="360" stroke="#000000" strokeWidth="14" strokeLinecap="round" />
              <line x1="102" y1="268" x2="112" y2="360" stroke="#000000" strokeWidth="14" strokeLinecap="round" />
              {/* Eyes */}
              <circle cx="64" cy="40" r="8" fill="#DC2626" opacity="0.9" />
              <circle cx="96" cy="40" r="8" fill="#DC2626" opacity="0.9" />
              {/* Eye glow pulse */}
              <circle cx="64" cy="40" r={8 + 4 * Math.sin(rel * 0.3)}
                fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.4" />
              <circle cx="96" cy="40" r={8 + 4 * Math.sin(rel * 0.3)}
                fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.4" />
            </g>

            {/* CAM-07 UI */}
            <rect x="8" y="8" width="100" height="26" rx="4" fill="rgba(0,0,0,0.6)" />
            <text x="14" y="26" fill="#22C55E" fontSize="16" fontFamily="monospace" fontWeight="700">CAM 07</text>
            <circle cx="1060" cy="21" r="8" fill="#DC2626" opacity={rel % 60 < 30 ? 1 : 0.3} />
            <text x="8" y="1908" fill="#22C55E" fontSize="14" fontFamily="monospace">12:14:47</text>

            {/* ALERT banner */}
            <rect x="0" y="1850" width="1080" height="62" fill="rgba(220,38,38,0.4)"
              opacity={rel % 20 < 10 ? 1 : 0.6} />
            <text x="540" y="1888" textAnchor="middle" fill="#FFFFFF" fontSize="22"
              fontFamily="monospace" fontWeight="800">⚠ MOTION DETECTED — CAM 07</text>
          </svg>
        </div>
      )}

      {/* ── Impact flash overlay ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#FFFFFF",
          opacity: impactFlash * 0.9,
          pointerEvents: "none",
        }}
      />
      {/* Red flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#DC2626",
          opacity: impactFlash * 0.5,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={frame + scene.startFrame} />
    </div>
  );
};

