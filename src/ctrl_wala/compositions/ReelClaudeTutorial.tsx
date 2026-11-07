/**
 * CTRL_WALA Reel — Claude Tutorial (Version 3.0 - Scene-Reactive & Clean Top)
 *
 * Topic: "3 Claude Prompts Jo Aapki Coding Speed 10x Kar Denge"
 * Layout & Presentation: Clean top safe zone, scene-reactive poses & gestures
 */

import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LightSceneWrapper } from "../components/LightSceneWrapper";
import { TopEpisodeBadge } from "../components/TopEpisodeBadge";
import { MascotCharacter } from "../components/MascotCharacter";
import { ClaudeInterface } from "../components/ClaudeInterface";
import { VSCodeEditor } from "../components/VSCodeEditor";
import { DotBackground } from "../components/DotBackground";
import { CtrlWalaAudioTrack } from "../components/CtrlWalaAudioTrack";
import {
  ClaudeSparkleIcon,
  TerminalSleekIcon,
  LightningBoltIcon,
  CheckBadgeSolidIcon,
  ScriptDocumentIcon,
} from "../components/PremiumIcons";
import { ReelAudioManifest } from "../engine/types";
import { LIGHT } from "../designSystem/lightTheme";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";
import claudePromptsManifest from "../../../public/audio/ctrl_wala/claude_prompts/manifest.json";

const m = claudePromptsManifest.scenes;
const S = {
  hook:     { from: m[0].startFrame, dur: m[0].durationFrames },
  claude:   { from: m[1].startFrame, dur: m[1].durationFrames },
  vscode:   { from: m[2].startFrame, dur: m[2].durationFrames },
  verdict:  { from: m[3].startFrame, dur: m[3].durationFrames },
  cta:      { from: m[4].startFrame, dur: m[4].durationFrames },
} as const;

// ── Hook Scene ────────────────────────────────────────────────────────────────
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { stiffness: 220, damping: 20 } });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);
  const titleOp = interpolate(titleSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

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
        <TopEpisodeBadge episode="12" delay={4} />
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
          transform: `translateY(${titleY}px)`,
          opacity: titleOp,
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
          <ClaudeSparkleIcon size={24} color="#18181B" />
          <span
            style={{
              fontFamily: LIGHT_FONTS.body,
              fontSize: 22,
              fontWeight: LIGHT_FONT_WEIGHT.black,
              color: "#18181B",
            }}
          >
            Claude 3.5 Sonnet
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
          3 Claude Prompts{" "}
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
            Jo Aapki
          </span>
          <br />
          Coding Speed{" "}
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
            10x
          </span>{" "}
          Kar Denge
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 140, left: 48, right: 48 }}>
        <MascotCharacter
          expression="excited"
          pose="talking"
          speechWords={[
            { text: "Yeh" },
            { text: "prompts" },
            { text: "real", highlight: true },
            { text: "mein" },
            { text: "kaam" },
            { text: "karte" },
            { text: "hain!" },
          ]}
          delay={15}
          width={340}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Claude Scene ──────────────────────────────────────────────────────────────
const ClaudeScene: React.FC = () => {
  const CLAUDE_MESSAGES = [
    {
      role: "user" as const,
      content: "Write a function to summarize a PDF using Claude API",
    },
    {
      role: "assistant" as const,
      content: `Here's a production-ready Python helper:

def summarize_pdf(path: str) -> str:
    text = extract_text(path)
    response = claude.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user",
                   "content": f"Summarize:\\n{text}"}]
    )
    return response.content[0].text`,
      isCode: true,
      language: "python",
    },
  ];

  return (
    <LightSceneWrapper
      episode="12"
      step={1}
      stepLabel="prompt engineering"
      stepIcon={<ScriptDocumentIcon size={24} color="#18181B" />}
      showMascot={false}
    >
      <ClaudeInterface
        messages={CLAUDE_MESSAGES}
        startFrame={15}
        framesPerMessage={120}
        projectName="PDF Summarizer"
      />
    </LightSceneWrapper>
  );
};

// ── VS Code Scene ─────────────────────────────────────────────────────
const VSCodeScene: React.FC = () => {
  const FILES = [
    {
      name: "summarize_pdf.py",
      language: "python",
      activeLine: 6,
      lines: [
        "import anthropic",
        "from pypdf import PdfReader",
        "",
        "client = anthropic.Anthropic()",
        "",
        "def summarize_pdf(path: str) -> str:",
        "    reader = PdfReader(path)",
        '    text = "\\n".join(page.extract_text() for page in reader.pages)',
        "    response = client.messages.create(",
        '        model="claude-3-5-sonnet-20241022",',
        "        max_tokens=1024,",
        '        messages=[{"role": "user", "content": f"Summarize:\\n{text}"}]',
        "    )",
        "    return response.content[0].text",
      ],
    },
  ];

  const TERMINAL_CMDS = [
    { command: "pip install anthropic pypdf", output: "Successfully installed anthropic-0.34.0", type: "success" as const },
    { command: "python summarize_pdf.py report.pdf", output: "Summary: 95% compression in 2.1s", type: "success" as const },
  ];

  return (
    <LightSceneWrapper
      episode="12"
      step={2}
      stepLabel="result check"
      stepIcon={<TerminalSleekIcon size={24} color="#18181B" />}
      showMascot={false}
    >
      <VSCodeEditor
        files={FILES}
        activeFileIndex={0}
        terminalCommands={TERMINAL_CMDS}
        startFrame={10}
        framesPerLine={12}
        showTerminal={true}
        showExplorer={true}
      />
    </LightSceneWrapper>
  );
};

// ── Verdict Scene ─────────────────────────────────────────────────────────────
const VerdictScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = [
    { icon: <ClaudeSparkleIcon size={32} color="#7C3AED" />, label: "Prompt 1: Role + Constraints", text: "Senior Architect persona set karo" },
    { icon: <LightningBoltIcon size={32} color="#FF8E60" />, label: "Prompt 2: Self-Correction", text: "Code run karke bugs automatically fix karo" },
    { icon: <CheckBadgeSolidIcon size={32} />, label: "Prompt 3: Edge Case Generator", text: "Unit tests bina hath lagaye ready" },
  ];

  return (
    <LightSceneWrapper
      episode="12"
      step={3}
      stepLabel="top 3 takeaways"
      stepIcon={<CheckBadgeSolidIcon size={24} />}
      mascotExpression="excited"
      mascotPose="explaining"
      mascotSpeech={[
        { text: "In" },
        { text: "3" },
        { text: "prompts", highlight: true },
        { text: "se" },
        { text: "workflow" },
        { text: "badlega!" },
      ]}
      mascotDelay={30}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {cards.map((card, i) => {
          const f = Math.max(0, frame - i * 18);
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
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 6px 0px #18181B",
                transform: `translateY(${ty}px)`,
                opacity: op,
              }}
            >
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: LIGHT_FONTS.body,
                    fontSize: 24,
                    fontWeight: LIGHT_FONT_WEIGHT.black,
                    color: "#18181B",
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontFamily: LIGHT_FONTS.body,
                    fontSize: 20,
                    fontWeight: LIGHT_FONT_WEIGHT.medium,
                    color: "#525252",
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

      <div
        style={{
          position: "absolute",
          top: 340,
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
            PROMPTS
          </span>
          <br />
          <span style={{ color: "#7C3AED" }}>Likhne pe</span> full prompt pack milega! 🎁
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
            { text: "daily" },
            { text: "drops!" },
          ]}
          delay={20}
          width={340}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ──────────────────────────────────────────────────────────
export const ReelClaudeTutorial: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* High-Production Audio Engine: Sync Voiceover + Tech Beat Loop + Dynamic SFX */}
      <CtrlWalaAudioTrack manifest={claudePromptsManifest as unknown as ReelAudioManifest} />

      {/* Visual Scenes Synced to Speech Boundaries */}
      <Sequence from={S.hook.from} durationInFrames={S.hook.dur}><HookScene /></Sequence>
      <Sequence from={S.claude.from} durationInFrames={S.claude.dur}><ClaudeScene /></Sequence>
      <Sequence from={S.vscode.from} durationInFrames={S.vscode.dur}><VSCodeScene /></Sequence>
      <Sequence from={S.verdict.from} durationInFrames={S.verdict.dur}><VerdictScene /></Sequence>
      <Sequence from={S.cta.from} durationInFrames={S.cta.dur}><CTAScene /></Sequence>
    </AbsoluteFill>
  );
};

export const CLAUDE_TUTORIAL_DURATION = claudePromptsManifest.totalDurationFrames;
