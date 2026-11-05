/**
 * Scene 5: THE CCTV REVEAL — 36–50s (frames 1080–1500, relative 0–420)
 * Aarav in security room. 4-camera CCTV grid, CAM-07 corridor.
 * At rel~240 a dark silhouette appears behind Aarav on CAM-07.
 * Aarav reacts with shock.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HindiScene } from "../episodeConfig";
import { HindiCaptions } from "../HindiCaptions";
import { HindiOverlay } from "../HindiOverlay";
import { Aarav } from "../Aarav";

interface Props { scene: HindiScene; }

export const HScene5CCTV: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = frame;

  // Camera zooms into CAM-07 screen at reveal
  const cam07Zoom = interpolate(rel, [220, 280], [1, 1.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cam07X = interpolate(rel, [220, 280], [0, -120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cam07Y = interpolate(rel, [220, 280], [0, -80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scanline scroll offset
  const scanline = (rel * 3) % 420;

  // Silhouette: grows behind Aarav on CAM-07 at rel=240
  const silhouetteScale = spring({ frame: rel - 240, fps, config: { damping: 18, stiffness: 80 } });
  const silhouetteOpacity = interpolate(rel, [240, 290], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Glitch distortion at reveal
  const glitchX = rel > 240 && rel < 270
    ? (rel % 6 < 3 ? 8 : -8)
    : 0;

  // Aarav pose
  const aaravPose = rel < 240 ? "standing" : "shock";

  // CCTV timestamp tick (flicker every 30 frames)
  const timeHH = "00";
  const timeMM = String(14 + Math.floor(rel / 180)).padStart(2, "0");
  const timeSS = String(Math.floor((rel * 2) % 60)).padStart(2, "0");

  // CAM 07 highlight spring (label blinks)
  const cam07Blink = rel > 90 && rel < 180 ? (rel % 10 < 5 ? 1 : 0.4) : 1;

  // "KOI KHADA THA" reveal text
  const revealScale = spring({ frame: rel - 310, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020408",
        overflow: "hidden",
      }}
    >
      {/* Background — security room */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="cctv5Atmo" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0A2010" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#020408" stopOpacity="0" />
          </radialGradient>
          {/* Green phosphor texture for CCTV screens */}
          <pattern id="scanlines5" patternUnits="userSpaceOnUse" width="1" height="4">
            <rect width="1" height="2" fill="rgba(0,0,0,0.3)" />
          </pattern>
        </defs>

        <rect width="1080" height="1920" fill="#020408" />
        <rect width="1080" height="1920" fill="url(#cctv5Atmo)" />

        {/* ── Security room environment ─────────────────────────── */}
        {/* Back wall */}
        <rect x="0" y="200" width="1080" height="800" fill="#04080C" stroke="#0A1218" strokeWidth="2" />
        {/* Floor */}
        <rect x="0" y="1360" width="1080" height="560" fill="#030608" />
        {/* Desk */}
        <rect x="80" y="1240" width="920" height="130" rx="6" fill="#060C14" stroke="#0C1A26" strokeWidth="3" />
        <rect x="120" y="1200" width="840" height="50" rx="4" fill="#08101C" stroke="#0C1A26" strokeWidth="2" />

        {/* ── 4-Camera CCTV monitor grid ───────────────────────── */}
        {/* Monitor bezel */}
        <rect x="90" y="240" width="900" height="940" rx="12" fill="#030810" stroke="#0C1A26" strokeWidth="5" />
        {/* Monitor inner */}
        <rect x="100" y="250" width="880" height="920" rx="8" fill="#061010" />

        {/* ── CAM 01 (top-left) ──────────────────────────────── */}
        <g transform="translate(104, 254)">
          <rect width="430" height="445" rx="4" fill="#07140A" />
          {/* Scene — static corridor */}
          <rect width="430" height="445" fill="url(#scanlines5)" opacity="0.5" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={i * 70} y1="0" x2={i * 70} y2="445" stroke="#0A180C" strokeWidth="1" />
          ))}
          {/* Hallway perspective */}
          <polygon points="0,445 215,180 430,445" fill="#06120A" />
          <line x1="215" y1="180" x2="0" y2="445" stroke="#0C1E10" strokeWidth="1" />
          <line x1="215" y1="180" x2="430" y2="445" stroke="#0C1E10" strokeWidth="1" />
          {/* CAM label */}
          <rect x="4" y="4" width="80" height="22" rx="3" fill="rgba(0,0,0,0.6)" />
          <text x="8" y="20" fill="#22C55E" fontSize="14" fontFamily="monospace" fontWeight="700">CAM 01</text>
          {/* REC dot */}
          <circle cx="400" cy="15" r="6" fill="#DC2626" opacity={rel % 60 < 30 ? 1 : 0.3} />
          {/* timestamp */}
          <text x="8" y="438" fill="#22C55E" fontSize="12" fontFamily="monospace">{`${timeHH}:${timeMM}:${timeSS}`}</text>
        </g>

        {/* ── CAM 02 (top-right) ────────────────────────────── */}
        <g transform="translate(546, 254)">
          <rect width="430" height="445" rx="4" fill="#07140A" />
          <rect width="430" height="445" fill="url(#scanlines5)" opacity="0.5" />
          {/* Parking floor view */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1="0" y1={120 + i * 65} x2="430" y2={120 + i * 65} stroke="#0A180C" strokeWidth="1" />
          ))}
          <text x="8" y="20" fill="#22C55E" fontSize="14" fontFamily="monospace" fontWeight="700">CAM 02</text>
          <circle cx="400" cy="15" r="6" fill="#DC2626" opacity={rel % 60 < 30 ? 1 : 0.3} />
          <text x="8" y="438" fill="#22C55E" fontSize="12" fontFamily="monospace">{`${timeHH}:${timeMM}:${timeSS}`}</text>
        </g>

        {/* ── CAM 03 (bottom-left) ──────────────────────────── */}
        <g transform="translate(104, 711)">
          <rect width="430" height="445" rx="4" fill="#07140A" />
          <rect width="430" height="445" fill="url(#scanlines5)" opacity="0.5" />
          {/* Entrance view */}
          <rect x="150" y="200" width="130" height="245" rx="4" fill="#06110A" stroke="#0C1E10" strokeWidth="1" />
          <text x="8" y="20" fill="#22C55E" fontSize="14" fontFamily="monospace" fontWeight="700">CAM 03</text>
          <circle cx="400" cy="15" r="6" fill="#DC2626" opacity={rel % 60 < 30 ? 1 : 0.3} />
          <text x="8" y="438" fill="#22C55E" fontSize="12" fontFamily="monospace">{`${timeHH}:${timeMM}:${timeSS}`}</text>
        </g>

        {/* ── CAM 07 (bottom-right) — MAIN REVEAL CAMERA ────── */}
        <g
          transform={`translate(${546 + cam07X}, ${711 + cam07Y}) scale(${cam07Zoom})`}
          style={{ transformOrigin: "215px 222px" }}
        >
          <rect width="430" height="445" rx="4" fill="#061408" />
          {/* Scanlines scroll */}
          <rect
            x="0"
            y={-445 + scanline}
            width="430"
            height="890"
            fill="url(#scanlines5)"
            opacity="0.7"
          />
          {/* Corridor scene — same corridor as before */}
          <polygon points="0,445 215,160 430,445" fill="#07160A" />
          <line x1="215" y1="160" x2="0" y2="445" stroke="#0C1E10" strokeWidth="1.5" />
          <line x1="215" y1="160" x2="430" y2="445" stroke="#0C1E10" strokeWidth="1.5" />
          {/* Floor grid */}
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={i} x1="0" y1={270 + i * 45} x2="430" y2={270 + i * 45} stroke="#081608" strokeWidth="1" />
          ))}
          {/* Ceiling light strip — faint */}
          <rect x="130" y="2" width="170" height="5" rx="2" fill="rgba(0,180,120,0.3)" />
          {/* Glitch offset on corridor */}
          <rect
            x={glitchX}
            y="0"
            width="430"
            height="20"
            fill="rgba(0,212,100,0.07)"
            opacity={rel > 240 && rel < 270 ? 1 : 0}
          />

          {/* ── Aarav figure on CCTV (small, stylized green) ── */}
          <g transform="translate(145, 240)" opacity="0.8">
            {/* Body silhouette green */}
            <ellipse cx="45" cy="80" rx="20" ry="40" fill="#0E2A14" />
            <circle cx="45" cy="22" r="18" fill="#0E2A14" />
            <line x1="25" y1="50" x2="10" y2="90" stroke="#0E2A14" strokeWidth="8" strokeLinecap="round" />
            <line x1="65" y1="50" x2="80" y2="90" stroke="#0E2A14" strokeWidth="8" strokeLinecap="round" />
            <line x1="35" y1="118" x2="28" y2="168" stroke="#0E2A14" strokeWidth="8" strokeLinecap="round" />
            <line x1="55" y1="118" x2="62" y2="168" stroke="#0E2A14" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* ── Dark silhouette behind Aarav (THE REVEAL) ────── */}
          {rel > 240 && (
            <g
              transform={`translate(80, 160) scale(${Math.max(0, silhouetteScale)})`}
              style={{ transformOrigin: "55px 100px" }}
              opacity={silhouetteOpacity}
            >
              {/* Taller, broader — not human proportioned */}
              <ellipse cx="55" cy="130" rx="32" ry="62" fill="#000000" />
              <circle cx="55" cy="30" r="26" fill="#000000" />
              {/* Arms wider than normal */}
              <line x1="23" y1="80" x2="-10" y2="130" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
              <line x1="87" y1="80" x2="120" y2="130" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
              <line x1="43" y1="190" x2="36" y2="250" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
              <line x1="67" y1="190" x2="74" y2="250" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
              {/* Faint red eyes */}
              <circle cx="44" cy="26" r="4" fill="#DC2626" opacity="0.7" />
              <circle cx="66" cy="26" r="4" fill="#DC2626" opacity="0.7" />
            </g>
          )}

          {/* CAM 07 label — highlighted */}
          <rect x="4" y="4" width="90" height="22" rx="3" fill="rgba(220,38,38,0.3)" />
          <text x="8" y="20" fill="#22C55E" fontSize="14" fontFamily="monospace" fontWeight="700"
            opacity={cam07Blink}>CAM 07</text>
          <circle cx="405" cy="15" r="6" fill="#DC2626" opacity={rel % 60 < 30 ? 1 : 0.3} />
          <text x="8" y="438" fill="#22C55E" fontSize="12" fontFamily="monospace">{`${timeHH}:${timeMM}:${timeSS}`}</text>

          {/* ALERT label at reveal */}
          {rel > 320 && (
            <rect x="130" y="410" width="170" height="28" rx="4" fill="rgba(220,38,38,0.4)"
              opacity={rel % 20 < 10 ? 1 : 0.5} />
          )}
          {rel > 320 && (
            <text x="215" y="430" textAnchor="middle" fill="#F87171" fontSize="14"
              fontFamily="monospace" fontWeight="800">⚠ MOTION DETECTED</text>
          )}
        </g>

        {/* Monitor grid dividers */}
        <line x1="540" y1="254" x2="540" y2="1170" stroke="#000000" strokeWidth="4" />
        <line x1="100" y1="710" x2="976" y2="710" stroke="#000000" strokeWidth="4" />

        {/* Monitor brand strip */}
        <rect x="90" y="1172" width="900" height="18" rx="4" fill="#040A0C" />
        <text x="540" y="1185" textAnchor="middle" fill="#0C1A20" fontSize="11"
          fontFamily="monospace">VISIONTECH SECURITY SYSTEMS — 8-CH DVR</text>

        {/* Keyboard on desk */}
        <rect x="300" y="1210" width="480" height="30" rx="4" fill="#060E18" stroke="#0C1A26" strokeWidth="1.5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={312 + i * 38} y="1216" width="30" height="18" rx="3"
            fill="#08121E" stroke="#0E1E30" strokeWidth="1" />
        ))}
      </svg>

      {/* "कोई खड़ा था!" reveal text overlay */}
      {rel > 310 && (
        <div
          style={{
            position: "absolute",
            top: 1120,
            left: "50%",
            transform: `translateX(-50%) scale(${Math.max(0, revealScale)})`,
            transformOrigin: "center center",
            textAlign: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(220,38,38,0.2)",
              border: "2px solid #DC2626",
              borderRadius: 12,
              padding: "12px 32px",
            }}
          >
            <div
              style={{
                fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
                fontSize: 32,
                fontWeight: 900,
                color: "#DC2626",
                letterSpacing: 2,
              }}
            >
              कोई खड़ा था!
            </div>
          </div>
        </div>
      )}

      {/* Aarav in security room (foreground, right side) */}
      <div
        style={{
          position: "absolute",
          bottom: 480,
          right: 60,
          zIndex: 30,
        }}
      >
        <Aarav pose={aaravPose} scale={1.1} facing="left" />
      </div>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={frame + scene.startFrame} />
    </div>
  );
};

