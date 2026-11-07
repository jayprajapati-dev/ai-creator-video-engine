/**
 * CTRL_WALA — MascotCharacter Component (Version 3.0 - Scene-Reactive Gestures)
 *
 * Dynamic creator avatar with scene-aware poses, arm gestures, and expressions:
 *  - Poses:
 *      • "pointing-up"     -> Pointing arm raised towards the UI/code card above
 *      • "explaining"      -> Open hand gesturing towards the code screen
 *      • "thinking-chin"   -> Hand on chin, head tilted, evaluating
 *      • "celebrating"     -> Thumbs up & confident smile
 *      • "talking"         -> Natural creator conversational delivery
 *  - Expressions: "happy", "excited", "thinking", "serious", "surprised", "explaining"
 *  - Dynamic mouth sync with speech timing
 *  - Crisp vector art with 3.5px bold outlines & cartoon speech bubble
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../designSystem/lightTheme";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";

export type MascotExpression =
  | "happy"
  | "talking"
  | "explaining"
  | "excited"
  | "thinking"
  | "serious"
  | "surprised";

export type MascotPose =
  | "default"
  | "talking"
  | "pointing-up"
  | "explaining"
  | "thinking-chin"
  | "celebrating";

export interface SpeechBubbleWord {
  text: string;
  highlight?: boolean;
  color?: "purple" | "orange";
}

interface MascotCharacterProps {
  expression?: MascotExpression;
  pose?: MascotPose;
  speechWords?: SpeechBubbleWord[];
  isSpeaking?: boolean;
  delay?: number;
  width?: number;
  flipX?: boolean;
}

export const MascotCharacter: React.FC<MascotCharacterProps> = ({
  expression = "happy",
  pose = "talking",
  speechWords,
  isSpeaking = true,
  delay = 0,
  width = 360,
  flipX = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({
    frame: f,
    fps,
    config: { stiffness: 220, damping: 22 },
  });

  const translateY = interpolate(entrance, [0, 1], [80, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  // Breathing float & lifelike conversational head dynamics
  const breathY = Math.sin((frame / 22) * Math.PI) * 3.5;
  const nodRotate = isSpeaking
    ? Math.sin((frame / 11) * Math.PI) * 2.2
    : pose === "thinking-chin"
    ? -3.5
    : pose === "explaining"
    ? 2.0
    : 0;

  // Multi-harmonic mouth speech cycle (simulates real phoneme variation)
  const speechSine1 = Math.sin(frame * 0.44);
  const speechSine2 = Math.sin(frame * 0.88 + 1.2);
  const speechHarmonic = Math.max(0, speechSine1 * 0.55 + speechSine2 * 0.45 + 0.35);
  const mouthOpenY = isSpeaking ? 185 + speechHarmonic * 22 : 185;
  const mouthWidthX = isSpeaking ? 183 + speechHarmonic * 3 : 183;

  // Hand gesture subtle dynamic articulation
  const gesturePulse = Math.sin((frame / 14) * Math.PI) * 4;

  // Natural organic blinking (double blink occasionally)
  const blinkCycle = frame % 90;
  const isBlinking = blinkCycle > 84 && blinkCycle < 88;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        transform: `translateY(${translateY + breathY}px)`,
        opacity,
        position: "relative",
        flexDirection: flipX ? "row-reverse" : "row",
      }}
    >
      {/* ── Vector Mascot SVG ── */}
      <div style={{ width, flexShrink: 0 }}>
        <svg
          viewBox="0 0 320 340"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
            transform: `${flipX ? "scaleX(-1)" : ""} rotate(${nodRotate}deg)`,
            transformOrigin: "160px 240px",
          }}
        >
          <defs>
            <clipPath id="glassesLeftClip">
              <rect x="74" y="112" width="68" height="68" rx="34" />
            </clipPath>
            <clipPath id="glassesRightClip">
              <rect x="178" y="112" width="68" height="68" rx="34" />
            </clipPath>
          </defs>

          {/* ── BODY / HOODIE ── */}
          <path
            d="M 25 340 C 25 250 80 230 160 230 C 240 230 295 250 295 340 Z"
            fill="#236B5E"
            stroke="#18181B"
            strokeWidth="4"
          />

          {/* Collar / Neckline */}
          <path
            d="M 115 235 C 130 260 190 260 205 235 C 190 248 130 248 115 235 Z"
            fill="#1A5349"
            stroke="#18181B"
            strokeWidth="3.5"
          />

          {/* Drawstrings */}
          <path d="M 138 245 Q 136 280 134 305" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 182 245 Q 184 280 186 305" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="134" cy="307" r="4" fill="#C5C5C5" stroke="#18181B" strokeWidth="2" />
          <circle cx="186" cy="307" r="4" fill="#C5C5C5" stroke="#18181B" strokeWidth="2" />

          {/* Orange Badge on Chest */}
          <circle cx="225" cy="285" r="16" fill="#FF7A3D" stroke="#18181B" strokeWidth="3" />
          <circle cx="221" cy="282" r="2" fill="#18181B" />
          <circle cx="229" cy="282" r="2" fill="#18181B" />
          <path d="M 220 288 Q 225 293 230 288" stroke="#18181B" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* ── DYNAMIC ARMS & GESTURES (With Active Motion Wobble) ── */}
          {pose === "pointing-up" ? (
            // Raised arm pointing upward towards the code card
            <g>
              <path
                d={`M 240 250 Q 275 ${190 + gesturePulse * 0.5} 268 ${120 + gesturePulse}`}
                stroke="#18181B"
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M 240 250 Q 275 ${190 + gesturePulse * 0.5} 268 ${120 + gesturePulse}`}
                stroke="#236B5E"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hand with index finger pointing straight up */}
              <circle cx="268" cy={110 + gesturePulse} r="13" fill="#C98858" stroke="#18181B" strokeWidth="3.5" />
              <path d={`M 268 ${110 + gesturePulse} L 268 ${85 + gesturePulse}`} stroke="#C98858" strokeWidth="10" strokeLinecap="round" />
              <path d={`M 268 ${110 + gesturePulse} L 268 ${85 + gesturePulse}`} stroke="#18181B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          ) : pose === "explaining" ? (
            // Open palm gesturing towards the right
            <g>
              <path
                d={`M 240 250 Q ${275 + gesturePulse} 220 ${290 + gesturePulse * 1.2} 190`}
                stroke="#18181B"
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M 240 250 Q ${275 + gesturePulse} 220 ${290 + gesturePulse * 1.2} 190`}
                stroke="#236B5E"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              {/* Open gesturing hand */}
              <ellipse cx={295 + gesturePulse} cy="182" rx="14" ry="12" fill="#C98858" stroke="#18181B" strokeWidth="3.5" />
              <path d={`M ${292 + gesturePulse} 172 Q ${306 + gesturePulse} 170 ${312 + gesturePulse} 178`} stroke="#C98858" strokeWidth="7" strokeLinecap="round" />
              <path d={`M ${292 + gesturePulse} 172 Q ${306 + gesturePulse} 170 ${312 + gesturePulse} 178`} stroke="#18181B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          ) : pose === "thinking-chin" ? (
            // Hand on chin
            <g>
              <path
                d={`M 240 270 Q 245 220 200 ${200 + gesturePulse * 0.4}`}
                stroke="#18181B"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M 240 270 Q 245 220 200 ${200 + gesturePulse * 0.4}`}
                stroke="#236B5E"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="196" cy={198 + gesturePulse * 0.4} r="13" fill="#C98858" stroke="#18181B" strokeWidth="3.5" />
            </g>
          ) : pose === "celebrating" ? (
            // Thumbs up gesture
            <g>
              <path
                d={`M 240 255 Q 280 230 275 ${180 + gesturePulse}`}
                stroke="#18181B"
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M 240 255 Q 280 230 275 ${180 + gesturePulse}`}
                stroke="#236B5E"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              {/* Fist + Thumb up */}
              <circle cx="275" cy={172 + gesturePulse} r="14" fill="#C98858" stroke="#18181B" strokeWidth="3.5" />
              <path d={`M 275 ${170 + gesturePulse} L 275 ${148 + gesturePulse}`} stroke="#C98858" strokeWidth="9" strokeLinecap="round" />
              <path d={`M 275 ${170 + gesturePulse} L 275 ${148 + gesturePulse}`} stroke="#18181B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          ) : null}

          {/* ── NECK ── */}
          <path d="M 135 200 L 135 240 C 145 245 175 245 185 240 L 185 200 Z" fill="#B9784B" stroke="#18181B" strokeWidth="4" />

          {/* ── EARS ── */}
          <ellipse cx="68" cy="155" rx="14" ry="18" fill="#C98858" stroke="#18181B" strokeWidth="3.5" />
          <path d="M 66 150 Q 72 155 68 162" stroke="#A6673A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="252" cy="155" rx="14" ry="18" fill="#C98858" stroke="#18181B" strokeWidth="3.5" />
          <path d="M 254 150 Q 248 155 252 162" stroke="#A6673A" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* ── HEAD ── */}
          <ellipse cx="160" cy="150" rx="78" ry="82" fill="#C98858" stroke="#18181B" strokeWidth="4" />

          {/* ── CURLY AFRO HAIR ── */}
          <path
            d="
              M 82 145
              C 62 145 55 125 65 105
              C 55 90 65 65 85 62
              C 80 40 105 28 128 35
              C 142 22 178 22 192 35
              C 215 28 240 40 235 62
              C 255 65 265 90 255 105
              C 265 125 258 145 238 145
              C 242 125 230 95 210 90
              C 190 85 130 85 110 90
              C 90 95 78 125 82 145 Z
            "
            fill="#1E1E22"
            stroke="#18181B"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* ── EYEBROWS ── */}
          <path
            d={expression === "thinking" ? "M 88 100 Q 112 92 134 102" : "M 88 104 Q 110 96 132 104"}
            stroke="#1E1E22"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={expression === "thinking" ? "M 188 95 Q 210 88 232 98" : "M 188 104 Q 210 96 232 104"}
            stroke="#1E1E22"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── GLASSES ── */}
          <rect x="74" y="112" width="68" height="68" rx="34" fill="rgba(255,255,255,0.12)" stroke="#18181B" strokeWidth="5" />
          <rect x="178" y="112" width="68" height="68" rx="34" fill="rgba(255,255,255,0.12)" stroke="#18181B" strokeWidth="5" />
          <path d="M 142 144 Q 160 138 178 144" stroke="#18181B" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* ── EYES (Gaze follows UI when pointing up) ── */}
          <g clipPath="url(#glassesLeftClip)">
            {isBlinking ? (
              <line x1="90" y1="146" x2="126" y2="146" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
            ) : (
              <>
                <circle cx="108" cy="146" r="14" fill="#FFFFFF" />
                <circle cx={pose === "pointing-up" ? 108 : 109} cy={pose === "pointing-up" ? 141 : 146} r="8" fill="#18181B" />
                <circle cx={pose === "pointing-up" ? 111 : 112} cy={pose === "pointing-up" ? 138 : 143} r="3" fill="#FFFFFF" />
              </>
            )}
          </g>

          <g clipPath="url(#glassesRightClip)">
            {isBlinking ? (
              <line x1="194" y1="146" x2="230" y2="146" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
            ) : (
              <>
                <circle cx="212" cy="146" r="14" fill="#FFFFFF" />
                <circle cx={pose === "pointing-up" ? 212 : 213} cy={pose === "pointing-up" ? 141 : 146} r="8" fill="#18181B" />
                <circle cx={pose === "pointing-up" ? 215 : 216} cy={pose === "pointing-up" ? 138 : 143} r="3" fill="#FFFFFF" />
              </>
            )}
          </g>

          {/* ── NOSE ── */}
          <path d="M 156 160 Q 160 166 164 160" stroke="#A6673A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* ── MOUTH (Synced with multi-harmonic speech cycle) ── */}
          {isSpeaking && (expression === "talking" || expression === "explaining") ? (
            <g>
              <path
                d={`M ${320 - mouthWidthX} 182 Q 160 ${mouthOpenY} ${mouthWidthX} 182 Z`}
                fill="#541B18"
                stroke="#18181B"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d={`M ${320 - mouthWidthX + 7} 183 Q 160 186 ${mouthWidthX - 7} 183 L ${mouthWidthX - 9} 189 Q 160 192 ${320 - mouthWidthX + 9} 189 Z`}
                fill="#FFFFFF"
              />
              {mouthOpenY > 192 && (
                <path
                  d={`M 148 ${mouthOpenY - 5} Q 160 ${mouthOpenY - 12} 172 ${mouthOpenY - 5} Q 160 ${mouthOpenY + 1} 148 ${mouthOpenY - 5} Z`}
                  fill="#E57373"
                />
              )}
            </g>
          ) : expression === "excited" || expression === "happy" || pose === "celebrating" ? (
            <g>
              <path d="M 134 180 Q 160 212 186 180 Z" fill="#541B18" stroke="#18181B" strokeWidth="4" strokeLinejoin="round" />
              <path d="M 140 181 Q 160 186 180 181 L 178 188 Q 160 193 142 188 Z" fill="#FFFFFF" />
            </g>
          ) : expression === "thinking" ? (
            <path d="M 140 185 Q 160 182 178 188" stroke="#18181B" strokeWidth="4" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M 138 182 Q 160 200 182 182" stroke="#18181B" strokeWidth="4" strokeLinecap="round" fill="none" />
          )}
        </svg>
      </div>

      {/* ── SPEECH BUBBLE ── */}
      {speechWords && speechWords.length > 0 && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "3.5px solid #18181B",
            borderRadius: 22,
            padding: "16px 24px",
            boxShadow: "0 5px 0px #18181B",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            position: "relative",
            maxWidth: 580,
          }}
        >
          {/* Seamless Comic Speech Bubble Tail */}
          <svg
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: flipX ? "auto" : -20,
              right: flipX ? -20 : "auto",
              top: "50%",
              transform: `translateY(-50%) ${flipX ? "scaleX(-1)" : ""}`,
              width: 22,
              height: 24,
              overflow: "visible",
              zIndex: 3,
            }}
          >
            {/* Dark border tail */}
            <path
              d="M 22 2 L 2 12 L 22 22 Z"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* White overlay mask to open into bubble interior */}
            <line x1="21" y1="4" x2="21" y2="20" stroke="#FFFFFF" strokeWidth="6" />
          </svg>

          {speechWords.map((word, i) => {
            if (word.highlight) {
              const bg = word.color === "orange" ? LIGHT.orange.pure : "#7C3AED";
              return (
                <span
                  key={i}
                  style={{
                    backgroundColor: bg,
                    color: "#FFFFFF",
                    borderRadius: 10,
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 4,
                    paddingBottom: 4,
                    fontFamily: LIGHT_FONTS.body,
                    fontSize: 26,
                    fontWeight: LIGHT_FONT_WEIGHT.black,
                    lineHeight: 1.2,
                    boxShadow: "0 2px 0 rgba(0,0,0,0.15)",
                    display: "inline-block",
                  }}
                >
                  {word.text}
                </span>
              );
            }

            return (
              <span
                key={i}
                style={{
                  fontFamily: LIGHT_FONTS.body,
                  fontSize: 26,
                  fontWeight: LIGHT_FONT_WEIGHT.extrabold,
                  color: "#18181B",
                  lineHeight: 1.2,
                  display: "inline-block",
                }}
              >
                {word.text}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
