import React from "react";
import { Aarav } from "../hindi/Aarav";

/**
 * YouTube & Instagram Profile Picture (Logo)
 * 800 x 800 px (1:1 Ratio, Circular Crop Safe)
 */
export const ChannelLogo: React.FC = () => {
  return (
    <div
      style={{
        width: 800,
        height: 800,
        backgroundColor: "#03060C",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Noto Sans Devanagari', 'Mangal', system-ui, sans-serif",
      }}
    >
      <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="logoBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B1B30" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#040812" stopOpacity="1" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="cyanCore" cx="50%" cy="42%" r="35%">
            <stop offset="0%" stopColor="#00D4D4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00D4D4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="redLens" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </radialGradient>
          <linearGradient id="neonBorder" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00D4D4" />
            <stop offset="50%" stopColor="#0A2540" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="800" height="800" fill="url(#logoBg)" />
        <rect width="800" height="800" fill="url(#cyanCore)" />

        {/* Circular Safe Guide Outer Ring (diameter 740) */}
        <circle
          cx="400"
          cy="400"
          r="360"
          fill="none"
          stroke="url(#neonBorder)"
          strokeWidth="6"
          strokeDasharray="16 10"
          opacity="0.85"
        />
        <circle
          cx="400"
          cy="400"
          r="342"
          fill="none"
          stroke="#00D4D4"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Background City Grid / Silhouette */}
        <g opacity="0.35">
          <rect x="180" y="240" width="60" height="260" fill="#0A1828" />
          <rect x="250" y="190" width="80" height="310" fill="#061220" />
          <rect x="470" y="170" width="75" height="330" fill="#061220" />
          <rect x="555" y="230" width="65" height="270" fill="#0A1828" />
          {/* Windows */}
          {[210, 270, 490, 575].map((x, i) => (
            <g key={i} fill="#00D4D4" opacity="0.2">
              <rect x={x} y="280" width="8" height="12" />
              <rect x={x} y="320" width="8" height="12" />
              <rect x={x} y="360" width="8" height="12" />
            </g>
          ))}
        </g>

        {/* Eerie Elevator Door Frame in Center */}
        <rect
          x="280"
          y="180"
          width="240"
          height="320"
          rx="12"
          fill="#030810"
          stroke="#00D4D4"
          strokeWidth="3.5"
        />
        {/* Elevator Door Gap Glowing Red */}
        <line x1="400" y1="180" x2="400" y2="500" stroke="#DC2626" strokeWidth="4" />
        <line x1="398" y1="180" x2="398" y2="500" stroke="#00D4D4" strokeWidth="1" opacity="0.6" />

        {/* Floor Indicator Display (Glowing "B1") */}
        <rect x="350" y="200" width="100" height="40" rx="8" fill="#020408" stroke="#DC2626" strokeWidth="2" />
        <text
          x="400"
          y="230"
          textAnchor="middle"
          fill="#EF4444"
          fontSize="26"
          fontFamily="monospace"
          fontWeight="900"
        >
          B1
        </text>

        {/* CCTV Camera with ominous red glow lens */}
        <g transform="translate(400, 310)">
          {/* Outer Lens Housing */}
          <circle cx="0" cy="0" r="54" fill="#081420" stroke="#00D4D4" strokeWidth="4" />
          <circle cx="0" cy="0" r="42" fill="#02060A" stroke="#1A344E" strokeWidth="2" />
          {/* Glowing Red Eye */}
          <circle cx="0" cy="0" r="24" fill="url(#redLens)" />
          <circle cx="-6" cy="-6" r="6" fill="#FFFFFF" opacity="0.8" />
          {/* Glint and crosshair */}
          <circle cx="0" cy="0" r="32" fill="none" stroke="#DC2626" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="-38" y1="0" x2="-26" y2="0" stroke="#DC2626" strokeWidth="2" />
          <line x1="26" y1="0" x2="38" y2="0" stroke="#DC2626" strokeWidth="2" />
          <line x1="0" y1="-38" x2="0" y2="-26" stroke="#DC2626" strokeWidth="2" />
          <line x1="0" y1="26" x2="0" y2="38" stroke="#DC2626" strokeWidth="2" />
        </g>

        {/* Top Arc Tagline */}
        <text
          x="400"
          y="135"
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="17"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="8"
        >
          THE UNKNOWN CITY
        </text>

        {/* Main Hindi Name Banner */}
        <g transform="translate(400, 580)">
          {/* Background pill */}
          <rect
            x="-210"
            y="-46"
            width="420"
            height="80"
            rx="16"
            fill="#050C18"
            stroke="#00D4D4"
            strokeWidth="2.5"
          />
          {/* Red Accent line */}
          <rect x="-190" y="24" width="380" height="3" fill="#DC2626" />
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#F1F5F9"
            fontSize="46"
            fontWeight="900"
            letterSpacing="2"
          >
            अनजान शहर
          </text>
        </g>

        {/* Bottom Sub-tag */}
        <text
          x="400"
          y="670"
          textAnchor="middle"
          fill="#00D4D4"
          fontSize="19"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="4"
        >
          HINDI MYSTERY TOONS
        </text>

        {/* Recording dot */}
        <circle cx="270" cy="664" r="5" fill="#DC2626" />
        <circle cx="530" cy="664" r="5" fill="#DC2626" />
      </svg>
    </div>
  );
};

/**
 * YouTube Channel Banner (Header)
 * 2560 x 1440 px
 * Safe Zone: Center 1546 x 423 px (Y: 508 to 931, X: 507 to 2053)
 */
export const YouTubeBanner: React.FC = () => {
  return (
    <div
      style={{
        width: 2560,
        height: 1440,
        backgroundColor: "#020408",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Noto Sans Devanagari', 'Mangal', system-ui, sans-serif",
      }}
    >
      <svg
        width="2560"
        height="1440"
        viewBox="0 0 2560 1440"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="bannerBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B1A2E" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#040812" stopOpacity="1" />
            <stop offset="100%" stopColor="#010306" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#061220" />
            <stop offset="100%" stopColor="#020408" />
          </linearGradient>
          <radialGradient id="cyanLamp" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="#00D4D4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D4D4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="redWarningGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Global Dark Background */}
        <rect width="2560" height="1440" fill="url(#bannerBg)" />

        {/* Background High-rise Silhouettes */}
        <g opacity="0.35">
          <rect x="150" y="300" width="140" height="850" fill="#040A14" />
          <rect x="330" y="220" width="180" height="930" fill="#060F1E" />
          <rect x="540" y="360" width="120" height="790" fill="#040A14" />
          <rect x="1900" y="240" width="160" height="910" fill="#060F1E" />
          <rect x="2100" y="340" width="140" height="810" fill="#040A14" />
          <rect x="2280" y="270" width="190" height="880" fill="#060F1E" />
        </g>

        {/* Ground Floor */}
        <rect x="0" y="1050" width="2560" height="390" fill="url(#floorGrad)" />
        {/* Floor Grid Lines */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1={i * 150}
            y1="1050"
            x2={i * 150 - 80}
            y2="1440"
            stroke="#0C1E34"
            strokeWidth="2"
            opacity="0.4"
          />
        ))}

        {/* Fog / Atmosphere layer */}
        <rect x="0" y="900" width="2560" height="250" fill="url(#cyanLamp)" />

        {/* Left Side: CCTV Mast & Warning sign */}
        <g transform="translate(380, 520)">
          {/* Pole */}
          <line x1="0" y1="0" x2="0" y2="530" stroke="#0E2238" strokeWidth="8" />
          {/* CCTV Camera */}
          <polygon points="0,50 60,35 60,75" fill="#091828" stroke="#00D4D4" strokeWidth="2" />
          <circle cx="62" cy="55" r="7" fill="#DC2626" />
          {/* Motion cone */}
          <polygon points="62,55 240,0 240,160" fill="#00D4D4" opacity="0.08" />
        </g>

        {/* ══════════════════════════════════════════════════════════════
            YOUTUBE SAFE ZONE AREA: (X: 507 to 2053, Y: 508 to 931)
            Exact Size: 1546 x 423 px — All critical elements live here!
           ══════════════════════════════════════════════════════════════ */}

        {/* Safe zone boundary subtle ambient plate */}
        <rect
          x="507"
          y="508"
          width="1546"
          height="423"
          rx="24"
          fill="#040914"
          stroke="#00D4D4"
          strokeWidth="1.5"
          strokeOpacity="0.25"
        />

        {/* Left safe zone: Aarav silhouette standing */}
        <g transform="translate(680, 580)">
          {/* Mysterious glowing door behind him */}
          <rect x="-40" y="-30" width="180" height="290" rx="8" fill="#08182A" stroke="#00D4D4" strokeWidth="2" />
          <rect x="-40" y="-30" width="180" height="290" fill="url(#cyanLamp)" />
          {/* Aarav silhouette */}
          <g transform="translate(50, 40) scale(0.65)">
            <Aarav pose="standing" facing="right" />
          </g>
        </g>

        {/* Center safe zone: Brand Titles & Catchphrases */}
        <g transform="translate(1280, 570)">
          {/* Series badge */}
          <rect x="-180" y="-35" width="360" height="34" rx="6" fill="#DC2626" />
          <text
            x="0"
            y="-12"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="18"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            letterSpacing="3"
          >
            ORIGINAL HINDI ANIMATED SERIES
          </text>

          {/* Hindi Title (Very Large, Clean & Bold) */}
          <text
            x="0"
            y="75"
            textAnchor="middle"
            fill="#F1F5F9"
            fontSize="92"
            fontWeight="900"
            letterSpacing="2"
            filter="drop-shadow(0 4px 18px rgba(0,212,212,0.4))"
          >
            अनजान शहर
          </text>

          {/* English Brand Subtitle */}
          <text
            x="0"
            y="130"
            textAnchor="middle"
            fill="#00D4D4"
            fontSize="34"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            letterSpacing="10"
          >
            THE UNKNOWN CITY
          </text>

          {/* Story Tagline */}
          <text
            x="0"
            y="180"
            textAnchor="middle"
            fill="#CBD5E1"
            fontSize="22"
            fontFamily="'Noto Sans Devanagari', 'Mangal', sans-serif"
            fontWeight="600"
            letterSpacing="1"
          >
            "मॉल बंद था... फिर लिफ्ट किसने चलाई?" | हर रात एक नया खौफ
          </text>

          {/* Feature Badges */}
          <g transform="translate(0, 235)">
            {/* Badge 1: New Episodes */}
            <rect x="-310" y="-18" width="190" height="36" rx="8" fill="#0C1B2C" stroke="#00D4D4" strokeWidth="1.5" />
            <circle cx="-295" cy="0" r="5" fill="#22C55E" />
            <text x="-205" y="6" textAnchor="middle" fill="#E2E8F0" fontSize="15" fontWeight="700">
              NEW EPISODES WEEKLY
            </text>

            {/* Badge 2: Shorts & Reels */}
            <rect x="-105" y="-18" width="210" height="36" rx="8" fill="#0C1B2C" stroke="#DC2626" strokeWidth="1.5" />
            <circle cx="-90" cy="0" r="5" fill="#DC2626" />
            <text x="5" y="6" textAnchor="middle" fill="#E2E8F0" fontSize="15" fontWeight="700">
              INTERACTIVE VOTING REELS
            </text>

            {/* Badge 3: Handle */}
            <rect x="120" y="-18" width="190" height="36" rx="8" fill="#0C1B2C" stroke="#00D4D4" strokeWidth="1.5" />
            <text x="215" y="6" textAnchor="middle" fill="#00D4D4" fontSize="15" fontFamily="monospace" fontWeight="800">
              @AnjaanSheharStories
            </text>
          </g>
        </g>

        {/* Right safe zone: Glowing Elevator B1 & Camera Graphic */}
        <g transform="translate(1820, 580)">
          {/* Elevator Frame */}
          <rect x="0" y="-30" width="150" height="290" rx="8" fill="#061220" stroke="#0F2844" strokeWidth="2" />
          <line x1="75" y1="-30" x2="75" y2="260" stroke="#DC2626" strokeWidth="3" />
          {/* Indicator B1 */}
          <rect x="35" y="-10" width="80" height="34" rx="6" fill="#030810" stroke="#DC2626" strokeWidth="1.5" />
          <text x="75" y="14" textAnchor="middle" fill="#EF4444" fontSize="20" fontFamily="monospace" fontWeight="900">
            B1
          </text>
          {/* Warning text */}
          <text x="75" y="90" textAnchor="middle" fill="#00D4D4" fontSize="12" fontFamily="monospace" fontWeight="700">
            RESTRICTED
          </text>
          <text x="75" y="110" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            LEVEL
          </text>
        </g>

        {/* Subtle Corner Crop Marks inside safe zone */}
        {[
          { x: 530, y: 530, dx: 25, dy: 25 },
          { x: 2030, y: 530, dx: -25, dy: 25 },
          { x: 530, y: 910, dx: 25, dy: -25 },
          { x: 2030, y: 910, dx: -25, dy: -25 },
        ].map((c, i) => (
          <path
            key={i}
            d={`M ${c.x} ${c.y + c.dy} L ${c.x} ${c.y} L ${c.x + c.dx} ${c.y}`}
            fill="none"
            stroke="#00D4D4"
            strokeWidth="2"
            opacity="0.5"
          />
        ))}
      </svg>
    </div>
  );
};

