import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { KidCharacter } from "../character/KidCharacter";
import { GridBackground } from "../ui/GridBackground";
import { PhoneMockup } from "../ui/PhoneMockup";
import { EditorialOverlay } from "../ui/EditorialOverlay";
import { KineticCaptions } from "../captions/KineticCaptions";
import { StoryScene } from "../../types/story";

interface Scene3BlackoutProps {
  scene: StoryScene;
}

export const Scene3Blackout: React.FC<Scene3BlackoutProps> = ({ scene }) => {
  const frame = useCurrentFrame();

  // Dark progress: sudden blackout at frame 250
  const darkProgress = interpolate(frame, [250, 275], [0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isGlitching = frame >= 170 && frame < 220;
  const isPhoneDead = frame >= 220;

  // Phone scale & position: starts centered, then slides down as blackout hits
  const phoneScale = interpolate(frame, [0, 50, 240, 270], [0.6, 1.15, 1.15, 0.4], {
    extrapolateRight: "clamp",
  });
  const phoneY = interpolate(frame, [240, 280], [0, 800], {
    extrapolateRight: "clamp",
  });

  const kidPose =
    frame < 220
      ? "phone"
      : frame < 280
      ? "panic"
      : "flashlight";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <GridBackground darkProgress={darkProgress} />

      {/* Overhead high-bay industrial lights */}
      <svg
        width="1080"
        height="500"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          opacity: 1 - darkProgress,
        }}
      >
        {/* Overhead fluorescent hanging fixtures */}
        {[200, 540, 880].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="0" x2={x} y2="120" stroke="#475569" strokeWidth="4" />
            <rect x={x - 80} y="120" width="160" height="24" rx="4" fill="#FFFFFF" filter="drop-shadow(0 10px 20px #FFFFFF)" />
          </g>
        ))}
      </svg>

      {/* Kid in background */}
      <div
        style={{
          position: "absolute",
          bottom: 440,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 15,
        }}
      >
        <KidCharacter pose={kidPose} scale={1.3} />
      </div>

      {/* Massive Phone Mockup (Frames 0 to 260) */}
      {frame < 270 && (
        <div
          style={{
            position: "absolute",
            top: 280,
            left: "50%",
            transform: `translate(-50%, ${phoneY}px)`,
            zIndex: 30,
          }}
        >
          <PhoneMockup
            scale={phoneScale}
            batteryPercent={1}
            isGlitching={isGlitching}
            isDead={isPhoneDead}
          />
        </div>
      )}

      {/* Blackout Flash Overlay */}
      {frame >= 250 && frame <= 256 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000000",
            zIndex: 45,
          }}
        />
      )}

      <EditorialOverlay
        sceneTitle={scene.title}
        timecode={scene.timecode}
        isDark={darkProgress > 0.5}
      />
      <KineticCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};

