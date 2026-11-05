import React from "react";
import { Aarav } from "../hindi/Aarav";

/**
 * 16:9 High-CTR YouTube Thumbnail (1920 x 1080 px)
 * Designed for maximum click-through-rate on YouTube homepage & search!
 */
export const Thumbnail16x9: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#03060C",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Noto Sans Devanagari', 'Mangal', system-ui, sans-serif",
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="tBg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#0B1A2E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="tRedGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>

        <rect width="1920" height="1080" fill="url(#tBg)" />

        {/* Mall Corridor Background */}
        <polygon points="0,1080 960,350 1920,1080" fill="#040A14" />
        <line x1="960" y1="350" x2="0" y2="1080" stroke="#0C1E34" strokeWidth="2" />
        <line x1="960" y1="350" x2="1920" y2="1080" stroke="#0C1E34" strokeWidth="2" />

        {/* ── Right side: CCTV Monitor CAM-07 with Shadow ────── */}
        <g transform="translate(1080, 160)">
          {/* Bezel */}
          <rect width="760" height="740" rx="16" fill="#02070A" stroke="#00D4D4" strokeWidth="5" />
          <rect x="14" y="14" width="732" height="712" rx="10" fill="#061608" />

          {/* CCTV Grid scanlines & corridor */}
          <polygon points="14,726 380,240 746,726" fill="#081E0C" />
          <line x1="380" y1="240" x2="14" y2="726" stroke="#0E3014" strokeWidth="2" />
          <line x1="380" y1="240" x2="746" y2="726" stroke="#0E3014" strokeWidth="2" />

          {/* Aarav Figure on CCTV screen */}
          <g transform="translate(240, 380)" opacity="0.75">
            <ellipse cx="40" cy="70" rx="20" ry="38" fill="#0E2A14" />
            <circle cx="40" cy="22" r="16" fill="#0E2A14" />
          </g>

          {/* Dark Looming Shadow Figure Behind Him */}
          <g transform="translate(180, 260)">
            <ellipse cx="60" cy="140" rx="42" ry="75" fill="#000000" />
            <circle cx="60" cy="38" r="32" fill="#000000" />
            {/* Piercing Red Eyes */}
            <circle cx="48" cy="36" r="6" fill="#EF4444" />
            <circle cx="72" cy="36" r="6" fill="#EF4444" />
          </g>

          {/* CAM 07 Header & REC */}
          <rect x="24" y="24" width="130" height="34" rx="4" fill="rgba(0,0,0,0.6)" />
          <text x="34" y="48" fill="#22C55E" fontSize="20" fontFamily="monospace" fontWeight="900">
            CAM 07
          </text>
          <circle cx="700" cy="40" r="10" fill="#DC2626" />
          <text x="635" y="46" fill="#EF4444" fontSize="18" fontFamily="monospace" fontWeight="800">
            REC
          </text>

          {/* Warning Banner on Monitor */}
          <rect x="14" y="650" width="732" height="76" rx="6" fill="rgba(220,38,38,0.7)" />
          <text
            x="380"
            y="700"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="30"
            fontFamily="monospace"
            fontWeight="900"
            letterSpacing="3"
          >
            ⚠ MOTION DETECTED: BEHIND YOU
          </text>
        </g>

        {/* ── Left side: High-Impact Hindi Typography & Badges ─ */}
        <g transform="translate(100, 160)">
          {/* Series badge */}
          <rect x="0" y="0" width="280" height="42" rx="8" fill="#DC2626" />
          <text x="140" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" letterSpacing="3">
            THE UNKNOWN CITY #01
          </text>

          {/* Time Badge */}
          <rect x="300" y="0" width="160" height="42" rx="8" fill="#061220" stroke="#00D4D4" strokeWidth="2" />
          <text x="380" y="28" textAnchor="middle" fill="#00D4D4" fontSize="20" fontFamily="monospace" fontWeight="900">
            12:07 AM
          </text>

          {/* Hook Question Text (Massive & Catchy) */}
          <g transform="translate(0, 160)">
            <text
              x="0"
              y="0"
              fill="#FFFFFF"
              fontSize="78"
              fontWeight="900"
              filter="drop-shadow(0 6px 12px rgba(0,0,0,0.8))"
            >
              मॉल बंद था...
            </text>

            {/* Glowing Red Highlight Box */}
            <rect x="0" y="40" width="850" height="120" rx="16" fill="url(#tRedGrad)" />
            <text
              x="20"
              y="126"
              fill="#FFFFFF"
              fontSize="82"
              fontWeight="900"
              filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
            >
              फिर LIFT किसने चलाई?
            </text>
          </g>

          {/* Warning Sub-box */}
          <g transform="translate(0, 480)">
            <rect x="0" y="0" width="580" height="85" rx="12" fill="#08182A" stroke="#00D4D4" strokeWidth="2.5" />
            <text x="30" y="55" fill="#00D4D4" fontSize="34" fontWeight="800">
              🚨 सच जानकर होश उड़ जाएंगे!
            </text>
          </g>

          {/* Audience Vote Sticker */}
          <g transform="translate(0, 610)">
            <rect x="0" y="0" width="460" height="60" rx="10" fill="#030810" stroke="#EF4444" strokeWidth="2" />
            <text x="230" y="40" textAnchor="middle" fill="#F1F5F9" fontSize="24" fontWeight="800">
              VOTE: HIDE या RUN? 😱
            </text>
          </g>
        </g>

        {/* Aarav Character in Forefront (Shocked Pose) */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 720,
            zIndex: 30,
          }}
        >
          <Aarav pose="shock" scale={1.7} facing="left" />
        </div>
      </svg>
    </div>
  );
};

