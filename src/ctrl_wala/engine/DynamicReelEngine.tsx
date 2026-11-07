/**
 * CTRL_WALA Content-Aware Dynamic Video Engine
 * Dynamically binds topic analysis, visual formats, narration audio,
 * mascot commentary, and sound design.
 */

import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, FONT_SIZE, RADIUS, SAFE_ZONE, SPACING } from "../designSystem";
import { ReelBlueprint } from "./types";
import { CtrlWalaAudioTrack } from "../components/CtrlWalaAudioTrack";
import { DynamicHinglishCaptions } from "../components/DynamicHinglishCaptions";
import { MascotBadge } from "../components/MascotBadge";
import { SplitComparison } from "../components/SplitComparison";
import { BenchmarkChart } from "../components/BenchmarkChart";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { NumberedTipCard } from "../components/NumberedTipCard";
import { TerminalView } from "../components/TerminalView";
import { BrowserMockup } from "../components/BrowserMockup";
import { AIChatSimulator } from "../components/AIChatSimulator";
import { CommentCtaBanner } from "../components/CommentCtaBanner";

interface DynamicReelEngineProps {
  blueprint: ReelBlueprint;
}

export const DynamicReelEngine: React.FC<DynamicReelEngineProps> = ({ blueprint }) => {
  const frame = useCurrentFrame();

  const accentColor =
    blueprint.primaryAccent === "cyan"
      ? COLORS.cyan.pure
      : blueprint.primaryAccent === "emerald"
      ? COLORS.emerald.pure
      : blueprint.primaryAccent === "amber"
      ? COLORS.amber.pure
      : COLORS.violet.pure;

  // Find currently active scene for captions
  const activeAudioScene = blueprint.audioManifest.scenes.find(
    (s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames
  ) ?? blueprint.audioManifest.scenes[0];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg.base,
        fontFamily: FONTS.body,
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background Cyber Grid / Ambient Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 30%, ${accentColor}15 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* Top Persistent Brand Header (Within Safe Zone) */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.topRestricted - 140,
          left: SAFE_ZONE.horizontalMargin,
          right: SAFE_ZONE.horizontalMargin,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Mascot Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(14, 22, 38, 0.85)",
            backdropFilter: "blur(12px)",
            border: `1.5px solid ${accentColor}`,
            borderRadius: RADIUS.full,
            padding: "6px 16px 6px 8px",
            boxShadow: `0 0 20px rgba(0,0,0,0.5)`,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1.5px solid #fff",
            }}
          >
            <Img
              src={staticFile("ctrl_wala/logo.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 16,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              CTRL_WALA
            </div>
            <div
              style={{
                fontSize: 10,
                color: accentColor,
                fontWeight: 800,
                letterSpacing: "0.1em",
              }}
            >
              AI & TECH DROPS
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${COLORS.bg.surfaceBorder}`,
            borderRadius: RADIUS.full,
            padding: "6px 14px",
            fontSize: 12,
            fontFamily: FONTS.code,
            fontWeight: 700,
            color: COLORS.text.secondary,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {blueprint.category}
        </div>
      </div>

      {/* Dynamic Scenes Orchestration */}
      {blueprint.scenes.map((scene, idx) => {
        const audioScene = blueprint.audioManifest.scenes[idx];
        if (!audioScene) return null;

        return (
          <Sequence
            key={scene.id}
            from={audioScene.startFrame}
            durationInFrames={audioScene.durationFrames}
          >
            <AbsoluteFill
              style={{
                padding: `${SAFE_ZONE.contentTop + 40}px ${SAFE_ZONE.horizontalMargin}px`,
                paddingBottom: SAFE_ZONE.bottomRestricted + 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: SPACING[5],
              }}
            >
              {/* Scene Section Tag */}
              <div
                style={{
                  alignSelf: "flex-start",
                  background: COLORS.bg.surfaceHigh,
                  border: `1px solid ${accentColor}`,
                  borderRadius: RADIUS.full,
                  padding: `4px 14px`,
                  fontSize: 13,
                  color: accentColor,
                  fontFamily: FONTS.code,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  boxShadow: `0 0 12px ${accentColor}33`,
                }}
              >
                {scene.label}
              </div>

              {/* Scene Headline */}
              <div
                style={{
                  fontSize: FONT_SIZE["2xl"],
                  fontWeight: 900,
                  fontFamily: FONTS.display,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                {scene.headline}
              </div>

              {/* Dynamic Content Component Mapping */}
              {scene.format === "hook-impact" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginTop: 10 }}>
                  <MascotBadge
                    size={240}
                    speechText={scene.subheadline}
                    accent={blueprint.primaryAccent}
                  />
                </div>
              )}

              {scene.format === "split-comparison" && scene.customData && (
                <SplitComparison
                  left={scene.customData.left}
                  right={scene.customData.right}
                  metricLabel={scene.customData.metricLabel}
                  savingBadge={scene.customData.savingBadge}
                />
              )}

              {scene.format === "benchmark-data" && scene.customData && (
                <BenchmarkChart benchmarks={scene.customData.benchmarks} />
              )}

              {scene.format === "before-after-transform" && scene.customData && (
                <BeforeAfterSlider
                  promptText={scene.customData.promptText}
                  beforeTitle={scene.customData.beforeTitle}
                  afterTitle={scene.customData.afterTitle}
                />
              )}

              {scene.format === "browser-walkthrough" && scene.customData && (
                <BrowserMockup url={scene.customData.url} startFrame={0}>
                  <div style={{ padding: 24, color: "#1E293B", fontFamily: FONTS.body }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                      {scene.customData.pageTitle}
                    </div>
                    <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>
                      {scene.customData.pageDesc}
                    </div>
                    <div
                      style={{
                        background: "#0F172A",
                        color: "#38BDF8",
                        fontFamily: FONTS.code,
                        fontSize: 12,
                        padding: 14,
                        borderRadius: 8,
                      }}
                    >
                      {scene.customData.snippet}
                    </div>
                  </div>
                </BrowserMockup>
              )}

              {scene.format === "code-terminal-demo" && scene.customData && (
                <TerminalView
                  lines={scene.customData.lines}
                  startFrame={0}
                  title={scene.customData.title}
                />
              )}

              {scene.format === "ai-chat-demo" && scene.customData && (
                <AIChatSimulator
                  messages={scene.customData.messages}
                  startFrame={0}
                  modelName={scene.customData.modelName}
                />
              )}

              {scene.format === "numbered-tip" && scene.customData && (
                <NumberedTipCard
                  number={scene.customData.number}
                  title={scene.customData.title}
                  tagline={scene.customData.tagline}
                  codeSnippet={scene.customData.codeSnippet}
                  takeaway={scene.customData.takeaway}
                  accent={blueprint.primaryAccent}
                />
              )}

              {scene.format === "mascot-verdict" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <MascotBadge
                    size={200}
                    speechText={scene.subheadline ?? "Open weights means full freedom!"}
                    accent={blueprint.primaryAccent}
                  />
                  {scene.customData?.extraPill && (
                    <div
                      style={{
                        background: COLORS.bg.surfaceHigh,
                        border: `1px solid ${accentColor}`,
                        borderRadius: RADIUS.lg,
                        padding: `${SPACING[3]}px ${SPACING[4]}px`,
                        fontFamily: FONTS.code,
                        fontSize: 13,
                        color: COLORS.emerald.pure,
                      }}
                    >
                      {scene.customData.extraPill}
                    </div>
                  )}
                </div>
              )}

              {scene.format === "comment-cta" && scene.customData && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <CommentCtaBanner
                    keyword={scene.customData.keyword}
                    instruction={scene.customData.instruction}
                    accent={blueprint.primaryAccent}
                    startFrame={10}
                  />
                  <div
                    style={{
                      textAlign: "center",
                      color: COLORS.text.secondary,
                      fontSize: 14,
                      fontFamily: FONTS.code,
                    }}
                  >
                    Follow @CTRL_WALA for daily AI drops 🔥
                  </div>
                </div>
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Dynamic Subtitle Captions Synced to Spoken Audio */}
      {activeAudioScene && (
        <DynamicHinglishCaptions
          text={activeAudioScene.text}
          accent={blueprint.primaryAccent}
        />
      )}

      {/* Audio Engine Track (Narration + SFX + BGM) */}
      <CtrlWalaAudioTrack manifest={blueprint.audioManifest} />
    </AbsoluteFill>
  );
};

