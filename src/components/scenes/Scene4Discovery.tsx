import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { KidCharacter } from "../character/KidCharacter";
import { GridBackground } from "../ui/GridBackground";
import { EditorialOverlay } from "../ui/EditorialOverlay";
import { KineticCaptions } from "../captions/KineticCaptions";
import { StoryScene } from "../../types/story";

interface Scene4DiscoveryProps {
  scene: StoryScene;
}

export const Scene4Discovery: React.FC<Scene4DiscoveryProps> = ({ scene }) => {
  const frame = useCurrentFrame();

  // Flashlight panning across dark corridor
  const lightTargetX = interpolate(frame, [0, 150, 300, 450], [400, 750, 540, 680], {
    extrapolateRight: "clamp",
  });

  // Sound pulse ripples from ceiling at frame 90
  const ripple1 = (frame - 90) % 60;
  const ripple2 = (frame - 120) % 60;

  // Door creak open angle (starts opening at frame 270)
  const doorAngle = interpolate(frame, [270, 360], [0, 65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0B0F19",
        overflow: "hidden",
      }}
    >
      <GridBackground darkProgress={1} />

      {/* Corridor Walls & Ceiling */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          {/* Eerie glow leaking from cracked open door */}
          <radialGradient id="doorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#15803D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ceiling Footstep Radar Waves (Frame 90+) */}
        {frame >= 90 && (
          <g opacity="0.7">
            <ellipse cx="540" cy="320" rx={ripple1 * 6} ry={ripple1 * 2} stroke="#E63946" strokeWidth="3" fill="none" opacity={1 - ripple1 / 60} />
            <ellipse cx="540" cy="320" rx={ripple2 * 6} ry={ripple2 * 2} stroke="#FFD166" strokeWidth="2.5" fill="none" opacity={1 - ripple2 / 60} />
            <text x="540" y="280" textAnchor="middle" fill="#E63946" fontSize="20" fontWeight="900" letterSpacing="3">
              ▲ AUDIO DETECTED: FLOOR 3
            </text>
          </g>
        )}

        {/* Level 3 Warning Directory Sign on Wall */}
        <g id="directory-sign" transform="translate(680, 580)">
          <rect x="0" y="0" width="320" height="180" rx="10" fill="#18181B" stroke="#E63946" strokeWidth="4" />
          <rect x="15" y="15" width="290" height="40" fill="#E63946" rx="4" />
          <text x="160" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" letterSpacing="2">
            RESTRICTED
          </text>
          <text x="160" y="100" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="900">
            FLOOR 03
          </text>
          <text x="160" y="145" textAnchor="middle" fill="#FFD166" fontSize="16" fontWeight="700">
            NO UNAUTHORIZED ENTRY
          </text>
        </g>

        {/* FORBIDDEN SERVICE DOORWAY */}
        <g id="service-door" transform="translate(480, 780)">
          {/* Inner Room Glow */}
          <rect x="0" y="0" width="220" height="520" fill="#020617" />
          <rect x="0" y="0" width="220" height="520" fill="url(#doorGlow)" opacity={doorAngle / 65} />

          {/* Door Frame */}
          <rect x="-10" y="-10" width="240" height="540" fill="none" stroke="#334155" strokeWidth="12" />

          {/* Rusted Heavy Door (Swinging open) */}
          <g transform={`matrix(${Math.cos((doorAngle * Math.PI) / 180)} 0 0 1 0 0)`}>
            <rect x="0" y="0" width="220" height="520" fill="#334155" stroke="#1E293B" strokeWidth="6" />
            {/* Rusted rivets & hazard sign */}
            <circle cx="20" cy="40" r="6" fill="#94A3B8" />
            <circle cx="20" cy="480" r="6" fill="#94A3B8" />
            <circle cx="200" cy="40" r="6" fill="#94A3B8" />
            <circle cx="200" cy="480" r="6" fill="#94A3B8" />
            <rect x="30" y="180" width="160" height="60" fill="#F59E0B" rx="4" />
            <text x="110" y="218" textAnchor="middle" fill="#111111" fontSize="16" fontWeight="900">
              DANGER
            </text>
          </g>
        </g>
      </svg>

      {/* Kid holding flashlight */}
      <div
        style={{
          position: "absolute",
          bottom: 420,
          left: 140,
          zIndex: 25,
        }}
      >
        <KidCharacter pose="flashlight" scale={1.35} />
      </div>

      {/* Dynamic Flashlight Spotlight Target */}
      <div
        style={{
          position: "absolute",
          top: 850,
          left: lightTargetX,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,249,166,0.3) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 22,
          mixBlendMode: "screen",
        }}
      />

      <EditorialOverlay
        sceneTitle={scene.title}
        timecode={scene.timecode}
        isDark={true}
      />
      <KineticCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};
