/**
 * Scene 1: THE HOOK — 0-4s
 * Elevator doors open in a dark mall. Floor indicator: 0 → 3.
 * First visual event immediately — no intro, pure curiosity hook.
 */
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { HindiScene } from "../episodeConfig";
import { HindiCaptions } from "../HindiCaptions";
import { HindiOverlay } from "../HindiOverlay";
import { HINDI_DESIGN } from "../designSystem";

interface Props { scene: HindiScene; }

export const HScene1Hook: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();

  // Elevator doors: start closed, slide open at frame 10
  const leftDoorX = interpolate(frame, [10, 40], [0, -260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightDoorX = interpolate(frame, [10, 40], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floor counter — G→1→2→3 animating at frame 50
  const floorStep = Math.min(3, Math.floor((frame - 50) / 12));
  const floorLabel = floorStep <= 0 ? "G" : String(floorStep);

  // Dramatic zoom-in pull
  const zoom = interpolate(frame, [0, 120], [1, 1.12], {
    extrapolateRight: "clamp",
  });

  // Flash on door open
  const flashOpacity = interpolate(frame, [38, 42, 46], [0, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flicker lights inside the elevator
  const elevatorLightIntensity = 0.7 + 0.3 * Math.sin(frame * 0.8);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: HINDI_DESIGN.colors.bg,
        overflow: "hidden",
        transform: `scale(${zoom})`,
        transformOrigin: "center 60%",
      }}
    >
      {/* ── Mall corridor background ──────────────────────────────── */}
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1020" />
            <stop offset="100%" stopColor="#05080F" />
          </linearGradient>
          <radialGradient id="corridorLight" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0F2040" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#05080F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="elevatorInteriorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(0,100,100,${elevatorLightIntensity * 0.3})`} />
            <stop offset="100%" stopColor="#0A1A1A" />
          </linearGradient>
        </defs>

        {/* Background walls */}
        <rect width="1080" height="1920" fill="url(#floorGrad)" />
        <rect width="1080" height="1920" fill="url(#corridorLight)" />

        {/* Ceiling recessed lighting strips */}
        {[180, 540, 900].map((x, i) => (
          <g key={i} opacity={0.4 + 0.1 * Math.sin(frame * 0.03 + i)}>
            <rect x={x - 60} y="80" width="120" height="8" rx="4" fill="#00A8A8" />
            <rect x={x - 40} y="88" width="80" height="2" fill="#00D4D4" opacity="0.8" />
          </g>
        ))}

        {/* Floor marble tiles */}
        <rect x="0" y="1300" width="1080" height="620" fill="#0A0E18" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={i * 160} y1="1300" x2={i * 160} y2="1920" stroke="#141C2E" strokeWidth="2" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i} x1="0" y1={1300 + i * 155} x2="1080" y2={1300 + i * 155} stroke="#141C2E" strokeWidth="2" />
        ))}

        {/* Wall perspective lines */}
        <line x1="0" y1="600" x2="400" y2="900" stroke="#141C2E" strokeWidth="3" />
        <line x1="1080" y1="600" x2="680" y2="900" stroke="#141C2E" strokeWidth="3" />

        {/* Closed shop shutters on sides */}
        <rect x="0" y="600" width="300" height="700" fill="#0A1420" stroke="#141C2E" strokeWidth="4" />
        <rect x="780" y="600" width="300" height="700" fill="#0A1420" stroke="#141C2E" strokeWidth="4" />
        {/* Shutter lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1="0" y1={600 + i * 88} x2="300" y2={600 + i * 88} stroke="#141C2E" strokeWidth="2" />
            <line x1="780" y1={600 + i * 88} x2="1080" y2={600 + i * 88} stroke="#141C2E" strokeWidth="2" />
          </React.Fragment>
        ))}

        {/* ── Elevator shaft frame ─────────────────────────────── */}
        <rect x="330" y="500" width="420" height="800" fill="#070C18" stroke="#1A2A40" strokeWidth="6" rx="4" />

        {/* Elevator interior glow (visible after doors open) */}
        <rect x="336" y="506" width="408" height="788" fill="url(#elevatorInteriorGrad)" />

        {/* Elevator interior detail */}
        {frame > 38 && (
          <>
            {/* Back wall */}
            <rect x="360" y="530" width="360" height="740" fill="#0A1A20" />
            {/* Mirror panel */}
            <rect x="380" y="560" width="140" height="300" rx="4" fill="#0D1E28" stroke="#1A3040" strokeWidth="2" />
            <rect x="560" y="560" width="140" height="300" rx="4" fill="#0D1E28" stroke="#1A3040" strokeWidth="2" />
            {/* Handrail */}
            <rect x="370" y="880" width="340" height="10" rx="5" fill="#1A3040" />
            {/* Floor indicator strip in elevator */}
            <rect x="490" y="540" width="100" height="30" rx="5" fill="#0A1A20" stroke="#00D4D4" strokeWidth="1" />
            <text x="540" y="562" textAnchor="middle" fill="#00D4D4" fontSize="18" fontFamily="monospace" fontWeight="700">
              {floorLabel}
            </text>
            {/* Eerie empty elevator — no one inside */}
            {/* Faint shadow on floor */}
            <ellipse cx="540" cy="1270" rx="80" ry="20" fill="rgba(0,0,0,0.5)" />
          </>
        )}

        {/* ── ELEVATOR DOORS ──────────────────────────────────── */}
        {/* Left door */}
        <rect
          x={330 + leftDoorX}
          y="500"
          width="210"
          height="800"
          fill="#111D2E"
          stroke="#1A2A40"
          strokeWidth="4"
        />
        {/* Left door panel detail */}
        <rect x={340 + leftDoorX} y="520" width="10" height="760" rx="5" fill="#0A1428" />
        <rect x={350 + leftDoorX} y="600" width="150" height="2" fill="#1A3040" />
        <rect x={350 + leftDoorX} y="800" width="150" height="2" fill="#1A3040" />
        <rect x={350 + leftDoorX} y="1000" width="150" height="2" fill="#1A3040" />
        {/* Door gap seam light */}
        <rect x={528 + leftDoorX} y="500" width="4" height="800" fill={`rgba(0,212,212,${0.3 + 0.2 * Math.sin(frame * 0.15)})`} />

        {/* Right door */}
        <rect
          x={540 + rightDoorX}
          y="500"
          width="210"
          height="800"
          fill="#111D2E"
          stroke="#1A2A40"
          strokeWidth="4"
        />
        <rect x={720 + rightDoorX} y="520" width="10" height="760" rx="5" fill="#0A1428" />
        <rect x={550 + rightDoorX} y="600" width="150" height="2" fill="#1A3040" />
        <rect x={550 + rightDoorX} y="800" width="150" height="2" fill="#1A3040" />
        <rect x={550 + rightDoorX} y="1000" width="150" height="2" fill="#1A3040" />

        {/* ── Floor counter display above doors ─────────────── */}
        <rect x="430" y="440" width="220" height="55" rx="8" fill="#030810" stroke="#00D4D4" strokeWidth="2" />
        <text
          x="540"
          y="480"
          textAnchor="middle"
          fill="#00D4D4"
          fontSize="32"
          fontFamily="monospace"
          fontWeight="900"
          filter="drop-shadow(0 0 8px #00D4D4)"
        >
          {floorLabel}
        </text>

        {/* ── Timestamp overlay top ────────────────────────────── */}
        <text x="540" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontFamily="monospace" fontWeight="700" opacity="0.8">
          12:07 AM — MALL CLOSED
        </text>
        {/* Top red line under timestamp */}
        <rect x="380" y="208" width="320" height="2" fill="#DC2626" opacity="0.7" />
      </svg>

      {/* ── Door open flash ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#00D4D4",
          opacity: flashOpacity,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      <HindiOverlay
        sceneTitle={scene.titleEnglish}
        timecode={scene.timecode}
      />
      <HindiCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};

