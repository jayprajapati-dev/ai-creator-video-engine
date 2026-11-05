import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KidCharacter } from "../character/KidCharacter";
import { GridBackground } from "../ui/GridBackground";
import { EditorialOverlay } from "../ui/EditorialOverlay";
import { KineticCaptions } from "../captions/KineticCaptions";
import { StoryScene } from "../../types/story";

interface Scene5DecisionProps {
  scene: StoryScene;
}

export const Scene5Decision: React.FC<Scene5DecisionProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera tracking reticle zoom and lock-on at frame 120
  const reticleLock = spring({
    frame: frame - 120,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Approaching shadow scale growing from frame 220
  const shadowScale = interpolate(frame, [220, 360], [0.3, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shadowOpacity = interpolate(frame, [220, 320], [0, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#030712",
        overflow: "hidden",
      }}
    >
      <GridBackground darkProgress={1} />

      {/* SECURITY CONTROL DESK & SURVEILLANCE MONITORS */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#022C22" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* 4 Multi-Monitor CCTV Grid */}
        {[
          { x: 120, y: 380, label: "CAM 01: MAIN ENTRANCE [OFFLINE]", live: false },
          { x: 560, y: 380, label: "CAM 02: FOOD COURT", live: true },
          { x: 120, y: 700, label: "CAM 03: SERVICE CORRIDOR", live: true },
          { x: 560, y: 700, label: "CAM 04: SECURITY DESK [YOU]", live: true, target: true },
        ].map((mon, i) => (
          <g key={i}>
            {/* Monitor bezel */}
            <rect
              x={mon.x}
              y={mon.y}
              width="400"
              height="280"
              rx="14"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="6"
            />
            {/* Screen */}
            <rect
              x={mon.x + 12}
              y={mon.y + 12}
              width="376"
              height="256"
              rx="8"
              fill={mon.live ? "#064E3B" : "#020617"}
            />
            <rect
              x={mon.x + 12}
              y={mon.y + 12}
              width="376"
              height="256"
              fill="url(#screenGlow)"
            />

            {/* Scanlines */}
            <line x1={mon.x + 12} y1={mon.y + 80} x2={mon.x + 388} y2={mon.y + 80} stroke="#10B981" strokeWidth="1" opacity="0.3" />
            <line x1={mon.x + 12} y1={mon.y + 160} x2={mon.x + 388} y2={mon.y + 160} stroke="#10B981" strokeWidth="1" opacity="0.3" />

            {/* Label */}
            <text
              x={mon.x + 24}
              y={mon.y + 40}
              fill={mon.live ? "#34D399" : "#64748B"}
              fontSize="12"
              fontWeight="800"
              fontFamily="'Courier New', Courier, monospace"
            >
              {mon.label}
            </text>

            {/* LIVE DOT */}
            {mon.live && (
              <circle cx={mon.x + 360} cy={mon.y + 36} r="6" fill="#EF4444" />
            )}
          </g>
        ))}

        {/* TARGET ACQUIRED BRACKETS ON CAM 04 (Frame 120+) */}
        {frame >= 120 && (
          <g transform={`translate(750, 830) scale(${Math.max(0, reticleLock)})`}>
            {/* Corner brackets */}
            <path d="M -40 -30 L -50 -30 L -50 -20" stroke="#EF4444" strokeWidth="5" fill="none" />
            <path d="M 40 -30 L 50 -30 L 50 -20" stroke="#EF4444" strokeWidth="5" fill="none" />
            <path d="M -40 30 L -50 30 L -50 20" stroke="#EF4444" strokeWidth="5" fill="none" />
            <path d="M 40 30 L 50 30 L 50 20" stroke="#EF4444" strokeWidth="5" fill="none" />
            <circle cx="0" cy="0" r="8" fill="#EF4444" />
            <text x="0" y="55" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="900" letterSpacing="1">
              [TARGET LOCKED]
            </text>
          </g>
        )}

        {/* LOOMING SILHOUETTE SHADOW (Appears from frame 220) */}
        {frame >= 220 && (
          <g
            id="creature-shadow"
            transform={`translate(920, 1150) scale(${shadowScale})`}
            opacity={shadowOpacity}
          >
            {/* Sinister tall shadow with glowing eyes */}
            <path
              d="M -60 200 C -90 100, -110 -150, -50 -250 C 0 -310, 50 -310, 100 -250 C 160 -150, 140 100, 110 200 Z"
              fill="#000000"
              filter="blur(8px)"
            />
            {/* Glowing twin eyes in shadow */}
            <circle cx="-15" cy="-210" r="8" fill="#FF334B" filter="drop-shadow(0 0 12px #FF334B)" />
            <circle cx="45" cy="-210" r="8" fill="#FF334B" filter="drop-shadow(0 0 12px #FF334B)" />
          </g>
        )}
      </svg>

      {/* Kid standing before monitors */}
      <div
        style={{
          position: "absolute",
          bottom: 400,
          left: 180,
          zIndex: 25,
        }}
      >
        <KidCharacter
          pose={frame < 140 ? "standing" : "shocked"}
          facing="right"
          scale={1.3}
        />
      </div>

      <EditorialOverlay
        sceneTitle={scene.title}
        timecode={scene.timecode}
        isDark={true}
      />
      <KineticCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};

