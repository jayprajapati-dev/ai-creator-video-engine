/**
 * CTRL_WALA — WordHighlightCaption Component
 *
 * Bottom-safe caption bar in Techstackbro style:
 *  - White rounded pill background
 *  - Bold black text
 *  - Current word highlighted with purple background
 *  - Smooth word transitions
 *
 * Uses word-level timing from the audio manifest for accurate sync.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../designSystem/lightTheme";
import { LIGHT_FONTS, LIGHT_FONT_SIZE, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";

export interface TimedWord {
  word: string;
  startMs: number;
  endMs: number;
}

interface WordHighlightCaptionProps {
  words: TimedWord[];
  startFrame?: number;
  fps?: number;
}

export const WordHighlightCaption: React.FC<WordHighlightCaptionProps> = ({
  words,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsedMs = ((frame - startFrame) / fps) * 1000;

  // Find current word index
  let activeIdx = -1;
  for (let i = words.length - 1; i >= 0; i--) {
    if (elapsedMs >= words[i].startMs) {
      activeIdx = i;
      break;
    }
  }

  // Show a window of words: 2 before active + active + rest of line
  const windowStart = Math.max(0, activeIdx - 3);
  const windowEnd = Math.min(words.length - 1, windowStart + 7);
  const windowWords = words.slice(windowStart, windowEnd + 1);

  if (words.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 180,
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: LIGHT.bg.card,
          border: `2.5px solid ${LIGHT.border.card}`,
          borderRadius: 20,
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 24,
          paddingRight: 24,
          boxShadow: LIGHT.shadow.cardStrong,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 900,
        }}
      >
        {windowWords.map((word, i) => {
          const globalIdx = windowStart + i;
          const isActive = globalIdx === activeIdx;
          const isPast = globalIdx < activeIdx;

          return (
            <span
              key={globalIdx}
              style={{
                fontFamily: LIGHT_FONTS.body,
                fontSize: LIGHT_FONT_SIZE.caption,
                fontWeight: isActive ? LIGHT_FONT_WEIGHT.black : LIGHT_FONT_WEIGHT.bold,
                color: isActive
                  ? LIGHT.purple.textOnDark
                  : isPast
                  ? LIGHT.text.muted
                  : LIGHT.text.primary,
                backgroundColor: isActive ? LIGHT.purple.pure : "transparent",
                borderRadius: isActive ? 8 : 0,
                paddingLeft: isActive ? 10 : 0,
                paddingRight: isActive ? 10 : 0,
                paddingTop: isActive ? 3 : 0,
                paddingBottom: isActive ? 3 : 0,
                lineHeight: 1.3,
                transition: "none",
              }}
            >
              {word.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/**
 * SimpleWordCaption — for when you don't have word-level timestamps.
 * Splits text into words and distributes them evenly across totalFrames.
 */
export const SimpleWordCaption: React.FC<{
  text: string;
  totalFrames: number;
  startFrame?: number;
}> = ({ text, totalFrames, startFrame = 0 }) => {
  const words = text.split(/\s+/).filter(Boolean);
  const framesPerWord = totalFrames / words.length;

  const timedWords: TimedWord[] = words.map((word, i) => ({
    word,
    startMs: (startFrame / 30) * 1000 + i * (framesPerWord / 30) * 1000,
    endMs: (startFrame / 30) * 1000 + (i + 1) * (framesPerWord / 30) * 1000,
  }));

  return <WordHighlightCaption words={timedWords} startFrame={startFrame} />;
};
