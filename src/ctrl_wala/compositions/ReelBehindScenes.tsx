/**
 * CTRL_WALA Reel — Behind the Scenes (Version 3.0 - Scene-Reactive & Clean Top)
 *
 * Topic: "Yeh Poora Channel AI se Banta Hai — Behind the Scenes"
 * Faithfully adapts the Techstackbro reference presentation style into CTRL_WALA:
 *   - Clean layout: NO redundant brand header (native Reels UI safe)
 *   - Step 1 • script 📝: Claude Python script prompt in MacOS card + Mascot pointing up
 *   - Step 2 • awaaz 🎤: OpenAI voice waveform + 5 takes + transcription
 *   - Step 3 • captions 💬: Whisper word timestamps JSON + vector audio speaker
 *   - Step 4 • animation 🎬: Remotion code + Timeline filmstrip + Mascot pointing up
 *   - CTA: Summary breakdown + Celebrating Mascot
 */

import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LightSceneWrapper } from "../components/LightSceneWrapper";
import { TopEpisodeBadge } from "../components/TopEpisodeBadge";
import { MascotCharacter } from "../components/MascotCharacter";
import { VoiceWaveformCard, VoiceTake } from "../components/VoiceWaveformCard";
import { MacOSCard, CodeLine } from "../components/MacOSCard";
import { TimelineFilmstrip } from "../components/TimelineFilmstrip";
import { DotBackground } from "../components/DotBackground";
import { CtrlWalaAudioTrack } from "../components/CtrlWalaAudioTrack";
import {
  ScriptDocumentIcon,
  StudioMicIcon,
  CaptionsBubbleIcon,
  ClapperMovieIcon,
  CheckBadgeSolidIcon,
  CursorClickPointer,
} from "../components/PremiumIcons";
import { ReelAudioManifest } from "../engine/types";
import { LIGHT } from "../designSystem/lightTheme";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";
import behindScenesManifest from "../../../public/audio/ctrl_wala/behind_scenes/manifest.json";

const m = behindScenesManifest.scenes;
const S = {
  hook:    { from: m[0].startFrame, dur: m[0].durationFrames },
  script:  { from: m[1].startFrame, dur: m[1].durationFrames },
  voice:   { from: m[2].startFrame, dur: m[2].durationFrames },
  caption: { from: m[3].startFrame, dur: m[3].durationFrames },
  anim:    { from: m[4].startFrame, dur: m[4].durationFrames },
  cta:     { from: m[5].startFrame, dur: m[5].durationFrames },
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
        <TopEpisodeBadge episode="15" delay={4} />
      </div>

      {/* Center Hook Box */}
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
          <ClapperMovieIcon size={22} color="#18181B" />
          <span
            style={{
              fontFamily: LIGHT_FONTS.body,
              fontSize: 22,
              fontWeight: LIGHT_FONT_WEIGHT.black,
              color: "#18181B",
            }}
          >
            Behind the Scenes
          </span>
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: LIGHT_FONTS.display,
            fontSize: 62,
            fontWeight: LIGHT_FONT_WEIGHT.black,
            color: "#18181B",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          Yeh Poora Channel{" "}
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
            AI se
          </span>
          <br />
          Banta Hai —{" "}
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
            Kaise?
          </span>
        </div>
      </div>

      {/* Mascot at Bottom */}
      <div style={{ position: "absolute", bottom: 120, left: 48, right: 48 }}>
        <MascotCharacter
          expression="thinking"
          pose="thinking-chin"
          speechWords={[
            { text: "Main" },
            { text: "bas" },
            { text: "decide", highlight: true },
            { text: "karta" },
            { text: "hoon..." },
          ]}
          delay={15}
          width={310}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Step 1: Script Scene ──────────────────────────────────────────────────────
const ScriptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const SCRIPT_LINES = [
    "# Claude se high-retention script generate karo",
    "",
    'prompt = """',
    "  Topic: AI Video Automation with Remotion",
    "  Tone: Tech Conversational Hinglish",
    "  Structure: Hook -> Proof -> Code -> Verdict",
    "  Duration: 25 seconds exact",
    '"""',
    "",
    "script = claude.messages.create(",
    '    model="claude-3-5-sonnet-20241022",',
    '    messages=[{"role": "user", "content": prompt}]',
    ").content[0].text",
  ];

  // Animated cursor clicking on line 10
  const cursorProgress = Math.min(1, Math.max(0, (frame - 20) / 35));
  const cursorX = interpolate(cursorProgress, [0, 1], [650, 420]);
  const cursorY = interpolate(cursorProgress, [0, 1], [150, 290]);
  const isClicking = frame > 55 && frame < 75;

  return (
    <LightSceneWrapper
      episode="15"
      step={1}
      stepLabel="script"
      stepIcon={<ScriptDocumentIcon size={24} color="#18181B" />}
      showMascot={true}
      mascotExpression="explaining"
      mascotPose="pointing-up"
      mascotSpeech={[
        { text: "Claude", highlight: true },
        { text: "script" },
        { text: "likhta" },
        { text: "hai" },
      ]}
      mascotDelay={15}
    >
      <div style={{ position: "relative" }}>
        <MacOSCard filename="ep11-gpt-hi/script.py" delay={10}>
          <div style={{ padding: "4px 0" }}>
            {SCRIPT_LINES.map((line, i) => (
              <CodeLine
                key={i}
                code={line || " "}
                highlighted={i === 10}
                indent={line.startsWith("    ") ? 1 : 0}
                delay={i * 8}
              />
            ))}
          </div>
        </MacOSCard>
        {frame > 15 && frame < 120 && (
          <CursorClickPointer x={cursorX} y={cursorY} clicking={isClicking} />
        )}
      </div>
    </LightSceneWrapper>
  );
};

// ── Step 2: Voice Scene ───────────────────────────────────────────────────────
const VoiceScene: React.FC = () => {
  const TAKES: VoiceTake[] = [
    { id: "t1", state: "rejected" },
    { id: "t2", state: "rejected" },
    { id: "t3", state: "rejected" },
    { id: "t4", state: "selected" },
    { id: "t5", state: "rejected" },
  ];

  return (
    <LightSceneWrapper
      episode="15"
      step={2}
      stepLabel="awaaz"
      stepIcon={<StudioMicIcon size={24} color="#18181B" />}
      showMascot={true}
      mascotExpression="talking"
      mascotPose="talking"
      mascotSpeech={[
        { text: "toh" },
        { text: "nahi" },
      ]}
      mascotDelay={20}
    >
      <VoiceWaveformCard
        modelProvider="OpenAI voice model"
        modelName="gpt-audio-1.5"
        voiceName="cedar"
        filename="ep11 ki asli awaaz (vo.wav)"
        takes={TAKES}
        transcriptionNote={'t3: "Transformer" → "dance-former" ✕'}
        delay={10}
      />
    </LightSceneWrapper>
  );
};

// ── Step 3: Captions Scene ────────────────────────────────────────────────────
const CaptionScene: React.FC = () => {
  const CAPTION_JSON = [
    '[{"w": "Roz", "s": 0.01, "e": 0.2},',
    ' {"w": "ChatGPT", "s": 0.2, "e": 0.61},',
    ' {"w": "use", "s": 0.61, "e": 0.8},',
    ' {"w": "karte", "s": 0.8, "e": 1.17}, …',
  ];

  return (
    <LightSceneWrapper
      episode="15"
      step={3}
      stepLabel="captions"
      stepIcon={<CaptionsBubbleIcon size={24} color="#18181B" />}
      showMascot={true}
      mascotExpression="talking"
      mascotPose="talking"
      mascotSpeech={[
        { text: "time", highlight: true },
        { text: "nikaalta" },
        { text: "hai" },
      ]}
      mascotDelay={15}
    >
      <MacOSCard filename="ep11-gpt-hi/vo.words.json" delay={10}>
        <div style={{ padding: "4px 0" }}>
          {CAPTION_JSON.map((line, i) => (
            <CodeLine
              key={i}
              code={line}
              highlighted={i === 1}
              delay={i * 10}
            />
          ))}
        </div>
      </MacOSCard>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <span
          style={{
            fontFamily: LIGHT_FONTS.body,
            fontSize: 28,
            fontWeight: LIGHT_FONT_WEIGHT.extrabold,
            color: "#7C3AED",
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          Whisper: har word ka time ⏱
        </span>
      </div>
    </LightSceneWrapper>
  );
};

// ── Step 4: Animation Scene ───────────────────────────────────────────────────
const AnimationScene: React.FC = () => {
  const REMOTION_CODE = [
    "<Scene from={0} to={t(a.g)}>",
    "  <Pill text={tx.hookPill} at={2} />",
    "  <Sticker text={tx.useSticker} at={t(a.use)}",
    "    bg={POP} rotate={6} size={42} … />",
    "</Scene>",
  ];

  return (
    <LightSceneWrapper
      episode="15"
      step={5}
      stepLabel="animation"
      stepIcon={<ClapperMovieIcon size={24} color="#18181B" />}
      showMascot={true}
      mascotExpression="explaining"
      mascotPose="pointing-up"
      mascotSpeech={[
        { text: "React", highlight: true },
        { text: "code" },
        { text: "se" },
        { text: "video", highlight: true },
      ]}
      mascotDelay={15}
    >
      <MacOSCard filename="ep11-gpt-hi/scenes.tsx" delay={10}>
        <div style={{ padding: "4px 0" }}>
          {REMOTION_CODE.map((line, i) => (
            <CodeLine
              key={i}
              code={line}
              highlighted={i === 1}
              indent={i > 0 && i < 4 ? 1 : 0}
              delay={i * 8}
            />
          ))}
        </div>
      </MacOSCard>

      <TimelineFilmstrip label="ep11 reel ke asli frames" delay={25} />
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

  const steps = [
    { label: "Script", icon: <ScriptDocumentIcon size={20} color="#18181B" /> },
    { label: "Awaaz", icon: <StudioMicIcon size={20} color="#18181B" /> },
    { label: "Captions", icon: <CaptionsBubbleIcon size={20} color="#18181B" /> },
    { label: "Animation", icon: <ClapperMovieIcon size={20} color="#18181B" /> },
    { label: "Render", icon: <CheckBadgeSolidIcon size={20} /> },
  ];

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
        <TopEpisodeBadge episode="15" delay={4} />
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
          transform: `scale(${scale})`,
          opacity: op,
        }}
      >
        {/* Step pills row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                border: "3.5px solid #18181B",
                borderRadius: 100,
                paddingLeft: 18,
                paddingRight: 20,
                paddingTop: 8,
                paddingBottom: 8,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: LIGHT_FONTS.body,
                fontSize: 20,
                fontWeight: LIGHT_FONT_WEIGHT.black,
                color: "#18181B",
                boxShadow: "0 4px 0px #18181B",
              }}
            >
              {step.icon}
              <span>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Headline */}
        <div
          style={{
            textAlign: "center",
            fontFamily: LIGHT_FONTS.display,
            fontSize: 58,
            fontWeight: LIGHT_FONT_WEIGHT.black,
            color: "#18181B",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          Poora Channel{" "}
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
            AI se
          </span>
          <br />
          Automatic Banta Hai!
        </div>

        {/* Comment CTA Box */}
        <div
          style={{
            backgroundColor: "#FF8E60",
            border: "3.5px solid #18181B",
            borderRadius: 22,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 16,
            paddingBottom: 16,
            boxShadow: "0 6px 0px #18181B",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: LIGHT_FONTS.code,
              fontSize: 28,
              fontWeight: LIGHT_FONT_WEIGHT.black,
              color: "#18181B",
              letterSpacing: "0.04em",
            }}
          >
            COMMENT "CODE" FOR AUTOMATION
          </span>
        </div>
      </div>

      {/* Celebrating Mascot */}
      <div style={{ position: "absolute", bottom: 120, left: 48, right: 48 }}>
        <MascotCharacter
          expression="excited"
          pose="celebrating"
          speechWords={[
            { text: "AI", highlight: true },
            { text: "video" },
            { text: "engine", highlight: true },
            { text: "ready!" },
          ]}
          delay={15}
          width={310}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const ReelBehindScenes: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        translate: "-1px 0px"
      }}
    >
      {/* High-Production Audio Engine: Sync Voiceover + Tech Beat Loop + Dynamic SFX */}
      <CtrlWalaAudioTrack manifest={behindScenesManifest as unknown as ReelAudioManifest} />

      {/* Visual Scenes Synced to Speech Boundaries */}
      <Sequence from={S.hook.from} durationInFrames={S.hook.dur}><HookScene /></Sequence>
      <Sequence from={S.script.from} durationInFrames={S.script.dur}><ScriptScene /></Sequence>
      <Sequence from={S.voice.from} durationInFrames={S.voice.dur}><VoiceScene /></Sequence>
      <Sequence from={S.caption.from} durationInFrames={S.caption.dur}><CaptionScene /></Sequence>
      <Sequence from={S.anim.from} durationInFrames={S.anim.dur}><AnimationScene /></Sequence>
      <Sequence from={S.cta.from} durationInFrames={S.cta.dur}><CTAScene /></Sequence>
    </AbsoluteFill>
  );
};

export const BEHIND_SCENES_DURATION = behindScenesManifest.totalDurationFrames;
