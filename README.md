# 🎬 Storytelling Reel Engine

[![Remotion](https://img.shields.io/badge/Remotion-4.0.540-blue.svg)](https://www.remotion.dev/)
[![React](https://img.shields.io/badge/React-19.3-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Format: 9:16 Vertical](https://img.shields.io/badge/Format-1080x1920%20(9%3A16)-purple.svg)](#video-specifications)

A production-ready, reusable storytelling video automation engine built with **Remotion**, **React**, **TypeScript**, and automated **Text-to-Speech (TTS)**.

Designed to generate high-retention, cinematic 9:16 vertical animated videos for **Instagram Reels**, **YouTube Shorts**, and **TikTok** with zero manual timeline editing.

---

## 🌟 Key Capabilities

- **Bilingual Multi-Series Engine**:
  - **THE UNKNOWN CITY (अनजान शहर)** — Hindi psychological mystery thriller series with Devanagari kinetic captions and rigged character animation.
  - **NIGHT STORIES** — English urban suspense series with dynamic editorial layout and grid aesthetics.
- **Dynamic Audience Branching**: Episode 02 demonstrates choice-driven storytelling where audience poll results (e.g. Option A vs Option B) dynamically determine scene flows and narratives.
- **Algorithmic Sound Design**: Procedural audio generation scripts synthesize drones, heartbeat strobes, elevator bells, shutter slams, CRT monitor hums, and footsteps using Python's standard math library — requiring zero stock asset subscriptions.
- **Modular SVG Character Rigging**: Includes **Aarav**, an expressive SVG character with multiple programmatic poses (`neutral`, `shock`, `running`, `fear`, `lookAround`, `whisper`, etc.).
- **Zero-Audio-Overlap Guarantee**: Precision-timed sequence manifest ensures that narration clips and scene transitions never collide or clip.
- **Integrated Branding Suite**: Built-in Remotion still compositions for generating circular channel profile avatars, multi-device YouTube banners, and 16:9 video thumbnails.

---

## 📺 Series Overview

### 1. THE UNKNOWN CITY (अनजान शहर) — Primary Hindi Series
* **Voice**: `hi-IN-MadhurNeural` (Microsoft Edge Neural TTS)
* **Visual Style**: Cinematic midnight blue noir (`#020408`), phosphor green CCTV feeds, warning cyan (`#00D4D4`), suspense red accents (`#DC2626`).
* **Episodes Included**:
  - **Episode 01**: *मॉल बंद था… फिर लिफ्ट किसने चलाई?* (The Mall was closed... then who activated the lift?)
    - *Composition ID:* `HindiReel` | *Output:* `out/episode1_hindi.mp4`
  - **Episode 02**: *B1 पर आरव का इंतज़ार कौन कर रहा था?* (Who was waiting for Aarav at B1?)
    - *Composition ID:* `HindiReelEp02` | *Output:* `out/episode2_hindi.mp4`
    - *Branching Architecture:* Switch between `winningBranch: "A"` (CCTV Room) and `"B"` (The Elevator) in configuration.
* **Standards**: Governed by the internal [Brand Production Standard](src/hindi/BRAND_PRODUCTION_STANDARD.md) and [Creative Directive](src/hindi/CREATIVE_DIRECTIVE.md).

### 2. NIGHT STORIES — English Prototype Series
* **Voice**: `en-US-ChristopherNeural`
* **Visual Style**: Warm editorial cream canvas (`#F7F4EE`) with graph grid lines and modern typography.
* **Episode 01**: *Locked in the Mall Overnight*
  - *Composition ID:* `StoryReel` | *Output:* `out/episode1.mp4`

---

## 📐 Video Specifications

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Resolution** | `1080 × 1920` | Native 9:16 vertical reel / short |
| **Frame Rate** | `30 FPS` | Fluid motion graphics |
| **Duration** | `1800 Frames` | Exactly 60.00 seconds |
| **Video Codec** | `H.264 (MP4)` | Maximum compatibility across social platforms |
| **Audio** | AAC Stereo | Layered narration, ambient loops, and foley SFX |
| **Safe Zones** | Top > 180px, Bottom < 1620px | Avoids UI overlap from Instagram/YouTube controls |

---

## 📁 Repository Architecture

```text
storytelling-reel-engine/
├── .github/                         # GitHub configuration
├── public/
│   └── audio/
│       ├── hindi/                   # Generated Hindi narration MP3s
│       │   └── ep02/                # Episode 02 branch audio files
│       ├── sfx/                     # Synthesized procedural sound effects
│       └── [english narration MP3s] # English prototype narration files
├── scripts/
│   ├── generate_audio.py            # English Edge TTS generator
│   ├── generate_sfx.py              # English procedural SFX synthesizer
│   ├── generate_hindi_audio.py      # Hindi Episode 01 TTS generator
│   ├── generate_hindi_sfx.py        # Hindi Episode 01 SFX synthesizer
│   ├── generate_hindi_audio_ep02.py # Hindi Episode 02 TTS generator (branches A & B)
│   └── generate_hindi_sfx_ep02.py   # Hindi Episode 02 SFX synthesizer
├── src/
│   ├── Root.tsx                     # Master Remotion composition registry
│   ├── Composition.tsx              # English StoryReel root composition
│   ├── branding/
│   │   ├── ChannelBranding.tsx      # Avatar (800x800) & YouTube Banner (2560x1440)
│   │   └── Thumbnail16x9.tsx        # High-CTR YouTube Thumbnail (1920x1080)
│   ├── components/                  # English series scenes & UI overlays
│   ├── config/                      # English episode configuration & manifest
│   ├── hindi/                       # Hindi series architecture
│   │   ├── Aarav.tsx                # Rigged SVG character (8 poses, scalable)
│   │   ├── designSystem.ts          # Devanagari typography, palette & layout tokens
│   │   ├── episodeConfig.ts         # Episode 01 timeline & caption chunks
│   │   ├── HindiCaptions.tsx        # Dynamic Devanagari kinetic caption engine
│   │   ├── HindiOverlay.tsx         # HUD, REC dot, timecode & corner safe-guides
│   │   ├── HindiReel.tsx            # Episode 01 master sequence composition
│   │   ├── HindiVotingPoll.tsx      # A vs B audience voting interactive card
│   │   ├── ep02/                    # Episode 02 configuration & scenes
│   │   │   ├── episode2Config.ts    # Ep 02 timeline & branching control
│   │   │   ├── HindiReelEp02.tsx    # Ep 02 master sequence composition
│   │   │   └── scenes/              # Ep 02 modular scene components (Hook, B1, CCTV)
│   │   └── scenes/                  # Ep 01 modular scene components
│   └── types/                       # Shared TypeScript interfaces
├── remotion.config.ts               # Remotion bundle & rendering settings
├── package.json                     # NPM scripts & dependencies
├── requirements.txt                 # Python dependencies
├── THIRD_PARTY_NOTICES.md           # Remotion & Edge-TTS licensing compliance
└── LICENSE                          # MIT License
```

---

## 🚀 Quickstart & Installation

### 1. Prerequisites
- **Node.js**: `v20.19.0`, `v22.13.0`, or `>=v24.0.0`
- **Python**: `3.10+`

### 2. Clone & Install
```bash
git clone https://github.com/jayprajapati-dev/storytelling-reel-engine.git
cd storytelling-reel-engine

# Install Node dependencies
npm install

# Install Python requirements
python -m pip install -r requirements.txt
```

---

## 🎙️ Audio & Voice Generation

The repository comes with pre-generated audio files in `public/audio/`. If you want to regenerate voices or modify scripts:

### For Hindi Series (THE UNKNOWN CITY):
```bash
# Episode 01 voice & SFX
npm run audio:hindi
npm run sfx:hindi

# Episode 02 voice & SFX
npm run audio:hindi:ep02
npm run sfx:hindi:ep02
```

### For English Series (NIGHT STORIES):
```bash
npm run audio
npm run sfx
```

---

## 🖥️ Remotion Studio (Visual Editor)

Launch the interactive Remotion Studio to scrub timelines, preview animations, and inspect audio sync in your browser:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and choose any composition:
- `HindiReelEp02` — Episode 02 (Current active Hindi episode)
- `HindiReel` — Episode 01 (Hindi master)
- `StoryReel` — English Episode 01
- `ChannelLogo` — Profile picture still
- `YouTubeBanner` — Channel banner still
- `Thumbnail16x9` — YouTube thumbnail still

---

## ⚡ Video Rendering

### Full Episode Rendering
```bash
# Render Hindi Episode 02 (60s master MP4)
npm run render:ep02

# Render Hindi Episode 01 (60s master MP4)
npm run render:hindi

# Render English Episode 01 (60s master MP4)
npm run render
```

### Fast Preview Rendering (10 Seconds / 300 Frames)
```bash
npm run render:ep02:preview
npm run render:hindi:preview
npm run render:preview
```

### Channel Branding Rendering
```bash
# Export profile picture (800x800 PNG)
npm run render:logo

# Export YouTube channel banner (2560x1440 PNG)
npm run render:banner
```

*All rendered files are saved to the `out/` directory (ignored by git).*

---

## 🧩 How to Create New Episodes

1. **Write Episode Config**:
   Create a new config file (e.g. `src/hindi/ep03/episode3Config.ts`) defining scene durations, timecodes, and caption chunks.
2. **Generate Voiceover**:
   Create `scripts/generate_hindi_audio_ep03.py` using `edge-tts` to generate crisp scene MP3s and timestamp manifests.
3. **Assemble Scenes**:
   Build scene components using React SVG, `spring()`, and `interpolate()` animations.
4. **Register Composition in `src/Root.tsx`**:
   ```tsx
   <Composition
     id="HindiReelEp03"
     component={HindiReelEp03}
     durationInFrames={1800}
     fps={30}
     width={1080}
     height={1920}
   />
   ```
5. **Add NPM Script**:
   Add a render command to `package.json` pointing to the new composition.

---

## 🔧 Code Quality & Testing

Verify that all TypeScript types and ESLint rules pass cleanly:

```bash
# Run ESLint and TypeScript checks
npm run lint

# TypeScript check alone
npx tsc --noEmit
```

---

## ⚖️ License & Third-Party Compliance

- **Engine Code**: Licensed under the [MIT License](LICENSE).
- **Remotion Framework**: Remotion is free for individuals and companies with up to 3 people. For larger organizations or SaaS video platforms, see [Remotion Licensing](https://www.remotion.dev/docs/license).
- **TTS Service**: Uses `edge-tts` for prototyping. For enterprise commercial scale, configure your own licensed TTS endpoint (e.g. Azure Speech).
- **Creative Lore**: Story names, original characters (Aarav, Leo), and narrative scripts are original creative works.
- For full details, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

## 🤝 Contributing

Contributions are welcome! Please check [CONTRIBUTING.md](CONTRIBUTING.md) for setup steps and pull request guidelines.
