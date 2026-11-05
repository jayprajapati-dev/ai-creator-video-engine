/**
 * Episode 02 — Scene 2 (BRANCH B): ELEVATOR DESCENT (4–11s, frames 120–330)
 * If Audience Chose B (Enter Elevator):
 * - Aarav enters the elevator cabin.
 * - Heavy doors close behind him.
 * - Display scrolls downwards: G -> B1.
 * - Sudden jolt/halt with light flicker.
 * - Distorted whisper from speaker: "आरव... तुम वापस आ गए?"
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

export const Ep2Scene2BranchB_Lift: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = frame;

  // Badge spring
  const badgeScale = spring({ frame: rel - 5, fps, config: { damping: 12, stiffness: 160 } });

  // Elevator jolt at halt (rel=135–165, matching audio "लिफ्ट सीधे B1 पर रुकी")
  const joltY = rel > 135 && rel < 165 ? Math.sin((rel - 135) * 1.5) * 12 : 0;

  // Light flicker during jolt
  const lightOp = rel > 140 && rel < 190 ? (rel % 6 < 3 ? 0.3 : 1) : 1;

  // Speaker whisper wave pulse (rel > 220, matching audio whisper)
  const whisperPulse = rel > 220 ? 0.5 + 0.5 * Math.sin(rel * 0.4) : 0;

  // Aarav pose: lookAround -> fear at halt -> shock at whisper
  const aaravPose = rel < 135 ? "lookAround" : rel < 220 ? "fear" : "shock";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#03060C",
        overflow: "hidden",
        transform: `translate(0, ${joltY}px)`,
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="liftInteriorBg" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#0B2032" stopOpacity={`${0.8 * lightOp}`} />
            <stop offset="100%" stopColor="#02050A" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#liftInteriorBg)" />

        {/* ── Audience Choice Badge (Top-Center) ─────────────── */}
        <g
          transform={`translate(540, 240) scale(${Math.max(0, badgeScale)})`}
          style={{ transformOrigin: "0 0" }}
        >
          <rect x="-240" y="-30" width="480" height="60" rx="12" fill="#0C1D2E" stroke="#DC2626" strokeWidth="2" />
          <circle cx="-210" cy="0" r="7" fill="#DC2626" />
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
            YOUR CHOICE: THE ELEVATOR (OPTION B)
          </text>
        </g>

        {/* ── Elevator Interior Walls & Handrails ─────────────── */}
        {/* Steel Back Mirror Panels */}
        <rect x="180" y="340" width="340" height="880" rx="6" fill="#06121E" stroke="#0F243A" strokeWidth="2" />
        <rect x="560" y="340" width="340" height="880" rx="6" fill="#06121E" stroke="#0F243A" strokeWidth="2" />
        {/* Steel Handrail */}
        <rect x="160" y="820" width="760" height="16" rx="8" fill="#142C44" stroke="#224A70" strokeWidth="2" />

        {/* Floor Line */}
        <rect x="0" y="1320" width="1080" height="600" fill="#02050A" />

        {/* ── Floor Indicator Panel Inside Lift ──────────────── */}
        <g transform="translate(540, 390)">
          <rect x="-100" y="-35" width="200" height="70" rx="10" fill="#020408" stroke="#00D4D4" strokeWidth="2" />
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fill="#EF4444"
            fontSize="44"
            fontFamily="monospace"
            fontWeight="900"
            filter="drop-shadow(0 0 10px #DC2626)"
          >
            B1
          </text>
        </g>

        {/* ── Speaker on Ceiling emitting mysterious whisper ── */}
        <g transform="translate(540, 490)">
          <circle cx="0" cy="0" r="32" fill="#06101A" stroke="#00D4D4" strokeWidth="2" />
          {/* Sound waves when whispering */}
          {rel > 150 && (
            <>
              <circle cx="0" cy="0" r="50" fill="none" stroke="#F59E0B" strokeWidth="2" opacity={whisperPulse * 0.7} />
              <circle cx="0" cy="0" r="70" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity={whisperPulse * 0.4} />
            </>
          )}
          <text x="0" y="60" textAnchor="middle" fill="#F59E0B" fontSize="18" fontFamily="monospace" fontWeight="800">
            « आरव... तुम वापस आ गए? »
          </text>
        </g>
      </svg>

      {/* Aarav standing in elevator cabin */}
      <div
        style={{
          position: "absolute",
          bottom: 480,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        <Aarav pose={aaravPose} scale={1.3} facing="right" />
      </div>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={rel + scene.startFrame} />
    </div>
  );
};
