/**
 * Episode 02 — Scene 1: IMMEDIATE HOOK (0–4s, frames 0–120)
 * Direct continuity from Episode 01 cliffhanger:
 * - Extreme close-up of Aarav's frightened eyes.
 * - Elevator indicator B1 blinking red.
 * - Mechanical doors opening into the dark basement.
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Ep2SceneConfig } from "../episode2Config";
import { HindiCaptions } from "../../HindiCaptions";
import { HindiOverlay } from "../../HindiOverlay";

interface Props {
  scene: Ep2SceneConfig;
}

export const Ep2Scene1Hook: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Push-in from eye close-up to elevator doors opening
  const camZoom = interpolate(frame, [0, 40, 120], [1.35, 1.15, 1.0], {
    extrapolateRight: "clamp",
  });

  // Emergency red strobe (every 16 frames)
  const strobe = Math.sin((frame / 16) * Math.PI * 2) > 0 ? 0.35 : 0.05;

  // B1 indicator glow & scale
  const b1Scale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 180 } });

  // Mechanical doors opening at frame 35
  const leftDoorX = interpolate(frame, [35, 95], [0, -320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightDoorX = interpolate(frame, [35, 95], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Door opening light leak from dark B1 basement
  const lightLeak = interpolate(frame, [35, 90], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#03060C",
        overflow: "hidden",
        transform: `scale(${camZoom})`,
        transformOrigin: "540px 850px",
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="ep2HookAtmo" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0B1A30" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="redEmergency" cx="50%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity={`${strobe}`} />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#ep2HookAtmo)" />
        <rect width="1080" height="1920" fill="url(#redEmergency)" />

        {/* ── Floor & Walls ───────────────────────────────────── */}
        <rect x="0" y="1320" width="1080" height="600" fill="#04070E" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 140} y1="1320" x2={i * 140} y2="1920" stroke="#08101C" strokeWidth="2" />
        ))}

        {/* ── B1 Floor Indicator Box (Huge & Prominent) ──────── */}
        <g transform="translate(540, 260)">
          <rect x="-160" y="-55" width="320" height="110" rx="16" fill="#02050A" stroke="#00D4D4" strokeWidth="3" />
          {/* Red warning border */}
          <rect x="-152" y="-47" width="304" height="94" rx="10" fill="none" stroke="#DC2626" strokeWidth="1.5" />
          {/* Animated B1 text */}
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fill="#EF4444"
            fontSize="72"
            fontFamily="monospace"
            fontWeight="900"
            transform={`scale(${Math.max(0, b1Scale)})`}
            style={{ transformOrigin: "center center" }}
            filter="drop-shadow(0 0 16px #DC2626)"
          >
            B1
          </text>
          {/* Downward indicator triangles */}
          <polygon points="-80,30 -60,10 -100,10" fill="#DC2626" opacity={strobe * 2.5} />
          <polygon points="80,30 100,10 60,10" fill="#DC2626" opacity={strobe * 2.5} />
        </g>

        {/* ── Elevator Frame ─────────────────────────────────── */}
        <rect x="220" y="360" width="640" height="960" rx="8" fill="#010306" stroke="#0B1B2C" strokeWidth="8" />

        {/* Deep B1 Basement Void inside opened elevator */}
        <rect x="228" y="368" width="624" height="944" fill="#02050A" />
        {/* Distant flickering emergency light in basement void */}
        <circle cx="540" cy="780" r="18" fill="#F4A136" opacity={0.3 + strobe} />
        <ellipse cx="540" cy="880" rx="160" ry="60" fill="#00D4D4" opacity={lightLeak} />

        {/* Distant concrete pillar silhouette in B1 */}
        <rect x="480" y="620" width="120" height="690" fill="#030810" />

        {/* ── Left Door ──────────────────────────────────────── */}
        <g transform={`translate(${leftDoorX}, 0)`}>
          <rect x="228" y="368" width="312" height="944" fill="#0A1624" stroke="#12253A" strokeWidth="3" />
          <rect x="240" y="385" width="12" height="910" rx="4" fill="#060E18" />
          <line x1="535" y1="368" x2="535" y2="1312" stroke="#DC2626" strokeWidth="2" opacity="0.6" />
        </g>

        {/* ── Right Door ─────────────────────────────────────── */}
        <g transform={`translate(${rightDoorX}, 0)`}>
          <rect x="540" y="368" width="312" height="944" fill="#0A1624" stroke="#12253A" strokeWidth="3" />
          <rect x="828" y="385" width="12" height="910" rx="4" fill="#060E18" />
          <line x1="545" y1="368" x2="545" y2="1312" stroke="#DC2626" strokeWidth="2" opacity="0.6" />
        </g>

        {/* ── Extreme Close-Up Eye Vignette (Frames 0–40) ────── */}
        {frame < 45 && (
          <g opacity={interpolate(frame, [0, 30, 45], [0.95, 0.8, 0], { extrapolateRight: "clamp" })}>
            <rect width="1080" height="1920" fill="rgba(2,4,8,0.7)" />
            {/* Eye mask */}
            <ellipse cx="540" cy="850" rx="280" ry="120" fill="#050C16" stroke="#00D4D4" strokeWidth="3" />
            <circle cx="540" cy="850" r="54" fill="#0B1F34" stroke="#00D4D4" strokeWidth="2" />
            <circle cx="540" cy="850" r="28" fill="#000000" />
            {/* Red reflection in pupil */}
            <circle cx="532" cy="842" r="8" fill="#EF4444" opacity="0.8" />
            <circle cx="550" cy="840" r="6" fill="#FFFFFF" opacity="0.7" />
          </g>
        )}
      </svg>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};

