import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type AaravPose =
  | "standing"
  | "walking"
  | "running"
  | "lookAround"
  | "fear"
  | "shock"
  | "phone"
  | "turning";

interface AaravProps {
  pose?: AaravPose;
  scale?: number;
  facing?: "left" | "right";
  style?: React.CSSProperties;
}

export const Aarav: React.FC<AaravProps> = ({
  pose = "standing",
  scale = 1,
  facing = "right",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Micro-animations ──────────────────────────────────────────────
  const breath = Math.sin((frame / fps) * 2.5) * 3;
  const hairSway = Math.sin((frame / fps) * 1.8) * 2;
  const eyeShiftX = Math.sin((frame / fps) * 1.2) * 3;

  // Blink every ~2.5s for 4 frames
  const isBlink = frame % 75 >= 71;

  // Fear/shock tremor
  const tremor = pose === "fear" || pose === "shock"
    ? (frame % 2 === 0 ? 3 : -3)
    : 0;

  // Walk cycle
  const walkAngle = pose === "walking"
    ? Math.sin((frame / fps) * 7) * 22
    : pose === "running"
    ? Math.sin((frame / fps) * 14) * 32
    : 0;

  // Phone screen glow pulse
  const phoneGlow = pose === "phone"
    ? 0.7 + 0.3 * Math.sin((frame / fps) * 5)
    : 0;

  // "Turning" — upper body twist
  const turnTwist = pose === "turning"
    ? Math.min((frame % 30) * 4, 90)
    : 0;

  const flipX = facing === "left" ? -1 : 1;

  // Eye expression params
  const isWide = pose === "shock" || pose === "fear";
  const isNervous = pose === "lookAround";

  return (
    <div
      style={{
        position: "relative",
        width: 280,
        height: 500,
        transformOrigin: "bottom center",
        transform: `scaleX(${flipX}) scaleY(${scale}) translate(${tremor}px, 0px)`,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 280 500"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Hoodie gradient — deep navy */}
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A2D5A" />
            <stop offset="100%" stopColor="#0D1B3E" />
          </linearGradient>

          {/* Phone screen blue glow */}
          <radialGradient id="phoneScreenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity={phoneGlow} />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </radialGradient>

          {/* Shoe soles */}
          <linearGradient id="soleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D1D5DB" />
          </linearGradient>

          {/* Ground shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground contact shadow */}
        <ellipse cx="140" cy="492" rx="70" ry="10" fill="url(#groundShadow)" />

        {/* ── LEGS ─────────────────────────────────────────────────── */}
        <g id="legs">
          {/* Left leg */}
          <g transform={`rotate(${-walkAngle}, 115, 345)`}>
            {/* Trouser */}
            <rect x="100" y="345" width="34" height="115" rx="5" fill="#111827" />
            {/* Sneaker white upper */}
            <ellipse cx="117" cy="462" rx="24" ry="10" fill="#F9FAFB" />
            <rect x="93" y="455" width="48" height="14" rx="7" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5" />
            {/* Red accent stripe */}
            <rect x="97" y="460" width="40" height="4" rx="2" fill="#DC2626" />
            {/* Sole */}
            <rect x="90" y="467" width="52" height="8" rx="4" fill="url(#soleGrad)" />
          </g>

          {/* Right leg */}
          <g transform={`rotate(${walkAngle}, 165, 345)`}>
            <rect x="148" y="345" width="34" height="115" rx="5" fill="#0F172A" />
            <ellipse cx="165" cy="462" rx="24" ry="10" fill="#F9FAFB" />
            <rect x="141" y="455" width="48" height="14" rx="7" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5" />
            <rect x="145" y="460" width="40" height="4" rx="2" fill="#DC2626" />
            <rect x="138" y="467" width="52" height="8" rx="4" fill="url(#soleGrad)" />
          </g>
        </g>

        {/* ── BODY — dark navy hoodie ───────────────────────────────── */}
        <g id="body" transform={`translate(0, ${breath})`}>
          {/* Hoodie main body */}
          <path
            d="M 85 215 C 72 250, 68 330, 78 365 C 100 378, 180 378, 202 365 C 212 330, 208 250, 195 215 Z"
            fill="url(#hoodieGrad)"
            stroke="#0A1428"
            strokeWidth="4"
          />

          {/* Hoodie kangaroo pocket */}
          <path
            d="M 108 300 Q 140 318 172 300 L 175 355 Q 140 365 105 355 Z"
            fill="#0D1B3E"
            stroke="#1E3A6E"
            strokeWidth="2.5"
          />

          {/* Hoodie drawstrings */}
          <line x1="128" y1="218" x2="125" y2="260" stroke="#2D4A8A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="152" y1="218" x2="155" y2="260" stroke="#2D4A8A" strokeWidth="2.5" strokeLinecap="round" />

          {/* Hoodie hood */}
          <path
            d="M 95 215 Q 80 170 100 155 Q 140 145 180 155 Q 200 170 185 215"
            fill="#1A2D5A"
            stroke="#0A1428"
            strokeWidth="4"
          />

          {/* Backpack straps — visible peeking from sides */}
          <path d="M 165 220 Q 190 250 185 310" stroke="#1E3A6E" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 115 220 Q 90 250 95 310" stroke="#1E3A6E" strokeWidth="12" strokeLinecap="round" fill="none" />

          {/* Small backpack visible */}
          <rect
            x="168"
            y="230"
            width="38"
            height="60"
            rx="8"
            fill="#152040"
            stroke="#2D4A8A"
            strokeWidth="2"
          />

          {/* ── ARMS ─────────────────────────────────────────────── */}
          {pose === "standing" || pose === "lookAround" || pose === "turning" ? (
            <g id="arms-idle">
              <path d="M 88 230 Q 65 285 80 335" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="80" cy="335" r="12" fill="#C8956E" />
              <path d="M 192 230 Q 215 285 200 335" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="200" cy="335" r="12" fill="#C8956E" />
            </g>
          ) : pose === "shock" || pose === "fear" ? (
            <g id="arms-shock">
              {/* Arms thrown up */}
              <path d="M 88 230 Q 55 175 72 148" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="72" cy="148" r="13" fill="#C8956E" />
              <path d="M 192 230 Q 225 175 208 148" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="208" cy="148" r="13" fill="#C8956E" />
            </g>
          ) : pose === "walking" || pose === "running" ? (
            <g id="arms-walk">
              <path d={`M 88 230 Q ${68 - walkAngle * 0.5} 285 83 320`} stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <path d={`M 192 230 Q ${212 + walkAngle * 0.5} 285 197 320`} stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
            </g>
          ) : pose === "phone" ? (
            <g id="arms-phone">
              {/* Right arm holds phone up */}
              <path d="M 192 230 Q 215 270 185 280" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              {/* Phone device */}
              <rect x="172" y="240" width="34" height="60" rx="6" fill="#111827" stroke="#374151" strokeWidth="2" />
              <rect x="176" y="246" width="26" height="42" rx="3" fill="#38BDF8" />
              {/* Screen blue glow */}
              <circle cx="189" cy="267" r="60" fill="url(#phoneScreenGlow)" />
              {/* Left arm relaxed */}
              <path d="M 88 230 Q 65 285 80 335" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="80" cy="335" r="12" fill="#C8956E" />
            </g>
          ) : (
            <g id="arms-default">
              <path d="M 88 230 Q 65 285 80 335" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="80" cy="335" r="12" fill="#C8956E" />
              <path d="M 192 230 Q 215 285 200 335" stroke="#0A1428" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="200" cy="335" r="12" fill="#C8956E" />
            </g>
          )}

          {/* ── HEAD ─────────────────────────────────────────────── */}
          <g id="head" transform={`translate(${pose === "turning" ? turnTwist * 0.3 : 0}, 0)`}>
            {/* Neck */}
            <rect x="128" y="185" width="24" height="30" rx="4" fill="#C8956E" />

            {/* Face base — warm Indian skin */}
            <circle cx="140" cy="135" r="58" fill="#C8956E" stroke="#0A1428" strokeWidth="4" />

            {/* Short messy black hair */}
            <path
              d={`M 85 128 C 82 75 115 55 140 52 C 165 55 198 75 195 128 C 180 100, 162 108, 150 92 C 138 110, 118 100, 85 128 Z`}
              fill="#1A1A1A"
              stroke="#0A0A0A"
              strokeWidth="3"
              transform={`rotate(${hairSway}, 140, 65)`}
            />
            {/* Messy side tuft */}
            <path
              d="M 85 110 C 75 95 80 82 90 85 C 85 92 90 105 95 110 Z"
              fill="#1A1A1A"
            />
            <path
              d="M 195 110 C 205 95 200 82 190 85 C 195 92 190 105 185 110 Z"
              fill="#1A1A1A"
            />

            {/* Ears */}
            <ellipse cx="82" cy="136" rx="11" ry="14" fill="#C8956E" stroke="#0A1428" strokeWidth="3" />
            <ellipse cx="198" cy="136" rx="11" ry="14" fill="#C8956E" stroke="#0A1428" strokeWidth="3" />

            {/* ── EYEBROWS ──────────────────────────────────────── */}
            {isWide ? (
              <>
                <path d="M 108 108 L 128 118" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
                <path d="M 172 108 L 152 118" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
              </>
            ) : isNervous ? (
              <>
                <path d="M 108 112 Q 118 106 128 110" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 152 110 Q 162 106 172 112" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <path d="M 108 114 Q 118 108 128 112" stroke="#1A1A1A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 152 112 Q 162 108 172 114" stroke="#1A1A1A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* ── EYES ──────────────────────────────────────────── */}
            {isBlink ? (
              <>
                <path d="M 112 130 Q 120 136 128 130" stroke="#1A1A1A" strokeWidth="4" fill="none" />
                <path d="M 152 130 Q 160 136 168 130" stroke="#1A1A1A" strokeWidth="4" fill="none" />
              </>
            ) : isWide ? (
              <>
                {/* Wide terrified eyes */}
                <circle cx="120" cy="128" r="13" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
                <circle cx="160" cy="128" r="13" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
                {/* Irises — dark brown */}
                <circle cx="120" cy="128" r="6" fill="#3D1A02" />
                <circle cx="160" cy="128" r="6" fill="#3D1A02" />
                {/* Pinpoint pupils */}
                <circle cx="120" cy="128" r="2.5" fill="#000000" />
                <circle cx="160" cy="128" r="2.5" fill="#000000" />
                {/* Catchlights */}
                <circle cx="117" cy="125" r="3" fill="#FFFFFF" />
                <circle cx="157" cy="125" r="3" fill="#FFFFFF" />
              </>
            ) : (
              <>
                {/* Normal expressive eyes */}
                <circle cx="120" cy="130" r="10" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
                <circle cx="160" cy="130" r="10" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
                <circle cx={120 + eyeShiftX} cy="130" r="5" fill="#3D1A02" />
                <circle cx={160 + eyeShiftX} cy="130" r="5" fill="#3D1A02" />
                {/* Catchlights */}
                <circle cx={118 + eyeShiftX} cy="128" r="2.5" fill="#FFFFFF" />
                <circle cx={158 + eyeShiftX} cy="128" r="2.5" fill="#FFFFFF" />
              </>
            )}

            {/* ── MOUTH ─────────────────────────────────────────── */}
            {pose === "shock" || pose === "fear" ? (
              <ellipse cx="140" cy="158" rx="11" ry="14" fill="#8B2635" stroke="#1A1A1A" strokeWidth="3" />
            ) : pose === "phone" || pose === "lookAround" ? (
              <path d="M 132 158 Q 140 155 148 158" stroke="#8B4513" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            ) : (
              <path d="M 134 158 Q 140 163 146 158" stroke="#8B4513" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            )}

            {/* Cheek flush */}
            <circle cx="106" cy="142" r="7" fill="#E07B54" opacity="0.4" />
            <circle cx="174" cy="142" r="7" fill="#E07B54" opacity="0.4" />

            {/* Sweat drop (fear/shock only) */}
            {(pose === "fear" || pose === "shock") && (
              <path
                d="M 200 100 C 200 100, 210 112, 210 118 C 210 123, 206 126, 201 126 C 196 126, 192 123, 192 118 C 192 112, 200 100, 200 100 Z"
                fill="#38BDF8"
                stroke="#0EA5E9"
                strokeWidth="1.5"
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};

