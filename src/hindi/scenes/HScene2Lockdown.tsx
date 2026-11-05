/**
 * Scene 2: LOCKDOWN — 4-16s
 * Modern Indian mall: closed shutters, escalators stopped, glass entrance.
 * Aarav pulls the door. Locked. Checks phone. NO NETWORK.
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HindiScene } from "../episodeConfig";
import { HindiCaptions } from "../HindiCaptions";
import { HindiOverlay } from "../HindiOverlay";
import { Aarav } from "../Aarav";
import { HINDI_DESIGN } from "../designSystem";

interface Props { scene: HindiScene; }

export const HScene2Lockdown: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frame (scene starts at 120 globally, so frame here is 0-based within scene)
  const relFrame = frame;

  // Camera gentle zoom push
  const zoom = interpolate(relFrame, [0, 360], [1, 1.18], {
    extrapolateRight: "clamp",
  });

  // Aarav pose: walking (0-80), then trying door (80-180), then shock phone (180+)
  const aaravPose =
    relFrame < 80 ? "walking" :
    relFrame < 180 ? "lookAround" :
    "phone";

  // Aarav horizontal position
  const aaravX = interpolate(relFrame, [0, 80], [-80, 220], {
    extrapolateRight: "clamp",
  });

  // Phone spring in at frame 180
  const phoneEntrance = spring({
    frame: relFrame - 180,
    fps,
    config: { damping: 11, stiffness: 150 },
  });

  // No-network label flash
  const noNetworkOpacity =
    relFrame >= 240
      ? (relFrame % 24 < 12 ? 1 : 0.4)
      : 0;

  // Neon signs flicker out gradually
  const neonIntensity = interpolate(relFrame, [60, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: HINDI_DESIGN.colors.bg,
        overflow: "hidden",
        transform: `scale(${zoom})`,
        transformOrigin: "540px 1100px",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="mallFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E1525" />
            <stop offset="100%" stopColor="#07090F" />
          </linearGradient>
          <radialGradient id="atmoCeil" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#101C3A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#05080F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="1080" height="1920" fill="url(#mallFloor)" />
        <rect width="1080" height="600" fill="url(#atmoCeil)" />

        {/* ── Ceiling structure ──────────────────────────────── */}
        {/* Suspended ceiling panels */}
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i}>
            <rect x={i * 216} y="0" width="216" height="120" fill="#08101E" stroke="#121D30" strokeWidth="2" />
            {/* LED strip */}
            <rect x={i * 216 + 20} y="115" width="176" height="6" rx="3"
              fill={`rgba(0,212,212,${neonIntensity * 0.7 + 0.1})`}
              filter={`drop-shadow(0 3px 8px rgba(0,212,212,${neonIntensity * 0.5}))`}
            />
          </g>
        ))}

        {/* ── Second level balcony ──────────────────────────── */}
        <rect x="0" y="680" width="1080" height="80" fill="#0D1828" stroke="#141C2E" strokeWidth="4" />
        {/* Glass balcony railing */}
        <rect x="0" y="635" width="1080" height="45" fill="rgba(13,24,40,0.6)" stroke="#1A2A40" strokeWidth="3" />
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={i} x1={i * 72} y1="635" x2={i * 72} y2="680" stroke="#1A2A40" strokeWidth="2" />
        ))}

        {/* ── Stopped Escalator ─────────────────────────────── */}
        <g id="escalator">
          <polygon points="80,1300 240,680 330,680 170,1300" fill="#0E1A2A" stroke="#141C2E" strokeWidth="4" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i}
              x1={90 + i * 17} y1={1280 - i * 69}
              x2={150 + i * 17} y2={1280 - i * 69}
              stroke="#1A2A3A" strokeWidth="5" />
          ))}
          {/* OUT OF SERVICE tape */}
          <polygon points="70,1310 230,1290 230,1325 70,1345" fill="#F59E0B" />
          <text x="150" y="1324" textAnchor="middle" fill="#111111" fontSize="14" fontWeight="900" letterSpacing="2">
            BAND HAI
          </text>
        </g>

        {/* ── Shop fronts ────────────────────────────────────── */}
        {/* Left shop */}
        <rect x="0" y="680" width="280" height="620" fill="#08101E" stroke="#141C2E" strokeWidth="4" />
        {/* Shop neon name */}
        <text x="140" y="750" textAnchor="middle"
          fill={`rgba(0,212,212,${neonIntensity})`}
          fontSize="20" fontWeight="900" fontFamily="monospace"
          filter={neonIntensity > 0.3 ? "drop-shadow(0 0 10px #00D4D4)" : "none"}>
          {neonIntensity > 0.1 ? "ELECTRO HUB" : "[OFFLINE]"}
        </text>
        {/* Closed shutter */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={770 + i * 72} x2="280" y2={770 + i * 72} stroke="#141C2E" strokeWidth="4" />
        ))}

        {/* Right shop */}
        <rect x="800" y="680" width="280" height="620" fill="#08101E" stroke="#141C2E" strokeWidth="4" />
        <text x="940" y="750" textAnchor="middle"
          fill={`rgba(220,38,38,${neonIntensity})`}
          fontSize="20" fontWeight="900" fontFamily="monospace"
          filter={neonIntensity > 0.3 ? "drop-shadow(0 0 10px #DC2626)" : "none"}>
          {neonIntensity > 0.1 ? "SPICE ZONE" : "[OFFLINE]"}
        </text>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="800" y1={770 + i * 72} x2="1080" y2={770 + i * 72} stroke="#141C2E" strokeWidth="4" />
        ))}

        {/* ── Glass Main Entrance ────────────────────────────── */}
        <rect x="380" y="1050" width="320" height="650" fill="#0A1428" stroke="#1A2A40" strokeWidth="6" />
        {/* Glass panels */}
        <rect x="390" y="1060" width="140" height="630" rx="2" fill="rgba(0,20,40,0.7)" stroke="#1A2A40" strokeWidth="2" />
        <rect x="550" y="1060" width="140" height="630" rx="2" fill="rgba(0,20,40,0.7)" stroke="#1A2A40" strokeWidth="2" />
        {/* Reflection glints */}
        <line x1="400" y1="1080" x2="420" y2="1600" stroke="rgba(0,212,212,0.1)" strokeWidth="6" />
        <line x1="560" y1="1080" x2="580" y2="1600" stroke="rgba(0,212,212,0.1)" strokeWidth="6" />
        {/* Lock icon on door */}
        <circle cx="540" cy="1380" r="18" fill="#DC2626" />
        <rect x="533" y="1375" width="14" height="12" rx="2" fill="#FFFFFF" />
        <circle cx="540" cy="1370" r="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />

        {/* ── Floor polished marble ─────────────────────────── */}
        <rect x="0" y="1300" width="1080" height="620" fill="#07090F" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={i * 160} y1="1300" x2={i * 160} y2="1920" stroke="#0D1525" strokeWidth="2" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i} x1="0" y1={1300 + i * 155} x2="1080" y2={1300 + i * 155} stroke="#0D1525" strokeWidth="2" />
        ))}
      </svg>

      {/* ── Aarav character ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 500,
          left: aaravX,
          zIndex: 25,
        }}
      >
        <Aarav pose={aaravPose} scale={1.3} />
      </div>

      {/* ── Phone NO NETWORK overlay (frame 240+) ─────────────── */}
      {relFrame >= 240 && (
        <div
          style={{
            position: "absolute",
            top: 380,
            left: "50%",
            transform: `translateX(-50%) scale(${Math.max(0, phoneEntrance)})`,
            zIndex: 40,
            backgroundColor: "#05080F",
            border: `3px solid #DC2626`,
            borderRadius: 20,
            padding: "18px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 20px 50px rgba(220,38,38,0.4)",
            opacity: noNetworkOpacity,
          }}
        >
          <span style={{
            fontFamily: HINDI_DESIGN.fonts.english,
            color: "#DC2626",
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: 3,
          }}>
            NO NETWORK
          </span>
          <span style={{
            fontFamily: HINDI_DESIGN.fonts.hindi,
            color: "#94A3B8",
            fontSize: 22,
          }}>
            कोई सिग्नल नहीं
          </span>
          {/* Signal bars crossed */}
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
            {[12, 20, 28, 36].map((h, i) => (
              <div key={i} style={{
                width: 10,
                height: h,
                borderRadius: 3,
                backgroundColor: i < 2 ? "#374151" : "#374151",
                opacity: 0.3,
              }} />
            ))}
          </div>
        </div>
      )}

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={frame + scene.startFrame} />
    </div>
  );
};

