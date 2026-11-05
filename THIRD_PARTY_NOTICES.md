# Third-Party Notices & Licensing Compliance

This repository, **Storytelling Reel Engine**, utilizes several open-source libraries, runtimes, and external services. This document outlines the applicable licenses and usage terms.

---

## 1. Remotion Framework

- **Project:** [Remotion](https://www.remotion.dev/)
- **License:** Remotion License ([Full Terms](https://www.remotion.dev/docs/license))
- **Applicability:**
  - Remotion is free to use for individuals and for entities with up to 3 people or companies below specified revenue thresholds.
  - Companies with 4 or more employees or those building commercial video rendering SaaS platforms must obtain a commercial license from [remotion.pro/license](https://www.remotion.pro/license).
  - Users of this template are responsible for complying with Remotion's license according to their organization size and use case.

---

## 2. Text-to-Speech (TTS) Pipeline

- **Tool:** `edge-tts` (Python client for Microsoft Edge Read Aloud service)
- **License:** GNU Lesser General Public License v3.0 / MIT
- **Service Terms:**
  - The default voice generation scripts connect to the Microsoft Edge speech service.
  - This is intended for personal, educational, research, and non-commercial prototyping.
  - For enterprise or large-scale commercial deployments, users should configure their own licensed speech service such as [Microsoft Azure Cognitive Services Speech](https://azure.microsoft.com/services/cognitive-services/text-to-speech/) or ElevenLabs.

---

## 3. Procedural Audio Synthesis

- **Scripts:** `scripts/generate_sfx.py`, `scripts/generate_hindi_sfx.py`, `scripts/generate_hindi_sfx_ep02.py`
- **License:** MIT / Public Domain
- **Description:** All procedural sound effects (drones, risers, mechanical shutters, elevator bells, footsteps, heartbeats, glitches) are synthesized algorithmically using Python's standard `wave`, `math`, and `struct` libraries. No third-party stock audio libraries or proprietary sound recordings are used.

---

## 4. Frontend & Video Stack

- **React & React DOM:** MIT License (Copyright Meta Platforms, Inc.)
- **TypeScript:** Apache License 2.0 (Copyright Microsoft Corporation)
- **ESLint:** MIT License (Copyright OpenJS Foundation)
- **Prettier:** MIT License

---

## 5. Creative Content & Intellectual Property

- **The Engine Code:** The application architecture, Remotion scene sequence structure, kinetic typography systems, procedural character rigging, and audio sync algorithms are provided under the repository's [MIT License](LICENSE).
- **Story Content & Lore:** The narrative scripts, story universe ("THE UNKNOWN CITY" / "अनजान शहर", "NIGHT STORIES"), character names (Aarav, Leo), episode concepts, and branding emblems represent original creative work. If you fork or adapt this engine, you are encouraged to plug in your own original characters, narratives, and channel branding.

