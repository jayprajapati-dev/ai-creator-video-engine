import React from "react";
import { Composition } from "remotion";
import { ChannelLogo, YouTubeBanner } from "./branding/ChannelBranding";
import { Thumbnail16x9 } from "./branding/Thumbnail16x9";
import { CtrlWalaPhase1 } from "./ctrl_wala/CtrlWalaPhase1";
import { ReelDeepSeekVsGpt4o } from "./ctrl_wala/compositions/ReelDeepSeekVsGpt4o";
import { ReelV0Builder } from "./ctrl_wala/compositions/ReelV0Builder";
import { ReelClaudePrompts } from "./ctrl_wala/compositions/ReelClaudePrompts";
import { TechRapReel, TOTAL_RAP_FRAMES } from "./ctrl_wala/experiments/TechRapReel";
// ─── NEW: CTRL_WALA Light Theme Reels (Techstackbro style) ───────────────────
import {
  ReelClaudeTutorial,
  CLAUDE_TUTORIAL_DURATION,
} from "./ctrl_wala/compositions/ReelClaudeTutorial";
import {
  ReelCodingTutorial,
  CODING_TUTORIAL_DURATION,
} from "./ctrl_wala/compositions/ReelCodingTutorial";
import {
  ReelBehindScenes,
  BEHIND_SCENES_DURATION,
} from "./ctrl_wala/compositions/ReelBehindScenes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ─── OFFICIAL CTRL_WALA CONTENT-AWARE DYNAMIC REELS ────────────────── */}

      {/* Reel 01: DeepSeek V3 vs GPT-4o — Benchmark & Split Comparison */}
      <Composition
        id="CtrlWala-DeepSeekVsGpt4o"
        component={ReelDeepSeekVsGpt4o}
        durationInFrames={1278}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 02: V0 Full-Stack Web App Builder — Before/After Transformation & Browser */}
      <Composition
        id="CtrlWala-V0Builder"
        component={ReelV0Builder}
        durationInFrames={913}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 03: 3 Claude 3.5 Sonnet Prompts — Mentor Walkthrough & Numbered Tip Cards */}
      <Composition
        id="CtrlWala-ClaudePrompts"
        component={ReelClaudePrompts}
        durationInFrames={1208}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ─── BRANDING ASSETS & PHASE 1 SHOWCASE ───────────────────────────── */}

      {/* Channel Profile Picture (Logo) — 800 x 800 (1:1 Circular Crop Safe) */}
      <Composition
        id="ChannelLogo"
        component={ChannelLogo}
        durationInFrames={1}
        fps={30}
        width={800}
        height={800}
      />

      {/* Official YouTube Channel Banner — 2560 x 1440 (Safe Area: 1546 x 423) */}
      <Composition
        id="YouTubeBanner"
        component={YouTubeBanner}
        durationInFrames={1}
        fps={30}
        width={2560}
        height={1440}
      />

      {/* High-CTR YouTube Video Thumbnail — 1920 x 1080 (16:9 Standard) */}
      <Composition
        id="Thumbnail16x9"
        component={Thumbnail16x9}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* CTRL_WALA Phase 1 — Motion Graphics Component Library */}
      <Composition
        id="CtrlWalaPhase1"
        component={CtrlWalaPhase1}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ─── NEW CTRL_WALA LIGHT THEME REELS (Techstackbro style) ──────────── */}

      {/* New Reel 01: Claude Tutorial — 3 Prompts Jo Coding Speed 10x Kar Denge */}
      <Composition
        id="CtrlWala-ClaudeTutorial"
        component={ReelClaudeTutorial}
        durationInFrames={CLAUDE_TUTORIAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* New Reel 02: Coding Tutorial — Python AI App in 15 Minutes */}
      <Composition
        id="CtrlWala-CodingTutorial"
        component={ReelCodingTutorial}
        durationInFrames={CODING_TUTORIAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* New Reel 03: Behind the Scenes — AI se Poora Channel Banta Hai */}
      <Composition
        id="CtrlWala-BehindScenes"
        component={ReelBehindScenes}
        durationInFrames={BEHIND_SCENES_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ─── SAVED EXPERIMENT: Tech Rap Demo ───────────────────────────────── */}
      <Composition
        id="CtrlWala-TechRap-Demo"
        component={TechRapReel}
        durationInFrames={TOTAL_RAP_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
