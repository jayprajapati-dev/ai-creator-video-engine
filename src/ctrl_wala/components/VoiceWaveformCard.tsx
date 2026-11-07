/**
 * CTRL_WALA — VoiceWaveformCard Component (Version 3.0 - Vector Icons)
 *
 * Recreates the exact voice production breakdown from the creator reference:
 *  - OpenAI voice model card with animated waveform and scrubbing playhead
 *  - "epXX ke 5 takes 🎧" purple callout
 *  - 5 large take cards with pink (rejected ❌) and mint green (selected ✔) states
 *  - "gpt-4o-transcribe ✔" purple badge
 *  - Transcription mistake callout: 't3: "Transformer" → "dance-former" ✕'
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";
import { HeadphonesIcon, CheckIcon, XIcon } from "./Icons";
import { StudioHeadphonesIcon } from "./PremiumIcons";

export type TakeState = "pending" | "selected" | "rejected" | "default";

export interface VoiceTake {
  id: string;
  state: TakeState;
}

interface VoiceWaveformCardProps {
  modelProvider?: string;
  modelName?: string;
  voiceName?: string;
  filename?: string;
  takes?: VoiceTake[];
  transcriptionNote?: string;
  delay?: number;
}

// ── Waveform bars (dense purple + playhead line) ────────────────────────────
const Waveform: React.FC<{ barCount?: number }> = ({ barCount = 74 }) => {
  const frame = useCurrentFrame();

  const progress = (frame % 120) / 120;
  const playheadIndex = Math.floor(progress * barCount);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 75,
        padding: "0 10px",
        position: "relative",
      }}
    >
      {Array.from({ length: barCount }, (_, i) => {
        const phase1 = Math.sin((frame * 0.2 + i * 0.35) * Math.PI) * 0.5 + 0.5;
        const phase2 = Math.sin((frame * 0.12 + i * 0.6) * Math.PI) * 0.3 + 0.3;
        const phase3 = Math.sin((i * 0.25) * Math.PI) * 0.2 + 0.2;
        const combined = (phase1 + phase2 + phase3) / 1.3;
        const h = Math.max(6, combined * 65);

        const isPastPlayhead = i <= playheadIndex;

        return (
          <div
            key={i}
            style={{
              width: 3.5,
              height: h,
              backgroundColor: isPastPlayhead ? "#8B5CF6" : "#C4B5FD",
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
        );
      })}

      {/* Moving playhead vertical cursor line */}
      <div
        style={{
          position: "absolute",
          left: `${progress * 100}%`,
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: "#EC4899",
          borderRadius: 2,
          boxShadow: "0 0 6px rgba(236, 72, 153, 0.8)",
        }}
      />
    </div>
  );
};

// ── Single Take Card (approx 104x104 with retro border & vector icons) ──────
const TakeCard: React.FC<{ take: VoiceTake; delay?: number }> = ({ take, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({ frame: f, fps, config: { stiffness: 300, damping: 22 } });
  const translateY = interpolate(entrance, [0, 1], [30, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const isSelected = take.state === "selected";

  return (
    <div
      style={{
        backgroundColor: isSelected ? "#4ADE80" : "#FFD3DC",
        border: "3.5px solid #18181B",
        borderRadius: 20,
        width: 104,
        height: 104,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        transform: `translateY(${translateY}px)`,
        opacity,
        boxShadow: "0 5px 0px #18181B",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <HeadphonesIcon size={28} color="#18181B" strokeWidth={2.5} />
      <div
        style={{
          fontFamily: LIGHT_FONTS.body,
          fontSize: 22,
          fontWeight: LIGHT_FONT_WEIGHT.black,
          color: "#18181B",
        }}
      >
        {take.id}
      </div>

      {/* Corner badge (CheckIcon or XIcon) */}
      <div
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: isSelected ? "#22C55E" : "#EF4444",
          border: "2.5px solid #18181B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {isSelected ? (
          <CheckIcon size={16} color="#FFFFFF" strokeWidth={3.5} />
        ) : (
          <XIcon size={16} color="#FFFFFF" strokeWidth={3.5} />
        )}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export const VoiceWaveformCard: React.FC<VoiceWaveformCardProps> = ({
  modelProvider = "OpenAI voice model",
  modelName = "gpt-audio-1.5",
  voiceName = "cedar",
  filename = "ep11 ki asli awaaz (vo.wav)",
  takes = [],
  transcriptionNote = 't3: "Transformer" → "dance-former" ✕',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({ frame: f, fps, config: { stiffness: 220, damping: 22 } });
  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transform: `translateY(${translateY}px)`,
        opacity,
        width: "100%",
      }}
    >
      {/* ── Waveform Card ── */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "3.5px solid #18181B",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 8px 0px #18181B",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "2px solid #F0F0F0",
          }}
        >
          <span
            style={{
              fontFamily: LIGHT_FONTS.body,
              fontSize: 26,
              fontWeight: LIGHT_FONT_WEIGHT.black,
              color: "#18181B",
            }}
          >
            {modelProvider}
          </span>
          <span
            style={{
              fontFamily: LIGHT_FONTS.code,
              fontSize: 18,
              fontWeight: LIGHT_FONT_WEIGHT.bold,
              color: "#525252",
            }}
          >
            {modelName} • {voiceName}
          </span>
        </div>

        {/* Waveform area */}
        <div style={{ backgroundColor: "#FAF5FF", padding: "14px 18px" }}>
          <Waveform barCount={74} />
        </div>

        {/* Filename bottom right */}
        <div
          style={{
            textAlign: "right",
            padding: "8px 24px 12px",
            fontFamily: LIGHT_FONTS.code,
            fontSize: 15,
            fontWeight: LIGHT_FONT_WEIGHT.semibold,
            color: "#737373",
          }}
        >
          {filename}
        </div>
      </div>

      {/* ── Takes callout + row ── */}
      {takes.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontFamily: LIGHT_FONTS.body,
              fontSize: 22,
              fontWeight: LIGHT_FONT_WEIGHT.extrabold,
              color: "#7C3AED",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>ep11 ke 5 takes</span>
            <StudioHeadphonesIcon size={22} color="#7C3AED" />
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {takes.map((take, i) => (
              <TakeCard key={take.id} take={take} delay={delay + 10 + i * 6} />
            ))}
          </div>
        </div>
      )}

      {/* ── gpt-4o-transcribe badge with CheckIcon ── */}
      <div
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#7C3AED",
          border: "3.5px solid #18181B",
          borderRadius: 100,
          paddingLeft: 22,
          paddingRight: 24,
          paddingTop: 8,
          paddingBottom: 8,
          boxShadow: "0 4px 0px #18181B",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: LIGHT_FONTS.code,
            fontSize: 20,
            fontWeight: LIGHT_FONT_WEIGHT.black,
            color: "#FFFFFF",
          }}
        >
          gpt-4o-transcribe
        </span>
        <CheckIcon size={18} color="#FFFFFF" strokeWidth={3.5} />
      </div>

      {/* ── Transcription correction card ── */}
      {transcriptionNote && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "3px solid #18181B",
            borderRadius: 14,
            padding: "12px 20px",
            fontFamily: LIGHT_FONTS.code,
            fontSize: 18,
            fontWeight: LIGHT_FONT_WEIGHT.bold,
            color: "#18181B",
            boxShadow: "0 4px 0px #18181B",
            alignSelf: "flex-start",
          }}
        >
          {transcriptionNote}
        </div>
      )}
    </div>
  );
};
