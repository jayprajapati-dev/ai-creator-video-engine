/**
 * Episode 02 — Scene 3: BASEMENT DISCOVERY (11–23s, frames 330–690)
 * Convergence point: Aarav reaches Basement Level 1.
 * - Massive concrete pillars with yellow/black hazard stripes.
 * - Abandoned parking bay lines on the floor.
 * - Distant flickering emergency lamp.
 * - Old wooden/metal security guard desk.
 * - Atmospheric perspective, floating dust motes, spatial footsteps.
 */

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Ep2SceneConfig } from "../episode2Config";
import { HindiCaptions } from "../../HindiCaptions";
import { HindiOverlay } from "../../HindiOverlay";
import { Aarav } from "../../Aarav";

interface Props {
  scene: Ep2SceneConfig;
}

export const Ep2Scene3BasementDiscovery: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();

  const rel = frame;

  // Slow, cinematic tracking camera pan left-to-right (270 frames)
  const camX = interpolate(rel, [0, 270], [40, -100], { extrapolateRight: "clamp" });
  const camZoom = interpolate(rel, [0, 135, 270], [1.0, 1.05, 1.1], { extrapolateRight: "clamp" });

  // Aarav walking progress across basement
  const aaravX = interpolate(rel, [0, 180, 270], [80, 260, 310], { extrapolateRight: "clamp" });
  const aaravPose = rel < 180 ? "walking" : "lookAround";

  // Distant flickering emergency light
  const lightFlicker = rel % 35 > 31 ? 0.2 : 0.85;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020408",
        overflow: "hidden",
        transform: `scale(${camZoom}) translateX(${camX}px)`,
        transformOrigin: "540px 900px",
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="b1Atmo" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#0B1A28" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="flickerCone" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity={`${0.28 * lightFlicker}`} />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pillarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06121E" />
            <stop offset="50%" stopColor="#0B2032" />
            <stop offset="100%" stopColor="#040C16" />
          </linearGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#b1Atmo)" />

        {/* ── Ceiling Overhead Pipes & Cable Trays ─────────────── */}
        <line x1="0" y1="180" x2="1080" y2="180" stroke="#0E2438" strokeWidth="8" />
        <line x1="0" y1="210" x2="1080" y2="210" stroke="#091A2A" strokeWidth="12" />
        <line x1="0" y1="240" x2="1080" y2="240" stroke="#0E2438" strokeWidth="6" />

        {/* Flickering emergency lamp on ceiling */}
        <g transform="translate(620, 240)">
          <rect x="-30" y="0" width="60" height="14" rx="4" fill="#0A1828" stroke="#1A344C" strokeWidth="2" />
          <ellipse cx="0" cy="18" rx="14" ry="6" fill="#F59E0B" opacity={lightFlicker} />
          {/* Light cone hitting floor */}
          <polygon points="0,20 -180,1050 180,1050" fill="url(#flickerCone)" />
        </g>

        {/* ── Background Pillars (Far) ─────────────────────────── */}
        <rect x="220" y="240" width="90" height="1060" fill="#040C16" />
        <rect x="780" y="240" width="90" height="1060" fill="#040C16" />

        {/* ── Midground Pillars (With Parking Signs & Stripes) ─── */}
        {/* Pillar Left (Column B-04) */}
        <g transform="translate(80, 240)">
          <rect width="140" height="1060" fill="url(#pillarGrad)" stroke="#0E253A" strokeWidth="2" />
          {/* Column ID Tag */}
          <rect x="25" y="160" width="90" height="40" rx="6" fill="#040810" stroke="#00D4D4" strokeWidth="1.5" />
          <text x="70" y="187" textAnchor="middle" fill="#00D4D4" fontSize="20" fontFamily="monospace" fontWeight="900">
            B-04
          </text>
          {/* Yellow hazard stripes */}
          {[360, 420, 480, 540].map((y, i) => (
            <polygon key={i} points={`0,${y} 140,${y - 30} 140,${y - 10} 0,${y + 20}`} fill="#D97706" opacity="0.3" />
          ))}
        </g>

        {/* Pillar Right (Column B-05) */}
        <g transform="translate(860, 240)">
          <rect width="140" height="1060" fill="url(#pillarGrad)" stroke="#0E253A" strokeWidth="2" />
          <rect x="25" y="160" width="90" height="40" rx="6" fill="#040810" stroke="#00D4D4" strokeWidth="1.5" />
          <text x="70" y="187" textAnchor="middle" fill="#00D4D4" fontSize="20" fontFamily="monospace" fontWeight="900">
            B-05
          </text>
          {[360, 420, 480, 540].map((y, i) => (
            <polygon key={i} points={`0,${y} 140,${y - 30} 140,${y - 10} 0,${y + 20}`} fill="#D97706" opacity="0.3" />
          ))}
        </g>

        {/* ── Floor & Parking Markings ─────────────────────────── */}
        <rect x="0" y="1300" width="1080" height="620" fill="#03070E" />
        {/* Yellow Parking Bay Lines on Concrete */}
        <line x1="280" y1="1300" x2="160" y2="1920" stroke="#F59E0B" strokeWidth="6" opacity="0.35" />
        <line x1="680" y1="1300" x2="560" y2="1920" stroke="#F59E0B" strokeWidth="6" opacity="0.35" />
        <text x="420" y="1420" fill="#F59E0B" fontSize="38" fontFamily="monospace" fontWeight="900" opacity="0.25">
          PARKING 14
        </text>

        {/* ── Security Guard Desk in Midground ─────────────────── */}
        <g transform="translate(560, 1160)">
          {/* Wooden/metal desk table */}
          <rect x="0" y="40" width="340" height="120" rx="6" fill="#071420" stroke="#122B42" strokeWidth="3" />
          <rect x="-10" y="20" width="360" height="24" rx="4" fill="#0B2034" stroke="#183A58" strokeWidth="2" />
          {/* Desk lamp (dim amber) */}
          <line x1="40" y1="20" x2="40" y2="-20" stroke="#1A3A54" strokeWidth="4" />
          <polygon points="20,-20 60,-20 70,-45 10,-45" fill="#0B2034" stroke="#183A58" strokeWidth="2" />
          <circle cx="40" cy="-20" r="10" fill="#F59E0B" opacity="0.6" />
          {/* Logbook resting on desk */}
          <rect x="140" y="10" width="120" height="24" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="2" />
          <text x="200" y="25" textAnchor="middle" fill="#000000" fontSize="11" fontFamily="monospace" fontWeight="900">
            REGISTER
          </text>
        </g>
      </svg>

      {/* Aarav walking across B1 floor */}
      <div
        style={{
          position: "absolute",
          bottom: 490,
          left: aaravX,
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

