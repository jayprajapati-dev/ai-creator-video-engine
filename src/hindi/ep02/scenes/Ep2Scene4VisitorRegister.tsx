/**
 * Episode 02 — Scene 4: THE VISITOR REGISTER (23–35s, frames 690–1050)
 * The Core Mystery Reveal:
 * - Macro push-in onto the old leather-bound visitor log.
 * - Yellowed parchment pages with old ink entries.
 * - Crucial Entry Reveal:
 *     NAME: AARAV
 *     DATE: 17 YEARS AGO
 *     STATUS: CHECKED IN
 * - Extreme close-up of Aarav's trembling fingers and shocked reaction.
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Ep2SceneConfig } from "../episode2Config";
import { HindiCaptions } from "../../HindiCaptions";
import { HindiOverlay } from "../../HindiOverlay";
import { Aarav } from "../../Aarav";

interface Props {
  scene: Ep2SceneConfig;
}

export const Ep2Scene4VisitorRegister: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rel = frame;

  // Camera zooms in directly onto the register book
  const camZoom = interpolate(rel, [0, 160, 300], [1.0, 1.25, 1.3], { extrapolateRight: "clamp" });

  // Spring highlight on the name "AARAV" at rel=105 (synced with narration "नाम: आरव")
  const nameSpring = spring({ frame: rel - 105, fps, config: { damping: 10, stiffness: 180 } });

  // 17 Years Ago Red stamp alert at rel=165 (synced with narration "तारीख़: सत्रह साल पहले!")
  const stampSpring = spring({ frame: rel - 165, fps, config: { damping: 12, stiffness: 220 } });

  // Trembling hand overlay
  const handTremor = (rel % 4 < 2 ? 3 : -3);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#03060C",
        overflow: "hidden",
        transform: `scale(${camZoom})`,
        transformOrigin: "540px 880px",
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="deskLampAtmo" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#2A1B0A" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#08101C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="parchment" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2D4B7" />
            <stop offset="50%" stopColor="#F5E8C7" />
            <stop offset="100%" stopColor="#C9B897" />
          </linearGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#deskLampAtmo)" />

        {/* ── Wooden Security Counter Surface ─────────────────── */}
        <rect x="0" y="520" width="1080" height="1400" fill="#0D1E2E" stroke="#1A3A54" strokeWidth="4" />
        {/* Wood grain lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={620 + i * 150} x2="1080" y2={620 + i * 150} stroke="#081420" strokeWidth="2" />
        ))}

        {/* ── The Visitor Register Book (Large & Clear) ──────── */}
        <g transform="translate(540, 940)">
          {/* Leather binder cover shadow */}
          <rect x="-420" y="-270" width="840" height="540" rx="14" fill="#3D1D0A" stroke="#5C2C10" strokeWidth="6" />

          {/* Left page (Aged Parchment) */}
          <rect x="-400" y="-250" width="390" height="500" rx="4" fill="url(#parchment)" />
          {/* Right page */}
          <rect x="10" y="-250" width="390" height="500" rx="4" fill="url(#parchment)" />
          {/* Center Book Spine */}
          <rect x="-10" y="-250" width="20" height="500" fill="#523B24" />

          {/* Book Header */}
          <text x="-205" y="-205" textAnchor="middle" fill="#4A341E" fontSize="18" fontFamily="serif" fontWeight="800">
            METRO MALL — SECURITY LOGBOOK (BASEMENT 1)
          </text>
          <text x="205" y="-205" textAnchor="middle" fill="#4A341E" fontSize="18" fontFamily="serif" fontWeight="800">
            VISITOR ENTRY SHEET
          </text>

          {/* Table Headers */}
          <g fill="#5C4028" fontSize="13" fontFamily="monospace" fontWeight="700">
            <text x="-380" y="-170">DATE</text>
            <text x="-260" y="-170">VISITOR NAME</text>
            <text x="-100" y="-170">PURPOSE</text>
            <text x="30" y="-170">TIME</text>
            <text x="140" y="-170">STATUS</text>
          </g>
          <line x1="-390" y1="-155" x2="390" y2="-155" stroke="#7A5636" strokeWidth="1.5" />

          {/* Normal past entries (faded) */}
          <g fill="#5C4530" fontSize="13" fontFamily="monospace" opacity="0.6">
            <text x="-380" y="-120">2009-10-12</text>
            <text x="-260" y="-120">R. Sharma</text>
            <text x="-100" y="-120">Maint.</text>
            <text x="30" y="-120">21:30</text>
            <text x="140" y="-120">OUT</text>

            <text x="-380" y="-80">2009-10-18</text>
            <text x="-260" y="-80">V. Gupta</text>
            <text x="-100" y="-80">Electric</text>
            <text x="30" y="-80">23:05</text>
            <text x="140" y="-80">OUT</text>
          </g>

          {/* ══════════════════════════════════════════════════════
              THE SHOCKING ENTRY: AARAV (17 YEARS AGO)
             ══════════════════════════════════════════════════════ */}
          {rel > 80 && (
            <g transform="translate(0, 0)">
              {/* Highlight bar */}
              <rect x="-390" y="-35" width="780" height="70" rx="8"
                fill="rgba(220,38,38,0.15)" stroke="#DC2626" strokeWidth="2.5" />

              {/* Date */}
              <text x="-380" y="8" fill="#B91C1C" fontSize="16" fontFamily="monospace" fontWeight="900">
                17 YEARS AGO
              </text>

              {/* Name: AARAV (Huge, Clear, Illuminated) */}
              <text
                x="-120"
                y="10"
                fill="#000000"
                fontSize="28"
                fontFamily="system-ui, sans-serif"
                fontWeight="900"
                letterSpacing="4"
                transform={`scale(${Math.max(0, nameSpring)})`}
                style={{ transformOrigin: "-120px 0" }}
              >
                AARAV
              </text>

              {/* Status */}
              <text x="140" y="8" fill="#B91C1C" fontSize="16" fontFamily="monospace" fontWeight="900">
                CHECKED IN
              </text>

              {/* Red Stamp Overlay: "NEVER CHECKED OUT" */}
              {rel > 210 && (
                <g
                  transform={`translate(240, -5) rotate(-12) scale(${Math.max(0, stampSpring)})`}
                  style={{ transformOrigin: "0 0" }}
                >
                  <rect x="-90" y="-22" width="180" height="44" rx="4"
                    fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 3" />
                  <text x="0" y="7" textAnchor="middle" fill="#DC2626" fontSize="16"
                    fontFamily="monospace" fontWeight="900">
                    STILL INSIDE
                  </text>
                </g>
              )}
            </g>
          )}

          {/* Aarav's trembling finger pointing on page */}
          {rel > 120 && (
            <g transform={`translate(-180, ${60 + handTremor})`}>
              <ellipse cx="0" cy="0" rx="14" ry="24" fill="#C58F68" stroke="#875836" strokeWidth="2" />
              <rect x="-8" y="10" width="16" height="60" rx="6" fill="#0C1D2E" />
            </g>
          )}
        </g>

        {/* ── Top Inset: Aarav Shocked Eyes Close-Up ──────────── */}
        {rel > 160 && (
          <g transform="translate(540, 360)">
            <rect x="-240" y="-80" width="480" height="160" rx="12" fill="#030810" stroke="#00D4D4" strokeWidth="2" />
            {/* Aarav Eyes */}
            <circle cx="-90" cy="0" r="32" fill="#FFFFFF" />
            <circle cx="-90" cy="0" r="18" fill="#000000" />
            <circle cx="-84" cy="-5" r="5" fill="#FFFFFF" />
            {/* Dilated Pupil */}
            <circle cx="90" cy="0" r="32" fill="#FFFFFF" />
            <circle cx="90" cy="0" r="18" fill="#000000" />
            <circle cx="96" cy="-5" r="5" fill="#FFFFFF" />
            {/* Eyelids trembling */}
            <path d="M -130,-15 Q -90,-35 -50,-15" fill="none" stroke="#000000" strokeWidth="6" />
            <path d="M 50,-15 Q 90,-35 130,-15" fill="none" stroke="#000000" strokeWidth="6" />
          </g>
        )}
      </svg>

      {/* Aarav standing in front of counter */}
      <div
        style={{
          position: "absolute",
          bottom: 380,
          right: 80,
          zIndex: 30,
        }}
      >
        <Aarav pose="shock" scale={1.2} facing="left" />
      </div>

      <HindiOverlay sceneTitle={scene.titleEnglish} timecode={scene.timecode} />
      <HindiCaptions captions={scene.captions} sceneFrame={rel + scene.startFrame} />
    </div>
  );
};

