/**
 * Episode 02 — Scene 2 (BRANCH A): CCTV ROOM ROUTE (4–11s, frames 120–330)
 * If Audience Chose A (CCTV Room):
 * - Aarav runs into the security room and slams/locks the door.
 * - Checks surveillance monitors.
 * - CAM 03 reveals the B1 lift doors opening.
 * - CAM 05 reveals the emergency fire staircase leading straight down to Basement B1.
 */

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Ep2SceneConfig } from "../episode2Config";
import { HindiCaptions } from "../../HindiCaptions";
import { HindiOverlay } from "../../HindiOverlay";
import { Aarav } from "../../Aarav";

interface Props {
  scene: Ep2SceneConfig;
}

export const Ep2Scene2BranchA_CCTV: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame (inside Sequence, frame starts at 0)
  const rel = frame;

  // Door slam shockwave
  const slamShake = rel < 20 ? Math.sin(rel * 2.5) * 8 : 0;

  // Badge spring animation
  const badgeScale = spring({ frame: rel - 5, fps, config: { damping: 12, stiffness: 160 } });

  // Monitor scanlines scroll
  const scanline = (rel * 3) % 400;

  // Aarav pose: runs in -> looks at monitors in panic -> shock at secret route
  const aaravPose = rel < 45 ? "running" : rel < 200 ? "fear" : "shock";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020408",
        overflow: "hidden",
        transform: `translate(${slamShake}px, 0)`,
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="cctvRoomBg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0B1C28" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
          <pattern id="scanlinesA" patternUnits="userSpaceOnUse" width="1" height="4">
            <rect width="1" height="2" fill="rgba(0,0,0,0.35)" />
          </pattern>
        </defs>

        <rect width="1080" height="1920" fill="url(#cctvRoomBg)" />

        {/* ── Audience Choice Badge (Top-Center) ─────────────── */}
        <g
          transform={`translate(540, 240) scale(${Math.max(0, badgeScale)})`}
          style={{ transformOrigin: "0 0" }}
        >
          <rect x="-240" y="-30" width="480" height="60" rx="12" fill="#0C1D2E" stroke="#00D4D4" strokeWidth="2" />
          <circle cx="-210" cy="0" r="7" fill="#00D4D4" />
          <text
            x="10"
            y="7"
            textAnchor="middle"
            fill="#E2E8F0"
            fontSize="18"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            letterSpacing="2"
          >
            YOUR CHOICE: CCTV ROOM (OPTION A)
          </text>
        </g>

        {/* ── Heavy Security Door on Left (Locked) ───────────── */}
        <g transform="translate(80, 420)">
          <rect width="160" height="900" fill="#081420" stroke="#122538" strokeWidth="4" />
          <rect x="140" y="380" width="26" height="70" rx="6" fill="#DC2626" />
          <text x="120" y="360" fill="#DC2626" fontSize="13" fontFamily="monospace" fontWeight="900">
            LOCKED
          </text>
        </g>

        {/* ── Multi-Monitor Security Bank ─────────────────────── */}
        {/* Monitor Frame */}
        <rect x="290" y="440" width="710" height="780" rx="16" fill="#030810" stroke="#00D4D4" strokeWidth="4" />

        {/* CAM 03 (Top Half): Elevator B1 Opening */}
        <g transform="translate(305, 455)">
          <rect width="680" height="360" rx="8" fill="#05150C" />
          <rect width="680" height="360" fill="url(#scanlinesA)" opacity="0.6" />
          {/* Corridor view */}
          <polygon points="0,360 340,120 680,360" fill="#071E10" />
          <line x1="340" y1="120" x2="0" y2="360" stroke="#0D2E18" strokeWidth="2" />
          <line x1="340" y1="120" x2="680" y2="360" stroke="#0D2E18" strokeWidth="2" />
          {/* Elevator doors in CAM 03 opening */}
          <rect x="280" y="110" width="120" height="150" fill="#0C2816" stroke="#22C55E" strokeWidth="1.5" />
          <text x="14" y="28" fill="#22C55E" fontSize="16" fontFamily="monospace" fontWeight="900">
            CAM 03 — BASEMENT LIFT
          </text>
          <circle cx="650" cy="22" r="7" fill="#DC2626" />
        </g>

        {/* CAM 05 (Bottom Half): Fire Staircase Route to B1 */}
        <g transform="translate(305, 835)">
          <rect width="680" height="360" rx="8" fill="#06121E" />
          <rect width="680" height="360" fill="url(#scanlinesA)" opacity="0.6" />
          {/* Stairs perspective descending */}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={i} x1={120 + i * 50} y1={280 - i * 35} x2={560 - i * 30} y2={280 - i * 35}
              stroke="#00D4D4" strokeWidth="2" opacity="0.7" />
          ))}
          <text x="14" y="28" fill="#00D4D4" fontSize="16" fontFamily="monospace" fontWeight="900">
            CAM 05 — EMERGENCY FIRE STAIRS (ROUTE TO B1)
          </text>
          {/* Glowing Arrow pointing to B1 */}
          <path d="M 340,160 L 340,240 M 320,220 L 340,240 L 360,220" stroke="#F59E0B" strokeWidth="4" fill="none" />
          <text x="340" y="275" textAnchor="middle" fill="#F59E0B" fontSize="18" fontFamily="monospace" fontWeight="900">
            ENTRY TO B1
          </text>
        </g>

        {/* Scanline sweep */}
        <rect x="290" y={440 + scanline} width="710" height="6" fill="rgba(0,212,212,0.12)" />
      </svg>

      {/* Aarav standing in front of security desk */}
      <div
        style={{
          position: "absolute",
          bottom: 460,
          left: 140,
          zIndex: 30,
        }}
      >
        <Aarav pose={aaravPose} scale={1.25} facing="right" />
      </div>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={rel + scene.startFrame} />
    </div>
  );
};
