import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KidCharacter } from "../character/KidCharacter";
import { GridBackground } from "../ui/GridBackground";
import { EditorialOverlay } from "../ui/EditorialOverlay";
import { KineticCaptions } from "../captions/KineticCaptions";
import { StoryScene } from "../../types/story";

interface Scene1HookProps {
  scene: StoryScene;
}

export const Scene1Hook: React.FC<Scene1HookProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gate slam animation: drops from top with elastic bounce
  const gateY = interpolate(frame, [0, 16], [-1920, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Screen shake on gate impact (frame 16-28)
  const isImpact = frame >= 16 && frame <= 28;
  const shakeX = isImpact ? (frame % 2 === 0 ? 12 : -12) * ((28 - frame) / 12) : 0;
  const shakeY = isImpact ? (frame % 3 === 0 ? 8 : -8) * ((28 - frame) / 12) : 0;

  // Padlock spring in at frame 50
  const lockSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Camera zoom in at frame 70 (3-second visual event)
  const cameraZoom = interpolate(frame, [70, 110], [1, 1.15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${shakeX}px, ${shakeY}px) scale(${cameraZoom})`,
        transformOrigin: "center center",
        overflow: "hidden",
      }}
    >
      <GridBackground darkProgress={0} />

      {/* Behind gate: Mall hallway perspective lines */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", inset: 0, opacity: 0.2 }}
      >
        <line x1="100" y1="1920" x2="540" y2="700" stroke="#111111" strokeWidth="3" />
        <line x1="980" y1="1920" x2="540" y2="700" stroke="#111111" strokeWidth="3" />
        <line x1="0" y1="400" x2="540" y2="700" stroke="#111111" strokeWidth="3" />
        <line x1="1080" y1="400" x2="540" y2="700" stroke="#111111" strokeWidth="3" />
      </svg>

      {/* Kid standing inside the mall, shocked */}
      <div
        style={{
          position: "absolute",
          bottom: 480,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <KidCharacter pose="shocked" scale={1.35} />
      </div>

      {/* HEAVY METAL SECURITY SHUTTER (Dropping down) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1920,
          transform: `translateY(${gateY}px)`,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <pattern id="gratePattern" width="60" height="80" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="60" height="80" fill="none" stroke="#475569" strokeWidth="6" />
              <line x1="0" y1="0" x2="60" y2="80" stroke="#334155" strokeWidth="4" />
              <line x1="60" y1="0" x2="0" y2="80" stroke="#334155" strokeWidth="4" />
            </pattern>
          </defs>

          {/* Grate grill */}
          <rect x="60" y="0" width="960" height="1750" fill="url(#gratePattern)" opacity="0.9" />

          {/* Vertical thick iron bars */}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x={90 + i * 110}
              y="0"
              width="24"
              height="1750"
              fill="url(#metalGrad)"
              stroke="#0F172A"
              strokeWidth="4"
            />
          ))}

          {/* Heavy bottom crash beam */}
          <rect
            x="40"
            y="1700"
            width="1000"
            height="140"
            rx="12"
            fill="#0F172A"
            stroke="#E63946"
            strokeWidth="8"
          />

          {/* Hazard stripes on bottom beam */}
          {Array.from({ length: 8 }).map((_, i) => (
            <polygon
              key={i}
              points={`${100 + i * 110},1820 ${150 + i * 110},1720 ${180 + i * 110},1720 ${130 + i * 110},1820`}
              fill="#FFD166"
            />
          ))}
        </svg>

        {/* Heavy Padlock and Chains (Appears at frame 45) */}
        {frame >= 45 && (
          <div
            style={{
              position: "absolute",
              top: 1050,
              left: "50%",
              transform: `translate(-50%, -50%) scale(${Math.max(0, lockSpring)})`,
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <svg width="240" height="260" viewBox="0 0 240 260">
              {/* Chains wrapped */}
              <path
                d="M 20 80 Q 120 150 220 80"
                stroke="#94A3B8"
                strokeWidth="28"
                strokeDasharray="20 10"
                fill="none"
              />
              {/* Padlock shackle */}
              <path
                d="M 75 110 L 75 60 C 75 25, 165 25, 165 60 L 165 110"
                stroke="#CBD5E1"
                strokeWidth="26"
                strokeLinecap="round"
                fill="none"
              />
              {/* Padlock brass body */}
              <rect
                x="50"
                y="95"
                width="140"
                height="130"
                rx="20"
                fill="#F4A261"
                stroke="#111111"
                strokeWidth="6"
              />
              {/* Keyhole */}
              <circle cx="120" cy="150" r="12" fill="#111111" />
              <polygon points="114,155 126,155 124,180 116,180" fill="#111111" />
            </svg>

            {/* Warning tag */}
            <div
              style={{
                backgroundColor: "#E63946",
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 2,
                padding: "8px 24px",
                borderRadius: 8,
                marginTop: -10,
                boxShadow: "0 10px 25px rgba(230,57,70,0.6)",
              }}
            >
              LOCKED OUTSIDE
            </div>
          </div>
        )}
      </div>

      <EditorialOverlay
        sceneTitle={scene.title}
        timecode={scene.timecode}
        isDark={false}
      />
      <KineticCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};

