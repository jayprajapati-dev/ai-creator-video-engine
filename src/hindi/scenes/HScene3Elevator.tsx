/**
 * Scene 3: THE ELEVATOR — 16-27s (frames 480-810)
 * Elevator bell rings. Floor indicator: G→1→2→3. Doors open — empty.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HindiScene } from "../episodeConfig";
import { HindiCaptions } from "../HindiCaptions";
import { HindiOverlay } from "../HindiOverlay";
import { Aarav } from "../Aarav";

interface Props { scene: HindiScene; }

export const HScene3Elevator: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame within scene (scene starts at 480)
  const rel = frame;

  // Camera tracks towards elevator then pulls back slowly
  const camZoom = interpolate(rel, [0, 200, 330], [1, 1.3, 1.25], {
    extrapolateRight: "clamp",
  });
  const camX = interpolate(rel, [0, 150], [0, -60], {
    extrapolateRight: "clamp",
  });

  // Floor animation: G(0-90), 1(90-150), 2(150-210), 3(210+)
  const floorLabels = ["G", "1", "2", "3"];
  const floorIdx = rel < 90 ? 0 : rel < 150 ? 1 : rel < 210 ? 2 : 3;
  const floorLabel = floorLabels[floorIdx];

  // Floor number flicker when changing
  const isFloorChange = (rel > 88 && rel < 95) || (rel > 148 && rel < 155) || (rel > 208 && rel < 215);
  const floorGlow = isFloorChange
    ? (rel % 4 < 2 ? 1 : 0.2)
    : 1;

  // Elevator doors: start closed until frame 240, then open
  const leftDoor = interpolate(rel, [240, 290], [0, -240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightDoor = interpolate(rel, [240, 290], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Aarav pose — standing in corridor, looking at elevator
  const aaravPose = rel < 240 ? "lookAround" : rel < 310 ? "fear" : "shock";

  // Door open flash
  const flashOp = interpolate(rel, [288, 292, 296], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "EMPTY" label spring
  const emptyLabel = spring({
    frame: rel - 300,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#04060C",
        overflow: "hidden",
        transform: `scale(${camZoom}) translateX(${camX}px)`,
        transformOrigin: "540px 900px",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="elev3Atmo" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#0A1A30" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#04060C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="elevInt3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(0,100,100,${floorIdx === 3 ? 0.25 : 0.1})`} />
            <stop offset="100%" stopColor="#05080F" />
          </linearGradient>
        </defs>

        <rect width="1080" height="1920" fill="#04060C" />
        <rect width="1080" height="1920" fill="url(#elev3Atmo)" />

        {/* Ceiling lights — dim corridor */}
        {[220, 540, 860].map((x, i) => (
          <g key={i} opacity={0.35}>
            <rect x={x - 50} y="80" width="100" height="6" rx="3" fill="#00A8A8" />
          </g>
        ))}

        {/* Wall panels */}
        <rect x="0" y="300" width="250" height="1000" fill="#06091A" stroke="#0F1A2E" strokeWidth="3" />
        <rect x="830" y="300" width="250" height="1000" fill="#06091A" stroke="#0F1A2E" strokeWidth="3" />

        {/* Floor */}
        <rect x="0" y="1300" width="1080" height="620" fill="#06080F" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={i * 155} y1="1300" x2={i * 155} y2="1920" stroke="#0A0F1A" strokeWidth="2" />
        ))}

        {/* ── Elevator shaft ─────────────────────────────────── */}
        <rect x="300" y="300" width="480" height="1000" fill="#040810" stroke="#0F1A2E" strokeWidth="6" rx="4" />

        {/* Elevator interior (visible when doors open) */}
        <rect x="306" y="306" width="468" height="988" fill="url(#elevInt3)" />

        {/* Back wall of elevator */}
        {rel > 230 && (
          <g>
            <rect x="330" y="330" width="420" height="950" fill="#060E18" />
            {/* Mirror-ish panels */}
            <rect x="350" y="360" width="170" height="380" rx="4" fill="#0A1A28" stroke="#1A3040" strokeWidth="1.5" />
            <rect x="560" y="360" width="170" height="380" rx="4" fill="#0A1A28" stroke="#1A3040" strokeWidth="1.5" />
            {/* Handrail */}
            <rect x="345" y="760" width="390" height="12" rx="6" fill="#1A3040" />
            {/* Floor number inside elevator */}
            <rect x="490" y="340" width="100" height="32" rx="5" fill="#040810" stroke="#00D4D4" strokeWidth="1.5" />
            <text x="540" y="364" textAnchor="middle" fill="#00D4D4" fontSize="20" fontFamily="monospace" fontWeight="800">
              {floorLabel}
            </text>
            {/* Empty elevator shadow */}
            <ellipse cx="540" cy="1260" rx="90" ry="20" fill="rgba(0,0,0,0.6)" />
            {/* "KHALI HAI" indicator */}
            {rel > 300 && (
              <text x="540" y="600" textAnchor="middle" fill="rgba(0,212,212,0.4)" fontSize="22" fontFamily="monospace"
                transform={`scale(${Math.max(0, emptyLabel)})`}
                style={{ transformOrigin: "540px 600px" }}>
                — KHALI HAI —
              </text>
            )}
          </g>
        )}

        {/* ── Elevator Doors ──────────────────────────────────── */}
        {/* Left door */}
        <rect x={300 + leftDoor} y="300" width="240" height="1000" fill="#0E1A2C" stroke="#141E2E" strokeWidth="4" />
        <rect x={308 + leftDoor} y="320" width="10" height="960" rx="5" fill="#08101C" />
        {[480, 680, 880, 1080].map((y, i) => (
          <line key={i} x1={318 + leftDoor} y1={y} x2={528 + leftDoor} y2={y} stroke="#141E2E" strokeWidth="2" />
        ))}
        {/* Door seam glow */}
        <rect x={537 + leftDoor} y="300" width="4" height="1000" fill={`rgba(0,212,212,${0.3 + 0.15 * Math.sin(rel * 0.1)})`} />

        {/* Right door */}
        <rect x={540 + rightDoor} y="300" width="240" height="1000" fill="#0E1A2C" stroke="#141E2E" strokeWidth="4" />
        <rect x={762 + rightDoor} y="320" width="10" height="960" rx="5" fill="#08101C" />
        {[480, 680, 880, 1080].map((y, i) => (
          <line key={i} x1={550 + rightDoor} y1={y} x2={760 + rightDoor} y2={y} stroke="#141E2E" strokeWidth="2" />
        ))}

        {/* ── Floor indicator above elevator ─────────────────── */}
        <rect x="410" y="230" width="260" height="65" rx="10" fill="#030710" stroke="#00D4D4" strokeWidth="2" />
        <text
          x="540"
          y="277"
          textAnchor="middle"
          fill="#00D4D4"
          fontSize="40"
          fontFamily="monospace"
          fontWeight="900"
          opacity={floorGlow}
          filter="drop-shadow(0 0 10px #00D4D4)"
        >
          {floorLabel}
        </text>

        {/* Floor level up arrows */}
        {floorIdx > 0 && (
          <>
            <polygon points="510,245 540,220 570,245" fill="#00D4D4" opacity="0.7" />
          </>
        )}
      </svg>

      {/* Flash on door open */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#00D4D4",
          opacity: flashOp,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* Aarav standing in corridor, watching */}
      <div
        style={{
          position: "absolute",
          bottom: 480,
          left: 100,
          zIndex: 30,
        }}
      >
        <Aarav pose={aaravPose} scale={1.25} facing="right" />
      </div>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={frame + scene.startFrame} />
    </div>
  );
};

