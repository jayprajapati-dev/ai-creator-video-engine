import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KidCharacter } from "../character/KidCharacter";
import { GridBackground } from "../ui/GridBackground";
import { EditorialOverlay } from "../ui/EditorialOverlay";
import { KineticCaptions } from "../captions/KineticCaptions";
import { StoryScene } from "../../types/story";

interface Scene2MallProps {
  scene: StoryScene;
}

export const Scene2Mall: React.FC<Scene2MallProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera push-in for scale and depth
  const zoom = interpolate(frame, [0, 240], [1, 1.25], {
    extrapolateRight: "clamp",
  });

  // Kid walking from left to center, then stopping at frame 120
  const kidX = interpolate(frame, [0, 100], [-100, 390], {
    extrapolateRight: "clamp",
  });
  const kidPose = frame < 100 ? "walking" : frame < 160 ? "standing" : "panic";

  // Neon arcade sign flickers and dies around frame 90
  const isNeonFlicker = frame < 80 ? true : frame % 4 < 2 && frame < 95;
  const isNeonDead = frame >= 95;

  // Dialogue bubble spring at frame 150 (3s visual beat)
  const bubbleSpring = spring({
    frame: frame - 150,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `scale(${zoom})`,
        transformOrigin: "540px 1100px",
        overflow: "hidden",
      }}
    >
      <GridBackground darkProgress={0.08} />

      {/* MALL ATRIUM VECTOR ARCHITECTURE */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id="atriumFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        {/* Polished Mall Floor */}
        <polygon points="0,1200 1080,1200 1080,1920 0,1920" fill="url(#atriumFloor)" />

        {/* Floor tile perspective grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={540}
            y1={1200}
            x2={-200 + i * 180}
            y2={1920}
            stroke="#94A3B8"
            strokeWidth="2.5"
            opacity="0.5"
          />
        ))}

        {/* Level 2 Balcony Mezzanine */}
        <rect x="0" y="700" width="1080" height="90" fill="#334155" />
        <rect x="0" y="650" width="1080" height="50" fill="rgba(255,255,255,0.7)" stroke="#CBD5E1" strokeWidth="2" />
        {/* Balcony glass panels */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 90} y1="650" x2={i * 90} y2="700" stroke="#94A3B8" strokeWidth="3" />
        ))}

        {/* Dead Giant Escalators (Diagonal structure in background) */}
        <g id="escalator" opacity="0.9">
          <polygon points="150,1200 350,700 480,700 280,1200" fill="#475569" stroke="#1E293B" strokeWidth="4" />
          <polygon points="200,1200 380,700 440,700 260,1200" fill="#1E293B" />
          {/* Frozen escalator stairs */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={210 + i * 22}
              y1={1180 - i * 58}
              x2={270 + i * 22}
              y2={1180 - i * 58}
              stroke="#E2E8F0"
              strokeWidth="5"
            />
          ))}
          {/* Caution Tape over escalator entrance */}
          <polygon
            points="140,1210 290,1190 290,1225 140,1245"
            fill="#FFD166"
            stroke="#111111"
            strokeWidth="3"
          />
          <text
            x="160"
            y="1232"
            fill="#111111"
            fontSize="14"
            fontWeight="900"
            letterSpacing="2"
          >
            OUT OF SERVICE
          </text>
        </g>

        {/* NEON ARCADE STOREFRONT (Right side) */}
        <g id="arcade-shop">
          <rect x="620" y="520" width="380" height="180" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="6" />
          {/* Closed pull-down metal gate on shop */}
          <rect x="640" y="700" width="340" height="500" fill="#64748B" opacity="0.6" />

          {/* Neon Sign */}
          <rect
            x="650"
            y="550"
            width="320"
            height="110"
            rx="10"
            fill="#020617"
            stroke={isNeonDead ? "#334155" : isNeonFlicker ? "#FF334B" : "#334155"}
            strokeWidth="4"
          />
          <text
            x="810"
            y="615"
            textAnchor="middle"
            fill={isNeonDead ? "#475569" : isNeonFlicker ? "#FF334B" : "#475569"}
            fontSize="34"
            fontWeight="900"
            fontFamily="'Courier New', Courier, monospace"
            filter={isNeonDead ? "none" : isNeonFlicker ? "drop-shadow(0 0 15px #FF334B)" : "none"}
          >
            {isNeonDead ? "[OFFLINE]" : "ARCADE ZONE"}
          </text>
        </g>
      </svg>

      {/* Kid Character */}
      <div
        style={{
          position: "absolute",
          bottom: 500,
          left: kidX,
          zIndex: 25,
        }}
      >
        <KidCharacter pose={kidPose} scale={1.2} />
      </div>

      {/* SPEECH BUBBLE (Pops up at frame 150) */}
      {frame >= 150 && (
        <div
          style={{
            position: "absolute",
            bottom: 1040,
            left: 360,
            transformOrigin: "bottom left",
            transform: `scale(${Math.max(0, bubbleSpring)})`,
            zIndex: 35,
          }}
        >
          <div
            style={{
              backgroundColor: "#111111",
              border: "3px solid #E63946",
              color: "#FFFFFF",
              padding: "16px 28px",
              borderRadius: 20,
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: -0.5,
              position: "relative",
            }}
          >
            "Wait... is anyone there?!"
            {/* Bubble Tail */}
            <div
              style={{
                position: "absolute",
                bottom: -16,
                left: 30,
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "16px solid #111111",
              }}
            />
          </div>
        </div>
      )}

      <EditorialOverlay
        sceneTitle={scene.title}
        timecode={scene.timecode}
        isDark={false}
      />
      <KineticCaptions captions={scene.captions} sceneFrame={frame} />
    </div>
  );
};

