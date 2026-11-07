# 🎬 Programmatic Creator Video Engine

[![Remotion](https://img.shields.io/badge/Remotion-4.0.540-blue.svg)](https://www.remotion.dev/)
[![React](https://img.shields.io/badge/React-19.3-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776ab.svg)](https://python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Format: 9:16 Vertical](https://img.shields.io/badge/Format-1080x1920%20(9%3A16)-purple.svg)](#video-specifications)

A production-grade, automated 9:16 vertical video production engine built with **Remotion**, **React**, **TypeScript**, and **Edge TTS**.

Designed to generate high-retention, cinematic technical explainers, educational reels, and interactive storytelling shorts for **Instagram Reels**, **YouTube Shorts**, and **TikTok** with zero manual timeline editing.

---

## 🌟 Engine Overview

This repository contains two complete video production engines:

### 1. 🚀 Tech Creator Engine (`CTRL_WALA`)
A creator-focused production engine designed for educational technology reels, AI tutorials, and coding demonstrations:
* **Light-Theme Design System**: Clean `#EBEBEB` dotted background, 3.5px solid dark outlines, retro offset shadows (`0 5px 0 #18181B`), orange step pills, and purple highlight badges.
* **Software Simulation Library**: Reusable mockups of Claude AI chats, multi-tab VS Code editors with live terminals, browser mockups, Whisper word-level JSON cards, audio waveform take selectors, and video timeline filmstrips.
* **Modular Rigged Mascot**: Vector cartoon creator avatar with multi-harmonic sinusoidal speech mouth sync, natural eye blinking, dynamic gaze, and contextual arm gestures (`pointing-up`, `explaining`, `thinking-chin`, `celebrating`).
* **Comic Speech Bubbles**: Vector comic speech bubbles with keyword highlight pills (`[React] code se [video]`, `[time] nikaalta hai`, `toh nahi`).
* **Intelligent Speech Normalizer**: Python phonetic engine that converts technical terms (*Next.js*, *Claude 3.5*, *OpenAI*, *DeepSeek*, *GPT-4o*, *Whisper*, *Remotion*) into natural phonetics so Edge TTS never stutters or spells words letter-by-letter.
* **Procedural Lo-Fi Beats & SFX**: Synthesizes custom 92 BPM copyright-free chill-hop tech beats and layered UI sound effects (whooshes, keyboard typing clacks, pop chimes) with dynamic audio ducking.

### 2. 🎭 Cinematic Storytelling Engine (Hindi & English)
A dramatic, suspense-focused storytelling engine:
* **The Unknown City (अनजान शहर)**: Psychological mystery thriller series with Devanagari kinetic captions and Aarav rigged SVG character.
* **Interactive Audience Branching**: Choice-driven storytelling where audience poll results (Option A vs Option B) dynamically determine scene flows.
* **Night Stories**: English urban suspense series with dynamic editorial layout and grid aesthetics.

---

## 📐 Video Specifications

| Parameter | Specification | Details |
| :--- | :--- | :--- |
| **Resolution** | `1080 × 1920` | Native 9:16 vertical aspect ratio |
| **Frame Rate** | `30 FPS` | Smooth motion graphics & animation curves |
| **Audio Format** | `AAC Stereo / 48kHz` | Multi-track narration, ducked background music & SFX |
| **Video Codec** | `H.264 (MP4)` | Compatible across Instagram, YouTube, TikTok, LinkedIn |
| **Top Safe Zone** | `y > 180px` | Avoids platform UI, search bars, and account badges |
| **Bottom Safe Zone** | `y < 1650px` | Avoids native captions, audio reels ticker, and comment bars |

---

## 🚀 Quickstart Guide

### Prerequisites
* **Node.js**: `v20.19.0`, `v22.13.0`, or `>=24`
* **Python**: `3.10+`
* **Edge-TTS**: Required for automated voice generation

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/jayprajapati-dev/ai-creator-video-engine.git
cd ai-creator-video-engine

# Install Node.js dependencies
npm install

# Install Python requirements for TTS synthesis
python -m pip install edge-tts
```

### 2. Preview in Remotion Studio

Launch the interactive Remotion Studio to preview animations, scrub timelines, inspect components, and test audio synchronization:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Generate Audio & Sound Tracks

Run the speech normalizer and audio generation engine to produce voice tracks, procedural lo-fi beats, and timing manifests:

```bash
npm run audio:ctrlwala
```

### 4. One-Click Video Rendering

Render any of the pre-built reels directly to high-definition MP4:

```bash
# Render Behind the Scenes Reel (Techstackbro style breakdown)
npm run render:reel:behind-scenes

# Render Claude 3.5 Sonnet Prompts Tutorial
npm run render:reel:claude-tut

# Render Python AI App Coding Tutorial
npm run render:reel:coding-tut

# Render DeepSeek V3 vs GPT-4o Comparison Reel
npm run render:reel:deepseek

# Render V0 Full-Stack Prompt Builder Reel
npm run render:reel:v0
```

All rendered videos are saved to the `out/` directory.

---

## 🛠️ How to Create Your Own Video (Step-by-Step)

Creating a new automated reel requires 3 simple steps:

### Step 1: Define Your Script

Open `scripts/generate_ctrlwala_audio.py` and define your scene breakdown:

```python
SCRIPTS["my_new_topic"] = [
    {
        "id": "scene_1_hook",
        "spokenText": "Claude 3.5 use karte ho? Ye 3 prompts tumhari speed 10X kar denge!",
        "displayText": "Claude 3.5 use karte ho? Speed 10X kar denge!",
        "label": "10X DEV HACKS",
        "episode": "01"
    },
    {
        "id": "scene_2_code",
        "spokenText": "Prompt number one: System Architect prompt! Code se pehle schema design.",
        "displayText": "Prompt #1: System Architect Prompt!",
        "label": "PROMPT 01",
        "episode": "01"
    },
    {
        "id": "scene_3_cta",
        "spokenText": "Comment karo CODE aur pura project DM me pao! Follow CTRL_WALA!",
        "displayText": "Comment CODE for automation source code!",
        "label": "CALL TO ACTION",
        "episode": "01"
    }
]
```

### Step 2: Generate Audio & Synced Manifest

Run the audio synthesizer:

```bash
python scripts/generate_ctrlwala_audio.py
```

This automatically:
1. Normalizes technical terms using `scripts/speech_normalizer.py`.
2. Generates sentence-boundary timestamps and MP3 audio clips.
3. Produces a synchronized `manifest.json` with frame-accurate start frames and durations.
4. Synthesizes background lo-fi music with dynamic ducking.

### Step 3: Assemble Remotion Composition

Create a new file in `src/ctrl_wala/compositions/ReelMyTopic.tsx`:

```tsx
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { LightSceneWrapper } from "../components/LightSceneWrapper";
import { MacOSCard, CodeLine } from "../components/MacOSCard";
import { CtrlWalaAudioTrack } from "../components/CtrlWalaAudioTrack";
import myManifest from "../../../public/audio/ctrl_wala/my_new_topic/manifest.json";

export const ReelMyTopic: React.FC = () => {
  const m = myManifest.scenes;

  return (
    <AbsoluteFill>
      {/* Audio Engine with synced voice + music ducking + SFX */}
      <CtrlWalaAudioTrack manifest={myManifest as any} />

      {/* Scene 1: Hook */}
      <Sequence from={m[0].startFrame} durationInFrames={m[0].durationFrames}>
        <LightSceneWrapper
          episode="01"
          step={1}
          stepLabel="hook"
          showMascot={true}
          mascotExpression="excited"
          mascotPose="talking"
          mascotSpeech={[{ text: "Ye", highlight: true }, { text: "dekho!" }]}
        >
          {/* Your content card here */}
        </LightSceneWrapper>
      </Sequence>
    </AbsoluteFill>
  );
};
```

Register your composition in `src/Root.tsx`:

```tsx
<Composition
  id="CtrlWala-MyTopic"
  component={ReelMyTopic}
  durationInFrames={myManifest.totalDurationFrames}
  fps={30}
  width={1080}
  height={1920}
/>
```

---

## 🎨 UI Component Library

All components are located in `src/ctrl_wala/components/` and are built with zero external CSS frameworks (pure React inline styles with TypeScript tokens):

| Component | File | Description |
| :--- | :--- | :--- |
| **TopEpisodeBadge** | [`TopEpisodeBadge.tsx`](src/ctrl_wala/components/TopEpisodeBadge.tsx) | Signature series badge: circular mascot emblem with anime eyes + overlapping oval episode counter pill. |
| **StepIndicatorPill** | [`StepIndicatorPill.tsx`](src/ctrl_wala/components/StepIndicatorPill.tsx) | Orange step pill with 3.5px border, retro drop shadow, and vector SVG icon. |
| **MascotCharacter** | [`MascotCharacter.tsx`](src/ctrl_wala/components/MascotCharacter.tsx) | Vector creator avatar with phoneme mouth sync, blinking, head bob, arm gestures (`pointing-up`, `explaining`, `thinking-chin`, `celebrating`), and comic speech bubble. |
| **MacOSCard** | [`MacOSCard.tsx`](src/ctrl_wala/components/MacOSCard.tsx) | Clean macOS window mockup with window control dots, monospace title, and full-line orange highlight. |
| **VoiceWaveformCard** | [`VoiceWaveformCard.tsx`](src/ctrl_wala/components/VoiceWaveformCard.tsx) | OpenAI voice model card with animated waveform scrubber, 5-take reject (`❌`) / select (`✔`) cards, and transcription callout. |
| **ClaudeInterface** | [`ClaudeInterface.tsx`](src/ctrl_wala/components/ClaudeInterface.tsx) | Realistic Claude chat window with streaming token animation, user avatar, and syntax-highlighted code block. |
| **VSCodeEditor** | [`VSCodeEditor.tsx`](src/ctrl_wala/components/VSCodeEditor.tsx) | Full code editor with file explorer tabs, typing cursor, and interactive bottom terminal. |
| **TimelineFilmstrip** | [`TimelineFilmstrip.tsx`](src/ctrl_wala/components/TimelineFilmstrip.tsx) | Horizontal filmstrip reel showing animated video scene frames with center play button overlay. |
| **BeforeAfterSlider** | [`BeforeAfterSlider.tsx`](src/ctrl_wala/components/BeforeAfterSlider.tsx) | Dual-pane visual transformation slider (e.g., rough prompt vs functional React app). |
| **BenchmarkChart** | [`BenchmarkChart.tsx`](src/ctrl_wala/components/BenchmarkChart.tsx) | Animated horizontal comparison bars for model speed, cost, and accuracy benchmarks. |
| **PremiumIcons** | [`PremiumIcons.tsx`](src/ctrl_wala/components/PremiumIcons.tsx) | Ultra-clean vector SVG icons (`ScriptDocumentIcon`, `StudioMicIcon`, `CaptionsBubbleIcon`, `ClapperMovieIcon`, `PythonBrandIcon`, `ClaudeSparkleIcon`, etc.). |

---

## 📁 Repository Directory Tree

```text
storytelling-reel-engine/
├── public/
│   ├── audio/
│   │   ├── ctrl_wala/               # Generated CTRL_WALA voice MP3s, manifests & beats
│   │   │   ├── behind_scenes/       # Ep 15 Behind the scenes reel audio
│   │   │   ├── claude_prompts/      # Ep 12 Claude tutorial audio
│   │   │   ├── coding_tutorial/     # Ep 09 Python AI app audio
│   │   │   ├── deepseek_vs_gpt4o/   # DeepSeek comparison audio
│   │   │   ├── v0_builder/          # V0 builder audio
│   │   │   └── sfx/                 # Procedural lo-fi beat & UI sound effects
│   │   └── hindi/                   # Preserved storytelling series audio
│   └── ctrl_wala/                   # Creator channel branding assets & logo
├── scripts/
│   ├── generate_ctrlwala_audio.py   # Primary automated speech & manifest generator
│   ├── speech_normalizer.py         # Tech phonetic dictionary (zero spelling bugs)
│   ├── generate_lofi_beat.py        # Procedural 92 BPM chill-hop music generator
│   └── ctrlwala_studio.py           # Command-line preview & rendering CLI
├── src/
│   ├── Root.tsx                     # Master Remotion composition registry
│   ├── ctrl_wala/                   # Primary Tech Creator Engine
│   │   ├── components/              # Reusable software UI & mascot components
│   │   ├── compositions/            # Master reel compositions (1080x1920)
│   │   ├── designSystem/            # Colors, light theme, typography & spacing tokens
│   │   └── engine/                  # Blueprint types & runtime engine
│   ├── branding/                    # Channel avatars, YouTube banners & thumbnails
│   └── hindi/                       # Preserved Hindi storytelling mystery series
├── package.json                     # Scripts & Remotion dependencies
└── tsconfig.json                    # Strict TypeScript configuration
```

---

## 🎵 Audio & Speech Normalization

Edge TTS voices often struggle with technical abbreviations (e.g. pronouncing "DeepSeek" as "D-E-E-P-S-E-E-K" or "Next.js" as "Next dot J-S").

This engine solves this with a built-in phonetic normalization layer in `scripts/speech_normalizer.py`:

```python
# Automatic phonetic translation before speech synthesis
"DeepSeek V3" -> "डीपसीक वी थ्री"
"Next.js"     -> "नेक्स्ट जेएस"
"GPT-4o"      -> "जीपीटी फोर-ओ"
"Claude 3.5"  -> "क्लॉड थ्री पॉइंट फाइव"
"10X"         -> "टेन-एक्स"
"$2.50"       -> "टू पॉइंट फिफ्टी डॉलर्स"
```

The on-screen kinetic captions display high-contrast English text (`displayText`), while the voice synthesis receives the phonetic stream (`spokenText`).

---

## 💻 Available npm Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launch Remotion Studio on `http://localhost:3000` |
| `npm run build` | Bundle Remotion project for headless production rendering |
| `npm run lint` | Run ESLint and TypeScript checks |
| `npm run audio:ctrlwala` | Synthesize all creator voice tracks, lo-fi beats, and manifests |
| `npm run render:reel:behind-scenes` | Render Behind the Scenes reel (`out/ctrl_wala_behind_scenes.mp4`) |
| `npm run render:reel:claude-tut` | Render Claude tutorial reel (`out/ctrl_wala_claude_tutorial.mp4`) |
| `npm run render:reel:coding-tut` | Render Python tutorial reel (`out/ctrl_wala_coding_tutorial.mp4`) |
| `npm run render:reel:deepseek` | Render DeepSeek vs GPT-4o reel (`out/ctrl_wala_deepseek_vs_gpt4o.mp4`) |
| `npm run render:reel:v0` | Render V0 prompt builder reel (`out/ctrl_wala_v0_builder.mp4`) |
| `npm run render:logo` | Export 800×800 circular profile avatar |
| `npm run render:banner` | Export 2560×1440 YouTube channel banner |

---

## 🤝 Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for pull request guidelines, design tokens, and testing steps.

---

## 📄 License

This project is open-source software licensed under the **[MIT License](LICENSE)**.
