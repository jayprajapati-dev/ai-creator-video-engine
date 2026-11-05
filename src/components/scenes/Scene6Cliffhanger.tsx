import React from "react";
import { useCurrentFrame } from "remotion";
import { KidCharacter } from "../character/KidCharacter";
import { GridBackground } from "../ui/GridBackground";
import { EditorialOverlay } from "../ui/EditorialOverlay";
import { KineticCaptions } from "../captions/KineticCaptions";
import { VotingPoll } from "../ui/VotingPoll";
import { StoryScene } from "../../types/story";

interface Scene6CliffhangerProps {
  scene: StoryScene;
}

export const Scene6Cliffhanger: React.FC<Scene6CliffhangerProps> = ({
  scene,
}) => {
  const frame = useCurrentFrame();

  // Heartbeat pulse effect (every ~18 frames)
  const isHeartbeatBeat = frame % 18 < 6;
  const heartbeatScale = isHeartbeatBeat ? 1.03 : 1;

  // Strobe red emergency alert border
  const alertBorderColor =
    frame % 12 < 6 ? "rgba(230, 57, 70, 0.8)" : "rgba(230, 57, 70, 0.1)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0A0D14",
        transform: `scale(${heartbeatScale})`,
        transformOrigin: "center center",
        overflow: "hidden",
      }}
    >
      <GridBackground darkProgress={1} />

      {/* Flashing Red Emergency Perimeter Border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `12px solid ${alertBorderColor}`,
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      {/* Heartbeat ECG / Pulse Line Animation */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0, opacity: 0.35 }}
      >
        <path
          d="M 0 1100 L 300 1100 L 330 1020 L 360 1180 L 390 1050 L 420 1130 L 450 1100 L 750 1100 L 780 1020 L 810 1180 L 840 1050 L 870 1130 L 900 1100 L 1080 1100"
          stroke="#E63946"
          strokeWidth="6"
          fill="none"
          strokeDasharray="1200"
          strokeDashoffset={-frame * 12}
        />
      </svg>

      {/* Character in panic/decision state */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 25,
        }}
      >
        <KidCharacter pose="panic" scale={1.25} />
      </div>

      {/* GIANT INSTAGRAM VOTING POLL STICKER */}
      <VotingPoll />

      <EditorialOverlay
        sceneTitle={scene.title}
        timecode={scene.timecode}
        isDark={true}
      />
      <KineticCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};
