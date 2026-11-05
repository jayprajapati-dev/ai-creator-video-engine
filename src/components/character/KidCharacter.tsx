import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type CharacterPose =
  | "standing"
  | "shocked"
  | "walking"
  | "phone"
  | "flashlight"
  | "panic";

interface KidCharacterProps {
  pose?: CharacterPose;
  scale?: number;
  facing?: "left" | "right";
  style?: React.CSSProperties;
}

export const KidCharacter: React.FC<KidCharacterProps> = ({
  pose = "standing",
  scale = 1,
  facing = "right",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-animations: breathing & idling
  const breath = Math.sin((frame / fps) * 3) * 4;
  const hairSway = Math.sin((frame / fps) * 2.5) * 3;

  // Blinking: blink every ~2.5 seconds for 5 frames
  const isBlink = frame % 75 >= 70 && pose !== "shocked" && pose !== "panic";

  // Eye shift: looking around nervously
  const eyeShiftX = Math.sin((frame / fps) * 1.5) * 4;

  // Panic tremor / shivering
  const panicShake =
    pose === "panic" || pose === "shocked"
      ? (frame % 2 === 0 ? 2 : -2)
      : 0;

  // Walk cycle
  const legAngle =
    pose === "walking"
      ? Math.sin((frame / fps) * 8) * 25
      : 0;

  // Flashlight beam angle sway
  const beamSway =
    pose === "flashlight"
      ? Math.sin((frame / fps) * 2) * 5
      : 0;

  // Flashlight flicker
  const beamFlicker =
    pose === "flashlight"
      ? 0.85 + 0.15 * Math.sin(frame * 1.8)
      : 1;

  const flipX = facing === "left" ? -1 : 1;

  return (
    <div
      style={{
        position: "relative",
        width: 300,
        height: 520,
        transformOrigin: "bottom center",
        transform: `scale(${scale * flipX}, ${scale}) translate(${panicShake}px, 0px)`,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 300 520"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Volumetric flashlight gradient */}
          <radialGradient
            id="flashlightCone"
            cx="0%"
            cy="50%"
            r="100%"
            fx="0%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FFF9A6" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FFEA61" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#FFD166" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
          </radialGradient>

          {/* Phone screen glow gradient */}
          <radialGradient id="phoneGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#64D2FF" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#0A84FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
          </radialGradient>

          {/* Shadow beneath character */}
          <radialGradient id="charShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#111111" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground contact shadow */}
        <ellipse
          cx="150"
          cy="510"
          rx="80"
          ry="14"
          fill="url(#charShadow)"
        />

        {/* BACKPACK STRAPS & BODY */}
        <g id="body" transform={`translate(0, ${breath})`}>
          {/* Legs */}
          <g id="legs">
            {/* Left Leg */}
            <g transform={`rotate(${-legAngle}, 130, 360)`}>
              <path
                d="M 120 360 L 115 470 L 145 470 L 140 360 Z"
                fill="#1E293B"
              />
              {/* Sneaker */}
              <path
                d="M 110 470 L 155 470 C 160 485, 145 495, 125 495 C 105 495, 100 485, 110 470 Z"
                fill="#E63946"
              />
              <path
                d="M 105 488 L 158 488 L 156 495 L 110 495 Z"
                fill="#FFFFFF"
              />
            </g>

            {/* Right Leg */}
            <g transform={`rotate(${legAngle}, 170, 360)`}>
              <path
                d="M 160 360 L 155 470 L 185 470 L 180 360 Z"
                fill="#0F172A"
              />
              {/* Sneaker */}
              <path
                d="M 150 470 L 195 470 C 200 485, 185 495, 165 495 C 145 495, 140 485, 150 470 Z"
                fill="#E63946"
              />
              <path
                d="M 145 488 L 198 488 L 196 495 L 150 495 Z"
                fill="#FFFFFF"
              />
            </g>
          </g>

          {/* Yellow / Mustard Retro Hoodie */}
          <path
            d="M 100 230 C 90 260, 85 340, 95 375 C 120 385, 180 385, 205 375 C 215 340, 210 260, 200 230 Z"
            fill="#F4A261"
            stroke="#111111"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Hoodie Pocket & Drawstrings */}
          <path
            d="M 120 310 Q 150 325 180 310 L 185 365 Q 150 375 115 365 Z"
            fill="#E76F51"
            stroke="#111111"
            strokeWidth="4"
          />
          <path d="M 140 235 L 140 270" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M 160 235 L 160 270" stroke="#FFFFFF" strokeWidth="3" />

          {/* ARMS & PROPS ACCORDING TO POSE */}
          {pose === "standing" && (
            <g id="arms-standing">
              {/* Left arm relaxed */}
              <path
                d="M 100 240 Q 75 300 95 340"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="95" cy="340" r="12" fill="#FFD5C2" />
              {/* Right arm relaxed */}
              <path
                d="M 200 240 Q 225 300 205 340"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="205" cy="340" r="12" fill="#FFD5C2" />
            </g>
          )}

          {pose === "shocked" && (
            <g id="arms-shocked">
              {/* Arms thrown up in shock */}
              <path
                d="M 100 240 Q 60 180 80 150"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="80" cy="150" r="14" fill="#FFD5C2" />
              <path
                d="M 200 240 Q 240 180 220 150"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="220" cy="150" r="14" fill="#FFD5C2" />
            </g>
          )}

          {pose === "walking" && (
            <g id="arms-walking">
              <path
                d={`M 100 240 Q ${80 - legAngle} 290 85 330`}
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M 200 240 Q ${220 + legAngle} 290 215 330`}
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {pose === "phone" && (
            <g id="arms-phone">
              {/* Arm holding phone up to chest */}
              <path
                d="M 195 240 Q 225 280 190 285"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              {/* Smartphone */}
              <rect
                x="180"
                y="245"
                width="36"
                height="65"
                rx="6"
                fill="#111111"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Glowing screen */}
              <rect
                x="184"
                y="250"
                width="28"
                height="45"
                rx="3"
                fill="#38BDF8"
              />
              {/* Face reflection glow from phone */}
              <circle
                cx="198"
                cy="270"
                r="70"
                fill="url(#phoneGlow)"
                style={{ mixBlendMode: "screen" }}
              />
            </g>
          )}

          {pose === "flashlight" && (
            <g id="arms-flashlight" transform={`rotate(${beamSway}, 200, 290)`}>
              {/* Arm holding flashlight forward */}
              <path
                d="M 195 240 L 225 275 L 245 285"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              {/* Flashlight body */}
              <polygon
                points="240,278 275,270 280,295 240,292"
                fill="#1E293B"
                stroke="#E63946"
                strokeWidth="2"
              />
              {/* Giant volumetric light cone shooting across room */}
              <polygon
                points="280,282 850,140 850,440"
                fill="url(#flashlightCone)"
                opacity={beamFlicker}
                style={{ mixBlendMode: "screen" }}
              />
            </g>
          )}

          {pose === "panic" && (
            <g id="arms-panic">
              {/* Hands clutching head */}
              <path
                d="M 95 240 Q 70 190 105 155"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 205 240 Q 230 190 195 155"
                stroke="#111111"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* HEAD & EXPRESSION */}
          <g id="head" transform={`translate(0, -5)`}>
            {/* Neck */}
            <rect x="135" y="190" width="30" height="25" fill="#FFD5C2" />

            {/* Face base */}
            <circle
              cx="150"
              cy="140"
              r="62"
              fill="#FFD5C2"
              stroke="#111111"
              strokeWidth="5"
            />

            {/* Hair with animated wind sway */}
            <path
              d={`M 90 135 C 80 80, 140 60, 160 55 C 200 65, 220 90, 215 135 C 195 105, 175 110, 160 95 C 145 115, 120 110, 90 135 Z`}
              fill="#264653"
              stroke="#111111"
              strokeWidth="5"
              transform={`rotate(${hairSway}, 150, 75)`}
            />

            {/* Ears */}
            <circle cx="88" cy="142" r="12" fill="#FFD5C2" stroke="#111111" strokeWidth="4" />
            <circle cx="212" cy="142" r="12" fill="#FFD5C2" stroke="#111111" strokeWidth="4" />

            {/* EYEBROWS */}
            {pose === "shocked" || pose === "panic" ? (
              <>
                {/* Slanted alarmed eyebrows */}
                <path d="M 115 108 L 138 118" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
                <path d="M 185 108 L 162 118" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Normal alert eyebrows */}
                <path d="M 115 116 Q 128 110 140 114" stroke="#111111" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 160 114 Q 172 110 185 116" stroke="#111111" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* EYES */}
            {isBlink ? (
              <>
                {/* Closed blinking line */}
                <path d="M 118 135 Q 128 140 138 135" stroke="#111111" strokeWidth="4" fill="none" />
                <path d="M 162 135 Q 172 140 182 135" stroke="#111111" strokeWidth="4" fill="none" />
              </>
            ) : pose === "shocked" || pose === "panic" ? (
              <>
                {/* Wide terrified round eyes */}
                <circle cx="128" cy="132" r="14" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
                <circle cx="172" cy="132" r="14" fill="#FFFFFF" stroke="#111111" strokeWidth="4" />
                {/* Pinpoint pupils */}
                <circle cx={128 + eyeShiftX * 0.5} cy="132" r="4" fill="#111111" />
                <circle cx={172 + eyeShiftX * 0.5} cy="132" r="4" fill="#111111" />
              </>
            ) : (
              <>
                {/* Big anime / editorial expressive eyes */}
                <circle cx="128" cy="135" r="11" fill="#111111" />
                <circle cx="172" cy="135" r="11" fill="#111111" />
                {/* Catchlight */}
                <circle cx={126 + eyeShiftX} cy="132" r="4" fill="#FFFFFF" />
                <circle cx={170 + eyeShiftX} cy="132" r="4" fill="#FFFFFF" />
              </>
            )}

            {/* MOUTH */}
            {pose === "shocked" || pose === "panic" ? (
              // Open gasp mouth
              <ellipse cx="150" cy="165" rx="14" ry="18" fill="#E63946" stroke="#111111" strokeWidth="4" />
            ) : pose === "phone" || pose === "flashlight" ? (
              // Tense closed grimace
              <path d="M 138 165 Q 150 162 162 165" stroke="#111111" strokeWidth="4" strokeLinecap="round" fill="none" />
            ) : (
              // Subtle nervous smirk
              <path d="M 142 164 Q 150 170 158 164" stroke="#111111" strokeWidth="4" strokeLinecap="round" fill="none" />
            )}

            {/* Blush / Cheek Details */}
            <circle cx="112" cy="148" r="6" fill="#F4A261" opacity="0.6" />
            <circle cx="188" cy="148" r="6" fill="#F4A261" opacity="0.6" />

            {/* SWEAT DROPS (when in panic or shock) */}
            {(pose === "shocked" || pose === "panic") && (
              <path
                d="M 215 110 C 215 110, 226 122, 226 128 C 226 134, 220 137, 215 137 C 210 137, 204 134, 204 128 C 204 122, 215 110, 215 110 Z"
                fill="#38BDF8"
                stroke="#111111"
                strokeWidth="2"
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
