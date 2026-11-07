/**
 * CTRL_WALA Phase 1 — Test Composition
 *
 * 60-second (1800 frames @ 30fps) showcase of the CTRL_WALA design system.
 * Demonstrates all five motion graphic components in sequence.
 *
 * Layout:
 *   0–90   (0–3s)   Brand open — Logo + tagline
 *   90–450 (3–15s)  TerminalView — AI tool install demo
 *   450–750 (15–25s) BrowserMockup — cool AI website
 *   750–1200 (25–40s) AIChatSimulator — Claude prompt + response
 *   1200–1560 (40–52s) CodeDiffViewer — before/after code improvement
 *   1560–1800 (52–60s) CommentCtaBanner — CTA
 */

import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  FONT_WEIGHT,
  SAFE_ZONE,
  SPACING,
  VIDEO,
  entranceSpring,
  fadeIn,
  fadeOut,
} from "./designSystem";
import { TerminalView, TerminalLine } from "./components/TerminalView";
import { BrowserMockup } from "./components/BrowserMockup";
import { AIChatSimulator, ChatMessage } from "./components/AIChatSimulator";
import { CodeDiffViewer, DiffLine } from "./components/CodeDiffViewer";
import { CommentCtaBanner } from "./components/CommentCtaBanner";

// ─── Scene timing constants ───────────────────────────────────────────────────
const SCENE = {
  brand:    { start: 0,    end: 90 },
  terminal: { start: 90,   end: 450 },
  browser:  { start: 450,  end: 750 },
  chat:     { start: 750,  end: 1200 },
  diff:     { start: 1200, end: 1560 },
  cta:      { start: 1560, end: 1800 },
} as const;

const FADE = 12; // crossfade overlap frames

// ─── Scene opacity helper ─────────────────────────────────────────────────────
const sceneOpacity = (frame: number, start: number, end: number): number => {
  const fadeInOpacity = fadeIn(frame, start, FADE);
  const fadeOutOpacity = fadeOut(frame, end - FADE, FADE);
  return Math.min(fadeInOpacity, fadeOutOpacity);
};

// ─── Static data ──────────────────────────────────────────────────────────────
const TERMINAL_LINES: TerminalLine[] = [
  { type: "command", command: "pip install openai" },
  { type: "success", output: "Successfully installed openai-1.52.0" },
  { type: "command", command: "python ai_summarize.py --file report.pdf" },
  { type: "info",    output: "Reading file... 42 pages detected" },
  { type: "info",    output: "Sending to GPT-4o..." },
  { type: "success", output: "Summary generated in 3.2s — 95% compression" },
  { type: "dim",     output: "Output saved to summary.txt" },
];

const CHAT_MESSAGES: ChatMessage[] = [
  {
    role: "user",
    content: "Write a Python function to summarize a PDF using OpenAI API",
  },
  {
    role: "assistant",
    content: "Sure! Here's a clean function:",
    isCode: false,
  },
  {
    role: "assistant",
    content: `def summarize_pdf(path: str) -> str:
    text = extract_text(path)
    resp = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user",
                   "content": f"Summarize:\\n{text}"}]
    )
    return resp.choices[0].message.content`,
    isCode: true,
    language: "python",
  },
];

const DIFF_LINES: DiffLine[] = [
  { type: "header",  content: "@@ PDF summarizer — before / after refactor @@" },
  { type: "removed", content: 'with open(path, "rb") as f:' },
  { type: "removed", content: "    data = f.read()" },
  { type: "removed", content: "    text = extract_raw(data)  # untyped" },
  { type: "removed", content: "    summary = call_api(text)  # no error handling" },
  { type: "added",   content: "def summarize_pdf(path: str) -> str:" },
  { type: "added",   content: "    text = extract_text(path)   # typed helper" },
  { type: "added",   content: "    if not text.strip():" },
  { type: "added",   content: '        raise ValueError("Empty document")' },
  { type: "added",   content: "    return _call_openai(text)   # retries built-in" },
  { type: "context", content: "" },
  { type: "context", content: "# 15 lines → 5 lines. Typed. Safe. Fast." },
];

// ─── Brand Open scene ─────────────────────────────────────────────────────────
const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = entranceSpring(frame, fps, 5, 200, 20);
  const tag = entranceSpring(frame, fps, 20, 160, 18);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: SPACING[4],
      }}
    >
      {/* Logo wordmark */}
      <div
        style={{
          transform: `scale(${logo.scale}) translateY(${logo.translateY}px)`,
          opacity: logo.opacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZE["3xl"],
            fontWeight: FONT_WEIGHT.black,
            background: COLORS.gradient.cyanViolet,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          CTRL_WALA
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          transform: `translateY(${tag.translateY}px)`,
          opacity: tag.opacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: FONT_SIZE.sm,
            color: COLORS.text.secondary,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          AI Tools · Real Workflows · Daily Drops
        </div>
      </div>

      {/* Cyan accent line */}
      <div
        style={{
          width: interpolate(logo.scale, [0, 1], [0, 200]),
          height: 2,
          background: COLORS.gradient.cyanEmerald,
          borderRadius: 999,
          opacity: logo.opacity,
          boxShadow: `0 0 12px ${COLORS.cyan.glow}`,
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Scene wrapper with safe-zone padding ─────────────────────────────────────
const SceneWrapper: React.FC<{ children: React.ReactNode; label: string; opacity: number }> = ({
  children,
  label,
  opacity,
}) => (
  <AbsoluteFill
    style={{
      padding: `${SAFE_ZONE.contentTop}px ${SAFE_ZONE.horizontalMargin}px`,
      paddingBottom: SAFE_ZONE.bottomRestricted,
      opacity,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: SPACING[6],
    }}
  >
    {/* Scene label chip */}
    <div
      style={{
        alignSelf: "flex-start",
        background: COLORS.bg.surfaceHigh,
        border: `1px solid ${COLORS.bg.surfaceBorder}`,
        borderRadius: 999,
        padding: `4px ${SPACING[4]}px`,
        fontSize: 14,
        color: COLORS.text.secondary,
        fontFamily: FONTS.code,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
    {children}
  </AbsoluteFill>
);

// ─── Main composition ─────────────────────────────────────────────────────────
export const CtrlWalaPhase1: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.bg.base, fontFamily: FONTS.body }}>

      {/* ── Brand open (0–90) ── */}
      <AbsoluteFill style={{ opacity: sceneOpacity(frame, SCENE.brand.start, SCENE.brand.end) }}>
        <Sequence from={SCENE.brand.start} durationInFrames={SCENE.brand.end - SCENE.brand.start}>
          <BrandOpen />
        </Sequence>
      </AbsoluteFill>

      {/* ── Terminal (90–450) ── */}
      <AbsoluteFill style={{ opacity: sceneOpacity(frame, SCENE.terminal.start, SCENE.terminal.end) }}>
        <Sequence from={SCENE.terminal.start} durationInFrames={SCENE.terminal.end - SCENE.terminal.start}>
          <SceneWrapper label="AI Tool · Python" opacity={1}>
            <TerminalView
              lines={TERMINAL_LINES}
              startFrame={0}
              title="~/projects/ai-tools — python"
              framesPerLine={40}
            />
          </SceneWrapper>
        </Sequence>
      </AbsoluteFill>

      {/* ── Browser (450–750) ── */}
      <AbsoluteFill style={{ opacity: sceneOpacity(frame, SCENE.browser.start, SCENE.browser.end) }}>
        <Sequence from={SCENE.browser.start} durationInFrames={SCENE.browser.end - SCENE.browser.start}>
          <SceneWrapper label="AI Website" opacity={1}>
            <BrowserMockup
              url="https://claude.ai/chat"
              startFrame={0}
              loadDurationFrames={45}
            >
              <div
                style={{
                  padding: "24px 32px",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  color: "#1e293b",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                  Welcome to Claude
                </div>
                <div style={{ fontSize: 15, color: "#64748b" }}>
                  How can I help you today?
                </div>
                <div
                  style={{
                    marginTop: 20,
                    background: "#f1f5f9",
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#94a3b8",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Message Claude...
                </div>
              </div>
            </BrowserMockup>
          </SceneWrapper>
        </Sequence>
      </AbsoluteFill>

      {/* ── Chat (750–1200) ── */}
      <AbsoluteFill style={{ opacity: sceneOpacity(frame, SCENE.chat.start, SCENE.chat.end) }}>
        <Sequence from={SCENE.chat.start} durationInFrames={SCENE.chat.end - SCENE.chat.start}>
          <SceneWrapper label="AI Chat · Claude" opacity={1}>
            <AIChatSimulator
              messages={CHAT_MESSAGES}
              startFrame={0}
              modelName="Claude 3.5 Sonnet"
              framesPerMessage={150}
            />
          </SceneWrapper>
        </Sequence>
      </AbsoluteFill>

      {/* ── Diff (1200–1560) ── */}
      <AbsoluteFill style={{ opacity: sceneOpacity(frame, SCENE.diff.start, SCENE.diff.end) }}>
        <Sequence from={SCENE.diff.start} durationInFrames={SCENE.diff.end - SCENE.diff.start}>
          <SceneWrapper label="Code Refactor" opacity={1}>
            <CodeDiffViewer
              lines={DIFF_LINES}
              language="python"
              startFrame={0}
              title="summarize_pdf.py"
              framesPerLine={22}
            />
          </SceneWrapper>
        </Sequence>
      </AbsoluteFill>

      {/* ── CTA (1560–1800) ── */}
      <AbsoluteFill style={{ opacity: sceneOpacity(frame, SCENE.cta.start, VIDEO.durationFrames) }}>
        <Sequence from={SCENE.cta.start} durationInFrames={VIDEO.durationFrames - SCENE.cta.start}>
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: `0 ${SAFE_ZONE.horizontalMargin}px`,
              gap: SPACING[8],
            }}
          >
            {/* Main hook */}
            <div
              style={{
                textAlign: "center",
                fontFamily: FONTS.display,
                fontSize: FONT_SIZE["2xl"],
                fontWeight: FONT_WEIGHT.black,
                color: COLORS.text.primary,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              PDF को 3 seconds में summarize करो 🤖
            </div>

            <CommentCtaBanner
              keyword="CODE"
              instruction="likhne pe complete Python script milegi"
              accent="cyan"
              startFrame={15}
            />

            <CommentCtaBanner
              keyword="PROMPT"
              instruction="likhne pe exact system prompt milega"
              accent="violet"
              startFrame={30}
            />
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};

