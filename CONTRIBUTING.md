# Contributing to Storytelling Reel Engine

Thank you for your interest in contributing to the **Storytelling Reel Engine**! We welcome improvements to animation components, kinetic typography styles, audio synthesis algorithms, and documentation.

---

## 🛠️ Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/jayprajapati-dev/storytelling-reel-engine.git
   cd storytelling-reel-engine
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```
   *(Node.js 20+ or 22+ recommended)*

3. **Install Python requirements (for voice & audio synthesis):**
   ```bash
   python -m pip install edge-tts
   ```

4. **Launch Remotion Studio:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to preview compositions in real time.

---

## 📐 Design & Code Standards

- **Vertical Mobile Aspect Ratio:** All reels and shorts compositions must target `1080 × 1920` (9:16) at `30 FPS`.
- **UI Safe Zones:** Keep vital elements (subtitles, faces, interactive cards) within standard mobile safe zones:
  - Top safe zone: `y > 180px` (clear of platform headers/search bars).
  - Bottom safe zone: `y < 1620px` (clear of platform captions, like/share icons, sound pill).
- **TypeScript & Linting:**
  Always verify that code compiles cleanly and adheres to ESLint rules:
  ```bash
  npm run lint
  npx tsc --noEmit
  ```
- **Zero Audio Bleed Rule:** Ensure that each spoken narration sentence is measured and that scene sequence durations leave adequate breathing pauses between consecutive dialogue blocks.
- **Cross-Platform Compatibility:** Avoid hardcoded file system paths (`C:\`, `/home/`, etc.). Use relative paths or Remotion's `staticFile()` helper.

---

## 🚀 Pull Request Guidelines

1. Create a feature branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Commit your changes with a descriptive message.
3. Test a quick build or render:
   ```bash
   npm run build
   npm run render:reel:behind-scenes
   ```
4. Push to your branch and open a Pull Request against `main`.

---

## 📜 Code of Conduct

Please be respectful, constructive, and helpful when participating in discussions, reporting issues, or submitting PRs.

