/**
 * CTRL_WALA Reel — Coding Tutorial (Version 3.0 - Scene-Reactive & Clean Top)
 *
 * Topic: "Python mein AI App Banao — 15 Minutes mein"
 * Style: Techstackbro-inspired light theme, code-focused, high production value
 */

import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LightSceneWrapper } from "../components/LightSceneWrapper";
import { TopEpisodeBadge } from "../components/TopEpisodeBadge";
import { MascotCharacter } from "../components/MascotCharacter";
import { VSCodeEditor } from "../components/VSCodeEditor";
import { DotBackground } from "../components/DotBackground";
import { CtrlWalaAudioTrack } from "../components/CtrlWalaAudioTrack";
import {
  PythonBrandIcon,
  TerminalSleekIcon,
  LightningBoltIcon,
  CheckBadgeSolidIcon,
  CrossBadgeSolidIcon,
} from "../components/PremiumIcons";
import { ReelAudioManifest } from "../engine/types";
import { LIGHT } from "../designSystem/lightTheme";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";
import codingTutorialManifest from "../../../public/audio/ctrl_wala/coding_tutorial/manifest.json";

const m = codingTutorialManifest.scenes;
const S = {
  hook:    { from: m[0].startFrame, dur: m[0].durationFrames },
  code:    { from: m[1].startFrame, dur: m[1].durationFrames },
  run:     { from: m[2].startFrame, dur: m[2].durationFrames },
  result:  { from: m[3].startFrame, dur: m[3].durationFrames },
  cta:     { from: m[4].startFrame, dur: m[4].durationFrames },
} as const;

// ── Hook Scene ────────────────────────────────────────────────────────────────
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ent = spring({ frame, fps, config: { stiffness: 220, damping: 20 } });
  const ty = interpolate(ent, [0, 1], [30, 0]);
  const op = interpolate(ent, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: LIGHT.bg.base, overflow: "hidden" }}>
      <DotBackground dotColor="#C4C4C8" dotSize={2} dotGap={28} />

      {/* Signature Top Episode Emblem */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 35,
        }}
      >
        <TopEpisodeBadge episode="09" delay={4} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 250,
          left: 48,
          right: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          transform: `translateY(${ty}px)`,
          opacity: op,
        }}
      >
        <div
          style={{
            backgroundColor: "#FF8E60",
            border: "3.5px solid #18181B",
            borderRadius: 20,
            paddingLeft: 22,
            paddingRight: 26,
            paddingTop: 8,
            paddingBottom: 8,
            boxShadow: "0 5px 0px #18181B",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <PythonBrandIcon size={24} />
          <span
            style={{
              fontFamily: LIGHT_FONTS.body,
              fontSize: 22,
              fontWeight: LIGHT_FONT_WEIGHT.black,
              color: "#18181B",
            }}
          >
            Python + Streamlit
          </span>
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: LIGHT_FONTS.display,
            fontSize: 60,
            fontWeight: LIGHT_FONT_WEIGHT.black,
            color: "#18181B",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          AI App Banao{" "}
          <span
            style={{
              backgroundColor: "#FF8E60",
              color: "#18181B",
              border: "3.5px solid #18181B",
              borderRadius: 16,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 4,
              paddingBottom: 6,
              boxShadow: "0 5px 0px #18181B",
              display: "inline-block",
            }}
          >
            15 Min
          </span>
          <br />
          <span
            style={{
              backgroundColor: "#7C3AED",
              color: "#FFFFFF",
              borderRadius: 14,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 4,
              paddingBottom: 6,
              display: "inline-block",
            }}
          >
            Zero Experience
          </span>{" "}
          Needed
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 140, left: 48, right: 48 }}>
        <MascotCharacter
          expression="excited"
          pose="talking"
          speechWords={[
            { text: "Main" },
            { text: "khud", highlight: true },
            { text: "banaya" },
            { text: "tha!" },
          ]}
          delay={15}
          width={340}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Code Scene ────────────────────────────────────────────────────────────────
const CodeScene: React.FC = () => {
  const FILES = [
    {
      name: "ai_app.py",
      language: "python",
      activeLine: 7,
      lines: [
        "import openai",
        "import streamlit as st",
        "",
        "client = openai.OpenAI()",
        "",
        "st.title('🤖 Mera AI Assistant')",
        "prompt = st.text_input('Kuch pucho...')",
        "",
        "if prompt:",
        "    response = client.chat.completions.create(",
        '        model="gpt-4o",',
        "        messages=[{'role': 'user', 'content': prompt}]",
        "    )",
        "    st.write(response.choices[0].message.content)",
      ],
    },
    {
      name: "requirements.txt",
      language: "text",
      lines: ["openai>=1.52.0", "streamlit>=1.39.0"],
    },
  ];

  return (
    <LightSceneWrapper
      episode="09"
      step={1}
      stepLabel="code likhna"
      stepIcon={<TerminalSleekIcon size={24} color="#18181B" />}
      showMascot={false}
    >
      <VSCodeEditor
        files={FILES}
        activeFileIndex={0}
        startFrame={10}
        framesPerLine={14}
        showTerminal={false}
        showExplorer={true}
      />
    </LightSceneWrapper>
  );
};

// ── Run Scene ─────────────────────────────────────────────────────────────────
const RunScene: React.FC = () => {
  const FILES_RUN = [
    {
      name: "terminal",
      language: "bash",
      lines: [
        "pip install openai streamlit",
        "export OPENAI_API_KEY='sk-...'",
        "streamlit run ai_app.py",
      ],
    },
  ];

  const TERMINAL = [
    { command: "pip install openai streamlit", output: "Installed openai-1.52.0 streamlit-1.39.0", type: "success" as const },
    { command: "streamlit run ai_app.py", output: "Local URL: http://localhost:8501", type: "success" as const },
    { command: "# App live running!", output: "Network URL: http://192.168.1.5:8501", type: "info" as const },
  ];

  return (
    <LightSceneWrapper
      episode="09"
      step={2}
      stepLabel="run karo"
      stepIcon={<LightningBoltIcon size={24} color="#18181B" />}
      showMascot={false}
    >
      <VSCodeEditor
        files={FILES_RUN}
        activeFileIndex={0}
        terminalCommands={TERMINAL}
        startFrame={10}
        framesPerLine={20}
        showTerminal={true}
        showExplorer={false}
      />
    </LightSceneWrapper>
  );
};

// ── Result Scene ──────────────────────────────────────────────────────────────
const ResultScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = [
    { icon: <CrossBadgeSolidIcon size={34} />, label: "Pehle", text: "2 ghante, 300 lines, bugs bhare" },
    { icon: <CheckBadgeSolidIcon size={34} />, label: "Abh", text: "15 min, 15 lines, production ready!" },
  ];

  return (
    <LightSceneWrapper
      episode="09"
      step={3}
      stepLabel="result compare"
      stepIcon={<CheckBadgeSolidIcon size={24} />}
      mascotExpression="happy"
      mascotPose="explaining"
      mascotSpeech={[
        { text: "AI" },
        { text: "se" },
        { text: "time", highlight: true },
        { text: "bachao!" },
      ]}
      mascotDelay={30}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {cards.map((card, i) => {
          const isGood = i === 1;
          const f = Math.max(0, frame - i * 30);
          const ent = spring({ frame: f, fps, config: { stiffness: 280, damping: 22 } });
          const ty = interpolate(ent, [0, 1], [30, 0]);
          const op = interpolate(ent, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                border: "3.5px solid #18181B",
                borderRadius: 20,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `translateY(${ty}px)`,
                opacity: op,
                boxShadow: "0 6px 0px #18181B",
              }}
            >
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: LIGHT_FONTS.body,
                    fontSize: 26,
                    fontWeight: LIGHT_FONT_WEIGHT.black,
                    color: isGood ? "#16A34A" : "#DC2626",
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontFamily: LIGHT_FONTS.body,
                    fontSize: 22,
                    fontWeight: LIGHT_FONT_WEIGHT.bold,
                    color: "#18181B",
                    marginTop: 4,
                  }}
                >
                  {card.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LightSceneWrapper>
  );
};

// ── CTA Scene ─────────────────────────────────────────────────────────────────
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ent = spring({ frame, fps, config: { stiffness: 240, damping: 20 } });
  const scale = interpolate(ent, [0, 1], [0.92, 1]);
  const op = interpolate(ent, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: LIGHT.bg.base, overflow: "hidden" }}>
      <DotBackground dotColor="#C4C4C8" dotSize={2} dotGap={28} />

      {/* Signature Top Episode Emblem */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 35,
        }}
      >
        <TopEpisodeBadge episode="09" delay={4} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 250,
          left: 48,
          right: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          transform: `scale(${scale})`,
          opacity: op,
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontFamily: LIGHT_FONTS.display,
            fontSize: 56,
            fontWeight: LIGHT_FONT_WEIGHT.black,
            color: "#18181B",
            lineHeight: 1.2,
          }}
        >
          Comment{" "}
          <span
            style={{
              backgroundColor: "#7C3AED",
              color: "#FFFFFF",
              borderRadius: 16,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 4,
              paddingBottom: 6,
              display: "inline-block",
            }}
          >
            CODE
          </span>
          <br />
          Full source code{" "}
          <span
            style={{
              backgroundColor: "#FF8E60",
              color: "#18181B",
              border: "3.5px solid #18181B",
              borderRadius: 16,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 4,
              paddingBottom: 6,
              boxShadow: "0 5px 0px #18181B",
              display: "inline-block",
            }}
          >
            DM kar denge!
          </span>{" "}
          🐍
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 140, left: 48, right: 48 }}>
        <MascotCharacter
          expression="excited"
          pose="celebrating"
          speechWords={[
            { text: "Follow" },
            { text: "@CTRL_WALA", highlight: true },
            { text: "for" },
            { text: "more!" },
          ]}
          delay={20}
          width={340}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ──────────────────────────────────────────────────────────
export const ReelCodingTutorial: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* High-Production Audio Engine: Sync Voiceover + Tech Beat Loop + Dynamic SFX */}
      <CtrlWalaAudioTrack manifest={codingTutorialManifest as unknown as ReelAudioManifest} />

      {/* Visual Scenes Synced to Speech Boundaries */}
      <Sequence from={S.hook.from} durationInFrames={S.hook.dur}><HookScene /></Sequence>
      <Sequence from={S.code.from} durationInFrames={S.code.dur}><CodeScene /></Sequence>
      <Sequence from={S.run.from} durationInFrames={S.run.dur}><RunScene /></Sequence>
      <Sequence from={S.result.from} durationInFrames={S.result.dur}><ResultScene /></Sequence>
      <Sequence from={S.cta.from} durationInFrames={S.cta.dur}><CTAScene /></Sequence>
    </AbsoluteFill>
  );
};

export const CODING_TUTORIAL_DURATION = codingTutorialManifest.totalDurationFrames;
