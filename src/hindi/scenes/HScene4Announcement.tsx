/**
 * Scene 4: THE VOICE — 27–36s (frames 810–1080, relative 0–270)
 * PA speaker crackles. "Aarav... tum akele nahi ho."
 * Corridor lights switch off one by one. Aarav frozen in fear.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HindiScene } from "../episodeConfig";
import { HindiCaptions } from "../HindiCaptions";
import { HindiOverlay } from "../HindiOverlay";
import { Aarav } from "../Aarav";

interface Props { scene: HindiScene; }

export const HScene4Announcement: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame (scene.startFrame = 810, inside Sequence frame starts at 0)
  const rel = frame;

  // Camera — slow push in toward speaker on wall
  const camZoom = interpolate(rel, [0, 270], [1, 1.18], { extrapolateRight: "clamp" });

  // Static crackle opacity on speaker — fires around rel=0-30
  const staticFlash = rel < 30 ? (rel % 5 < 2 ? 0.6 : 0) : 0;

  // "AARAV" text spring appears at rel=90
  const nameScale = spring({ frame: rel - 90, fps, config: { damping: 12, stiffness: 160 } });

  // "TUM AKELE NAHI HO" shakes slightly at rel=150
  const shakeX = rel > 150 && rel < 190
    ? Math.sin(rel * 1.4) * 6
    : 0;

  // Ceiling lights go off one by one: light0 off at rel=150, light1 at rel=190, light2 at rel=230
  const light0 = interpolate(rel, [145, 155], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const light1 = interpolate(rel, [185, 195], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const light2 = interpolate(rel, [225, 235], [0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Global darkness descends as lights go off
  const darkness = interpolate(rel, [120, 270], [0, 0.72], { extrapolateRight: "clamp" });

  // Red warning flash at critical moment (rel=160 — first "AARAV" call)
  const redFlash = interpolate(rel, [158, 162, 166, 170], [0, 0.25, 0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Aarav pose transitions
  const aaravPose = rel < 60 ? "standing" : rel < 150 ? "lookAround" : "fear";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#04060C",
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
          <radialGradient id="ann4AtmoGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#0A1A30" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#04060C" stopOpacity="0" />
          </radialGradient>
          {/* Warm spotlight under lamp 1 */}
          <radialGradient id="lamp4a" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#F4A136" stopOpacity={`${0.22 * light0}`} />
            <stop offset="100%" stopColor="#F4A136" stopOpacity="0" />
          </radialGradient>
          {/* Warm spotlight under lamp 2 */}
          <radialGradient id="lamp4b" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#F4A136" stopOpacity={`${0.22 * light1}`} />
            <stop offset="100%" stopColor="#F4A136" stopOpacity="0" />
          </radialGradient>
          {/* One surviving dim lamp spotlight */}
          <radialGradient id="lamp4c" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#F4A136" stopOpacity={`${0.14 * light2}`} />
            <stop offset="100%" stopColor="#F4A136" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="1080" height="1920" fill="#04060C" />
        <rect width="1080" height="1920" fill="url(#ann4AtmoGrad)" />

        {/* Floor */}
        <rect x="0" y="1340" width="1080" height="580" fill="#05070E" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 140} y1="1340" x2={i * 140} y2="1920" stroke="#07090F" strokeWidth="2" />
        ))}

        {/* Corridor wall panels */}
        <rect x="0" y="260" width="180" height="1080" fill="#060818" stroke="#0C1526" strokeWidth="2" />
        <rect x="900" y="260" width="180" height="1080" fill="#060818" stroke="#0C1526" strokeWidth="2" />
        {/* Middle corridor wall panels (narrow tiles) */}
        {[200, 350, 500, 650, 800].map((x, i) => (
          <rect key={i} x={x} y="280" width="4" height="1060" fill="#0A1020" />
        ))}

        {/* ── Ceiling lights ───────────────────────────────────── */}
        {/* Light 0 — left (goes off first) */}
        <rect x="130" y="78" width="140" height="8" rx="4" fill={`rgba(244,161,54,${light0 * 0.9})`} />
        <rect x="130" y="78" width="140" height="300" fill="url(#lamp4a)" />
        {/* Light 1 — center (goes off second) */}
        <rect x="470" y="78" width="140" height="8" rx="4" fill={`rgba(244,161,54,${light1 * 0.9})`} />
        <rect x="470" y="78" width="140" height="300" fill="url(#lamp4b)" />
        {/* Light 2 — right (last to dim out) */}
        <rect x="810" y="78" width="140" height="8" rx="4" fill={`rgba(244,161,54,${light2 * 0.9})`} />
        <rect x="810" y="78" width="140" height="300" fill="url(#lamp4c)" />

        {/* ── PA Speaker on right wall ─────────────────────────── */}
        <g transform="translate(830, 540)">
          {/* Housing */}
          <rect x="0" y="0" width="120" height="80" rx="8" fill="#0A1420" stroke="#1A2E40" strokeWidth="3" />
          {/* Speaker grille lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1="12" y1={14 + i * 11} x2="78" y2={14 + i * 11} stroke="#1E3A50" strokeWidth="2" />
          ))}
          {/* Speaker cone */}
          <ellipse cx="100" cy="40" rx="16" ry="30" fill="#0C1A28" stroke="#1A3040" strokeWidth="2" />
          {/* Static crackle overlay */}
          {rel < 50 && Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={8 + i * 10}
              y1={10 + (rel * 7 + i * 13) % 55}
              x2={8 + i * 10}
              y2={16 + (rel * 7 + i * 13) % 55}
              stroke={`rgba(0,212,212,${staticFlash})`}
              strokeWidth="1.5"
            />
          ))}
          {/* Active glow when speaking */}
          {rel > 80 && rel < 160 && (
            <circle cx="100" cy="40" r="20" fill="none" stroke="#00D4D4"
              strokeWidth="2" opacity={0.4 + 0.3 * Math.sin(rel * 0.5)} />
          )}
          {/* Mount bracket */}
          <rect x="50" y="-18" width="20" height="20" rx="3" fill="#0A1420" stroke="#1A2E40" strokeWidth="2" />
        </g>

        {/* ── AARAV NAME TAG that appears from speaker ─────────── */}
        {rel > 90 && (
          <g transform={`translate(540, 580) scale(${nameScale})`} style={{ transformOrigin: "0 0" }}>
            <rect x="-120" y="-30" width="240" height="60" rx="12"
              fill="rgba(220,38,38,0.15)" stroke="#DC2626" strokeWidth="2" />
            <text
              textAnchor="middle"
              y="12"
              fill="#F1F5F9"
              fontSize="30"
              fontFamily="'Noto Sans Devanagari', 'Mangal', sans-serif"
              fontWeight="800"
              letterSpacing="4"
            >
              « आरव »
            </text>
          </g>
        )}

        {/* ── "TUM AKELE NAHI HO" message panel ───────────────── */}
        {rel > 150 && (
          <g transform={`translate(${540 + shakeX}, 720)`}>
            <rect x="-200" y="-28" width="400" height="56" rx="10"
              fill="rgba(220,38,38,0.1)" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5" />
            <text
              textAnchor="middle"
              y="8"
              fill="#DC2626"
              fontSize="22"
              fontFamily="'Noto Sans Devanagari', 'Mangal', sans-serif"
              fontWeight="700"
            >
              तुम अकेले नहीं हो।
            </text>
          </g>
        )}

        {/* ── Corridor depth perspective lines ─────────────────── */}
        <line x1="0" y1="1340" x2="540" y2="800" stroke="#0A1020" strokeWidth="2" />
        <line x1="1080" y1="1340" x2="540" y2="800" stroke="#0A1020" strokeWidth="2" />
        {/* Ceiling line */}
        <line x1="0" y1="260" x2="540" y2="800" stroke="#0A1020" strokeWidth="2" />
        <line x1="1080" y1="260" x2="540" y2="800" stroke="#0A1020" strokeWidth="2" />

        {/* ── Darkness overlay rolling in ──────────────────────── */}
        <rect width="1080" height="1920" fill={`rgba(2,3,8,${darkness})`} />
      </svg>

      {/* Red flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#DC2626",
          opacity: redFlash,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* Aarav — mid-corridor frozen */}
      <div
        style={{
          position: "absolute",
          bottom: 500,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        <Aarav pose={aaravPose} scale={1.3} facing="right" />
      </div>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={frame + scene.startFrame} />
    </div>
  );
};

