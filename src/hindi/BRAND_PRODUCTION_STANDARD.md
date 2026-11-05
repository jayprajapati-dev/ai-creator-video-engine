# 🏆 ANJAAN SHEHAR STORIES / THE UNKNOWN CITY
## Final Brand & Production Standard for All Future Episodes

> **CORE PRINCIPLE:** Treat **ANJAAN SHEHAR STORIES / THE UNKNOWN CITY** as one original, premium Hindi animated mystery brand. Every episode must improve upon the previous one without becoming repetitive.

---

### 📋 The 10 Golden Rules for Every Future Episode

#### 1. Brand Identity & Visual Consistency
* **Character Integrity:** Aarav (19-year-old, navy hoodie, charcoal joggers, white sneakers) maintains identical proportions, facial structure, and color codes across all scenes.
* **Color System:** Midnight Noir (`#05080F`), Deep Charcoal (`#03060C`), Cyan atmospheric mist (`#00D4D4`), Amber indoor glow (`#F4A136`), and Controlled Danger Red (`#DC2626`).
* **Visual Depth:** Never use flat backgrounds. Every shot has 3 layers: Foreground silhouette/props, Midground character, Background environmental depth.

#### 2. Strict Voice & Subtitle Protocol
* **Narration Voice:** Exclusive use of Microsoft Edge Neural TTS **`hi-IN-MadhurNeural`** (natural, cinematic Hindi pacing).
* **Language Purity:** 100% spoken Hindi narration. Never mix spoken English sentences accidentally.
* **Subtitles:** Primary kinetic Devanagari text (bold, large, mobile-friendly) + optional smaller English translation below.

#### 3. 6-Layer Audio & SFX Synchronization
* Every audio track must be verified frame-by-frame against the scene timeline:
  * Layer 1: Ambient room tone / loop.
  * Layer 2: Character Foley (footsteps, breathing).
  * Layer 3: Mechanical & environmental sounds (bells, switches, doors, static).
  * Layer 4: Suspense tension (risers, heartbeat).
  * Layer 5: Hindi narration VO.
  * Layer 6: Cinematic impact stabs on sudden reveals.

#### 4. Zero Dead Time / No Blank Ends
* Never leave an accidental black screen, silent pause, or abrupt cut at the end.
* The final seconds must hold visual tension, audio heartbeats, and clear on-screen elements right until frame 1800 (60.00s).

#### 5. Interactive Audience Dilemma & Follow Hook
* Every episode must conclude with an authentic, high-stakes story choice:
  * **Option A vs Option B** clearly displayed in Hindi and English.
  * Pulsing 6-second countdown timer.
  * Genuine cliffhanger premise that makes viewers want to subscribe/follow for Episode 02, 03, etc.

#### 6. Complete MP4 End-to-End Inspection
* Always inspect the full rendered MP4 file before declaring completion:
  * Check file existence, size (>15MB for 60s @ 1080x1920), and video codec integrity.
  * Review rendered keyframe stills across hook, midpoint, reveal, and cliffhanger.

#### 7. Mobile Readability & Visual QA
* Ensure all text, cues, timecodes, and voting options are clearly legible at 25% mobile scale.
* Check contrast: subtitles must pop against dark and light backgrounds alike.

#### 8. Modular Asset Isolation & Heritage Preservation
* Every new episode has its own isolated asset structure:
  * Episode 01: `src/hindi/scenes/HScene*.tsx`, `public/audio/hindi/h_scene_*.mp3`, `out/episode1_hindi.mp4`.
  * Episode 02: `src/hindi/ep02/`, `public/audio/hindi/ep02/`, `out/episode2_hindi.mp4`.
* **PRESERVATION MANDATE:** Never overwrite, modify, or delete previously published episodes or renders.

#### 9. Live Documentation Updates
* Immediately update `README.md` upon completion of a new episode with:
  * Episode title, plot summary, and timeline.
  * Audio generation and render commands.
  * Output file paths and verification status.

#### 10. Verification Before Completion
* **Strict Rule:** Never claim an episode is complete merely because TypeScript or bundler succeeded. Completion is only declared when:
  * TypeScript compiles with 0 errors (`npx tsc --noEmit`).
  * ESLint passes with 0 warnings (`npm run lint`).
  * Final MP4 is rendered, verified non-zero bytes, and previewed on disk.

