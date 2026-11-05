/**
 * Scene 7: THE CLIFFHANGER — 54–60s (frames 1620–1800, relative 0–180)
 * Elevator bell dings. Floor indicator: B1.
 * Aarav turns slowly toward elevator.
 * Voting poll: A (CCTV room) vs B (enter elevator).
 * Screen cuts to black at rel=120, heartbeat strobe border.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HindiScene } from "../episodeConfig";
import { HindiCaptions } from "../HindiCaptions";
import { HindiOverlay } from "../HindiOverlay";
import { HindiVotingPoll } from "../HindiVotingPoll";
import { Aarav } from "../Aarav";

interface Props { scene: HindiScene; }

export const HScene7Cliffhanger: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = frame;

  // Phase: 0-60 corridor, 60-120 Aarav turning to elevator, 120-180 black + vote
  const blackFade = interpolate(rel, [115, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // B1 floor number spring
  const b1Scale = spring({ frame: rel - 30, fps, config: { damping: 10, stiffness: 220 } });
  const b1Flicker = rel > 30 && rel < 90 ? (rel % 8 < 4 ? 1 : 0.4) : 1;

  // Heartbeat strobe — red border flash every 18 frames
  const heartbeatPhase = rel % 18;
  const heartbeat = heartbeatPhase < 4
    ? interpolate(heartbeatPhase, [0, 2, 4], [0, 0.9, 0])
    : 0;

  // Elevator door glow pulsing
  const doorGlow = 0.2 + 0.15 * Math.sin(rel * 0.25);

  // Aarav pose — turning toward elevator
  const aaravPose = rel < 60 ? "fear" : rel < 110 ? "turning" : "shock";
  const aaravFacing = rel < 60 ? "right" : "left";

  // Vote panel slides up from bottom at rel=70
  const pollY = spring({ frame: rel - 70, fps, config: { damping: 14, stiffness: 120 } });
  const pollTranslate = interpolate(pollY, [0, 1], [600, 0]);

  // Camera pull back
  const camScale = interpolate(rel, [0, 120], [1.1, 0.95], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020408",
        overflow: "hidden",
      }}
    >
      {/* Background scene — corridor + elevator */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${camScale})`,
          transformOrigin: "540px 900px",
        }}
      >
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="cliff7Atmo" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#0A1A30" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#020408" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="elev7Glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={`rgba(0,212,212,${doorGlow})`} />
              <stop offset="100%" stopColor="rgba(0,212,212,0)" />
            </radialGradient>
          </defs>

          <rect width="1080" height="1920" fill="#030609" />
          <rect width="1080" height="1920" fill="url(#cliff7Atmo)" />

          {/* Floor */}
          <rect x="0" y="1340" width="1080" height="580" fill="#04070C" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={i * 140} y1="1340" x2={i * 140} y2="1920" stroke="#06080F" strokeWidth="2" />
          ))}

          {/* Corridor walls */}
          <rect x="0" y="260" width="150" height="1080" fill="#050818" stroke="#0A1322" strokeWidth="2" />
          <rect x="930" y="260" width="150" height="1080" fill="#050818" stroke="#0A1322" strokeWidth="2" />

          {/* Depth lines */}
          <line x1="0" y1="1340" x2="540" y2="800" stroke="#07090F" strokeWidth="1.5" />
          <line x1="1080" y1="1340" x2="540" y2="800" stroke="#07090F" strokeWidth="1.5" />

          {/* ── Elevator on left wall ────────────────────────── */}
          {/* Shaft */}
          <rect x="150" y="300" width="400" height="1040" fill="#030710" stroke="#0F1A2E" strokeWidth="6" rx="4" />
          {/* Interior glow when "B1" reached */}
          {rel > 30 && (
            <rect x="156" y="306" width="388" height="1028" fill="url(#elev7Glow)" />
          )}
          {/* Left door — open slightly (ajar) */}
          <rect x={150 + interpolate(rel, [45, 90], [0, -100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            y="300" width="200" height="1040"
            fill="#0E1A2C" stroke="#141E2E" strokeWidth="4" />
          {/* Right door */}
          <rect x={350 + interpolate(rel, [45, 90], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            y="300" width="200" height="1040"
            fill="#0E1A2C" stroke="#141E2E" strokeWidth="4" />

          {/* Door gap glow */}
          <rect x="346" y="300" width="8" height="1040"
            fill={`rgba(0,212,212,${0.4 + 0.2 * Math.sin(rel * 0.2)})`} />

          {/* ── B1 floor indicator above elevator ───────────── */}
          <rect x="210" y="230" width="220" height="65" rx="10" fill="#030710" stroke="#00D4D4" strokeWidth="2" />
          {rel > 30 && (
            <text
              x="320"
              y="278"
              textAnchor="middle"
              fill="#00D4D4"
              fontSize="44"
              fontFamily="monospace"
              fontWeight="900"
              opacity={b1Flicker * Math.max(0, b1Scale)}
              filter="drop-shadow(0 0 12px #00D4D4)"
            >
              B1
            </text>
          )}
          {rel <= 30 && (
            <text x="320" y="278" textAnchor="middle" fill="#00D4D4" fontSize="44"
              fontFamily="monospace" fontWeight="900">G</text>
          )}

          {/* Warning arrows above B1 (pointing down = basement) */}
          {rel > 30 && (
            <g opacity={Math.max(0, b1Scale) * 0.7}>
              <polygon points="295,246 320,266 345,246" fill="#00D4D4" />
            </g>
          )}

          {/* ── Corridor edge lighting — dim red warning strips ── */}
          <rect x="0" y="260" width="8" height="1080"
            fill={`rgba(220,38,38,${0.3 + heartbeat * 0.5})`} />
          <rect x="1072" y="260" width="8" height="1080"
            fill={`rgba(220,38,38,${0.3 + heartbeat * 0.5})`} />
        </svg>
      </div>

      {/* Aarav turning toward elevator */}
      {rel < 130 && (
        <div
          style={{
            position: "absolute",
            bottom: 490,
            left: 460,
            zIndex: 30,
          }}
        >
          <Aarav pose={aaravPose} scale={1.3} facing={aaravFacing} />
        </div>
      )}

      {/* Black fade to cut */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: blackFade,
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      {/* Heartbeat strobe border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 60px rgba(220,38,38,${heartbeat * 0.8})`,
          pointerEvents: "none",
          zIndex: 45,
        }}
      />

      {/* Vote panel slides up */}
      {rel >= 60 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            transform: `translateY(${pollTranslate}px)`,
            zIndex: 60,
          }}
        >
          <HindiVotingPoll />
        </div>
      )}

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={frame + scene.startFrame} />
    </div>
  );
};

