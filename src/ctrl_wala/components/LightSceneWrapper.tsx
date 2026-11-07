/**
 * CTRL_WALA — LightSceneWrapper (Version 3.0 - Clean Content-First Layout)
 *
 * Designed for real Instagram Reels:
 *  - Dotted canvas background texture (DotBackground)
 *  - NO redundant brand header (Instagram provides native profile & top UI)
 *  - Clean, centered step indicator badge at top (top: 100px)
 *  - Maximum vertical space for software interfaces and demonstrations (top: 190px to bottom: 440px)
 *  - Dynamic scene-reactive mascot anchored at bottom with context gestures
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import { DotBackground } from "./DotBackground";
import { StepIndicatorPill } from "./StepIndicatorPill";
import { TopEpisodeBadge } from "./TopEpisodeBadge";
import { MascotCharacter, MascotExpression, MascotPose, SpeechBubbleWord } from "./MascotCharacter";
import { LIGHT } from "../designSystem/lightTheme";

interface LightSceneWrapperProps {
  episode?: number | string;
  step?: number;
  stepLabel?: string;
  stepIcon?: React.ReactNode;
  stepEmoji?: string;
  stepDelay?: number;
  children: React.ReactNode;
  showMascot?: boolean;
  mascotExpression?: MascotExpression;
  mascotPose?: MascotPose;
  mascotSpeech?: SpeechBubbleWord[];
  isSpeaking?: boolean;
  mascotDelay?: number;
}

export const LightSceneWrapper: React.FC<LightSceneWrapperProps> = ({
  episode = "15",
  step,
  stepLabel,
  stepIcon,
  stepEmoji,
  stepDelay = 0,
  children,
  showMascot = true,
  mascotExpression = "happy",
  mascotPose = "talking",
  mascotSpeech,
  isSpeaking = true,
  mascotDelay = 20,
}) => {
  const hasHeader = step !== undefined || episode !== undefined;

  return (
    <AbsoluteFill style={{ background: LIGHT.bg.base, overflow: "hidden" }}>
      {/* ── Dotted Background Canvas ── */}
      <DotBackground dotColor="#C4C4C8" dotSize={2} dotGap={28} />

      {/* ── Top Header Safe Area: Top Episode Badge & Step Indicator Pill ── */}
      {hasHeader && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            zIndex: 35,
          }}
        >
          {episode !== undefined && <TopEpisodeBadge episode={episode} delay={stepDelay} />}
          {step !== undefined && stepLabel && (
            <StepIndicatorPill
              step={step}
              label={stepLabel}
              icon={stepIcon}
              emoji={stepEmoji}
              delay={stepDelay + 4}
            />
          )}
        </div>
      )}

      {/* ── Main Content Demonstration Zone (Expands if mascot is hidden) ── */}
      <div
        style={{
          position: "absolute",
          top: hasHeader ? (step !== undefined ? 280 : 200) : 120,
          left: 48,
          right: 48,
          bottom: showMascot ? 420 : 130,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
          zIndex: 20,
        }}
      >
        {children}
      </div>

      {/* ── Presenter Mascot (Only displayed where contextually required) ── */}
      {showMascot && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 48,
            right: 48,
            zIndex: 30,
          }}
        >
          <MascotCharacter
            expression={mascotExpression}
            pose={mascotPose}
            speechWords={mascotSpeech}
            isSpeaking={isSpeaking}
            delay={mascotDelay}
            width={310}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
