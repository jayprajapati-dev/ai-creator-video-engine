# ⚡ CTRL_WALA Creator Engine

A specialized, high-retention video production engine designed for tech creators, educators, and AI developers. Inspired by modern developer education aesthetics with clean light themes, tactile macOS cards, vector mascot rigging, and synchronized audio.

---

## 🎨 Visual Identity & Design System

The visual design is defined in [`designSystem/lightTheme.ts`](designSystem/lightTheme.ts) and [`designSystem/lightTypography.ts`](designSystem/lightTypography.ts):

* **Canvas Background**: Light off-white base (`#EBEBEB`) with a subtle radial dot grid (`#C4C4C8`).
* **Panels & Cards**: Clean white cards (`#FFFFFF`) with 3.5px solid dark borders (`#18181B`) and retro offset drop shadows (`0 5px 0 #18181B`).
* **Step Indicators**: Orange pill badges (`#FF8E60`) with dark borders and vector SVG icons (`PremiumIcons.tsx`).
* **Keyword Highlighting**: Deep purple badges (`#7C3AED` or `#6D28D9`) with white bold text for key terms.
* **Typography**:
  * Display: *Plus Jakarta Sans* / *Inter* (Black 900 weight, tight letter spacing `-0.03em`).
  * Body: *Inter* / *Segoe UI* (Extrabold 800 weight).
  * Monospace: *JetBrains Mono* / *Fira Code* / *Consolas*.

---

## 🧱 Component Architecture

All components are located in [`src/ctrl_wala/components/`](components/):

```text
src/ctrl_wala/components/
├── TopEpisodeBadge.tsx        # Signature top circle with cute brain mascot + episode counter pill
├── StepIndicatorPill.tsx      # Step badge (step 1 • script, step 2 • awaaz, step 5 • animation)
├── MascotCharacter.tsx        # Rigged vector presenter with phoneme mouth sync, blinking & poses
├── LightSceneWrapper.tsx      # Safe-zone scene container combining background, top badge & mascot
├── MacOSCard.tsx              # macOS window mockup with title, control dots & active-line highlight
├── VoiceWaveformCard.tsx      # Voice model info, scrubbing waveform, 5 take cards & transcription
├── ClaudeInterface.tsx        # Streaming AI assistant conversation mockup with code blocks
├── VSCodeEditor.tsx           # Multi-file code editor with live syntax highlighting & terminal
├── TimelineFilmstrip.tsx      # Horizontal filmstrip strip showing rendered video frames
├── BeforeAfterSlider.tsx      # Dual-pane comparison slider
├── BenchmarkChart.tsx         # Animated benchmark comparison bars
├── DynamicHinglishCaptions.tsx# Kinetic synchronized on-screen caption engine
└── PremiumIcons.tsx           # Hand-crafted vector SVG icons (zero generic emojis)
```

---

## 🎭 Mascot Character Poses & Expressions

The mascot in [`MascotCharacter.tsx`](components/MascotCharacter.tsx) supports programmatic poses:

* `"pointing-up"`: Arm raised pointing directly towards the code or software card above.
* `"explaining"`: Open palm gesturing towards the screen.
* `"thinking-chin"`: Hand on chin, head tilted, evaluating options.
* `"celebrating"`: Confident smile with thumbs-up gesture.
* `"talking"`: Conversational creator delivery with multi-harmonic phoneme mouth sync.

The mascot automatically appears on **Hooks**, **Reactions**, **Verdicts**, and **CTAs**, while software demonstration scenes set `showMascot={false}` to grant full vertical screen height (`bottom: 130`) to code editors and interfaces.

---

## 🚀 Pre-Built Compositions

* **`CtrlWala-BehindScenes`** (`1501 frames / 50.0s`): Full 5-step breakdown of how the channel is built with AI.
* **`CtrlWala-ClaudeTutorial`** (`1040 frames / 34.7s`): 3 secret Claude 3.5 Sonnet prompt templates for 10x coding.
* **`CtrlWala-CodingTutorial`** (`901 frames / 30.0s`): Building a full AI app in Python & Streamlit in 15 minutes.
* **`CtrlWala-DeepSeekVsGpt4o`** (`1278 frames / 42.6s`): Detailed price, accuracy, and benchmark comparison.
* **`CtrlWala-V0Builder`** (`904 frames / 30.1s`): Prompt-to-full-stack React application demonstration.
