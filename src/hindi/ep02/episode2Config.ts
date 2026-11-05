/**
 * THE UNKNOWN CITY — Episode 02 Configuration
 * "B1 पर आरव का इंतज़ार कौन कर रहा था?"
 *
 * Audio-Synced Timeline (Zero Voice Overlap):
 *   Scene 1: Hook (0–165 frames / 0.0s–5.5s)      [Audio: 5.15s, finishes @ f154]
 *   Scene 2: Choice (165–540 frames / 5.5s–18.0s)   [Audio: 11.72s, finishes @ f516]
 *   Scene 3: Basement (540–810 frames / 18.0s–27.0s) [Audio: 7.22s, finishes @ f756]
 *   Scene 4: Register (810–1110 frames / 27.0s–37.0s)[Audio: 8.05s, finishes @ f1051]
 *   Scene 5: CCTV (1110–1500 frames / 37.0s–50.0s)  [Audio: 12.18s, finishes @ f1475]
 *   Scene 6: Climax (1500–1800 frames / 50.0s–60.0s)[Audio: 7.86s, finishes @ f1736]
 *   Total = 1800 frames = exactly 60.00 seconds. Zero audio bleeding!
 */

import { HindiCaptionChunk } from "../episodeConfig";

export type Episode2Branch = "A" | "B";

export interface Ep2SceneConfig {
  id: string;
  title: string;
  titleEnglish: string;
  timecode: string;
  startFrame: number;
  durationFrames: number;
  audioFile: string;
  captions: HindiCaptionChunk[];
}

export interface Episode2Config {
  id: string;
  seriesTitle: string;
  seriesTitleHindi: string;
  episodeNumber: number;
  episodeTitleHindi: string;
  episodeTitleEnglish: string;
  winningBranch: Episode2Branch;
  width: 1080;
  height: 1920;
  fps: 30;
  durationInFrames: 1800;
  audio: {
    basementDrone: string;
    concreteFootsteps: string;
    pageTurn: string;
    phoneSmsVibe: string;
    monitorCrtPower: string;
    fluorescentBuzz: string;
    heartbeat: string;
    elevatorBell: string;
  };
  scenes: {
    hook: Ep2SceneConfig;
    branchA: Ep2SceneConfig;
    branchB: Ep2SceneConfig;
    basement: Ep2SceneConfig;
    register: Ep2SceneConfig;
    cctvTwist: Ep2SceneConfig;
    cliffhanger: Ep2SceneConfig;
  };
}

export const episode2Config: Episode2Config = {
  id: "tuc-ep02-basement-b1",
  seriesTitle: "THE UNKNOWN CITY",
  seriesTitleHindi: "अनजान शहर",
  episodeNumber: 2,
  episodeTitleHindi: "B1 पर आरव का इंतज़ार कौन कर रहा था?",
  episodeTitleEnglish: "Who was waiting for Aarav at B1?",
  winningBranch: "A", // Default placeholder until user confirms actual winning vote!
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 1800,
  audio: {
    basementDrone: "audio/sfx/basement_drone.wav",
    concreteFootsteps: "audio/sfx/concrete_footsteps.wav",
    pageTurn: "audio/sfx/page_turn.wav",
    phoneSmsVibe: "audio/sfx/phone_sms_vibe.wav",
    monitorCrtPower: "audio/sfx/monitor_crt_power.wav",
    fluorescentBuzz: "audio/sfx/fluorescent_buzz.wav",
    heartbeat: "audio/sfx/heartbeat.wav",
    elevatorBell: "audio/sfx/elevator_bell.wav",
  },
  scenes: {
    // ─── SCENE 1: HOOK (0–165 frames, 0–5.5s) ────────────────────────
    hook: {
      id: "ep2_scene_1_hook",
      title: "HOOK",
      titleEnglish: "THE B1 DESCENT",
      timecode: "12:15 AM",
      startFrame: 0,
      durationFrames: 165,
      audioFile: "audio/hindi/ep02/ep2_scene_1_hook.mp3",
      captions: [
        {
          hindi: "B1 पर...",
          english: "At B1...",
          highlightWords: ["B1"],
          highlightColor: "gold",
          startFrame: 0,
          durationFrames: 60,
        },
        {
          hindi: "कोई आरव का इंतज़ार कर रहा था।",
          english: "Someone was waiting for Aarav.",
          highlightWords: ["इंतज़ार"],
          highlightColor: "cyan",
          startFrame: 65,
          durationFrames: 95,
        },
      ],
    },

    // ─── SCENE 2 (BRANCH A): CCTV ROOM ROUTE (165–540, 5.5–18.0s) ────
    branchA: {
      id: "ep2_scene_2_branch_a",
      title: "BRANCH_A",
      titleEnglish: "YOUR CHOICE: CCTV ROOM",
      timecode: "12:16 AM",
      startFrame: 165,
      durationFrames: 375,
      audioFile: "audio/hindi/ep02/ep2_scene_2_branch_a.mp3",
      captions: [
        {
          hindi: "आरव सिक्योरिटी रूम में घुसा।",
          english: "Aarav entered security room.",
          highlightWords: ["सिक्योरिटी"],
          highlightColor: "white",
          startFrame: 165,
          durationFrames: 110,
        },
        {
          hindi: "कैमरे में दिखा... लिफ्ट B1 पर खुली है!",
          english: "Camera showed... lift opened at B1!",
          highlightWords: ["B1", "खुली"],
          highlightColor: "cyan",
          startFrame: 280,
          durationFrames: 130,
        },
        {
          hindi: "और एक गुप्त रास्ता नीचे जा रहा था।",
          english: "And a secret path led downwards.",
          highlightWords: ["गुप्त", "रास्ता"],
          highlightColor: "gold",
          startFrame: 415,
          durationFrames: 115,
        },
      ],
    },

    // ─── SCENE 2 (BRANCH B): ELEVATOR DESCENT (165–540, 5.5–18.0s) ───
    branchB: {
      id: "ep2_scene_2_branch_b",
      title: "BRANCH_B",
      titleEnglish: "YOUR CHOICE: THE ELEVATOR",
      timecode: "12:16 AM",
      startFrame: 165,
      durationFrames: 375,
      audioFile: "audio/hindi/ep02/ep2_scene_2_branch_b.mp3",
      captions: [
        {
          hindi: "आरव लिफ्ट में घुसा। दरवाज़े बंद।",
          english: "Aarav entered lift. Doors shut.",
          highlightWords: ["लिफ्ट", "बंद"],
          highlightColor: "white",
          startFrame: 165,
          durationFrames: 120,
        },
        {
          hindi: "लिफ्ट सीधे B1 पर रुकी।",
          english: "Lift stopped straight at B1.",
          highlightWords: ["B1"],
          highlightColor: "cyan",
          startFrame: 290,
          durationFrames: 110,
        },
        {
          hindi: "\"आरव... तुम वापस आ गए?\"",
          english: '"Aarav... you returned?"',
          highlightWords: ["वापस"],
          highlightColor: "gold",
          startFrame: 405,
          durationFrames: 125,
        },
      ],
    },

    // ─── SCENE 3: BASEMENT DISCOVERY (540–810, 18.0–27.0s) ───────────
    basement: {
      id: "ep2_scene_3_basement",
      title: "BASEMENT",
      titleEnglish: "BASEMENT LEVEL 1",
      timecode: "12:18 AM",
      startFrame: 540,
      durationFrames: 270,
      audioFile: "audio/hindi/ep02/ep2_scene_3_basement.mp3",
      captions: [
        {
          hindi: "बेसमेंट में अजीब सन्नाटा था...",
          english: "Strange silence in the basement...",
          highlightWords: ["सन्नाटा"],
          highlightColor: "cyan",
          startFrame: 540,
          durationFrames: 120,
        },
        {
          hindi: "सालों से कोई इंसान नहीं आया।",
          english: "No human has visited in years.",
          highlightWords: ["सालों", "कोई", "नहीं"],
          highlightColor: "red",
          startFrame: 665,
          durationFrames: 135,
        },
      ],
    },

    // ─── SCENE 4: VISITOR REGISTER (810–1110, 27.0–37.0s) ────────────
    register: {
      id: "ep2_scene_4_register",
      title: "REGISTER",
      titleEnglish: "THE VISITOR LOG",
      timecode: "12:20 AM",
      startFrame: 810,
      durationFrames: 300,
      audioFile: "audio/hindi/ep02/ep2_scene_4_register.mp3",
      captions: [
        {
          hindi: "डेस्क पर पुराना रजिस्टर खुला था।",
          english: "Old register lay open on desk.",
          highlightWords: ["रजिस्टर"],
          highlightColor: "white",
          startFrame: 810,
          durationFrames: 120,
        },
        {
          hindi: "नाम: आरव।",
          english: "Name: AARAV.",
          highlightWords: ["आरव"],
          highlightColor: "cyan",
          startFrame: 935,
          durationFrames: 75,
        },
        {
          hindi: "तारीख़: 17 साल पहले!",
          english: "Date: 17 YEARS AGO!",
          highlightWords: ["17", "साल"],
          highlightColor: "gold",
          startFrame: 1015,
          durationFrames: 90,
        },
      ],
    },

    // ─── SCENE 5: CCTV TWIST (1110–1500, 37.0–50.0s) ─────────────────
    cctvTwist: {
      id: "ep2_scene_5_cctv",
      title: "CCTV_TWIST",
      titleEnglish: "THE SURVEILLANCE TWIST",
      timecode: "12:22 AM",
      startFrame: 1110,
      durationFrames: 390,
      audioFile: "audio/hindi/ep02/ep2_scene_5_cctv.mp3",
      captions: [
        {
          hindi: "अचानक मॉनिटर चालू हुआ।",
          english: "Suddenly monitor powered on.",
          highlightWords: ["मॉनिटर", "चालू"],
          highlightColor: "cyan",
          startFrame: 1110,
          durationFrames: 110,
        },
        {
          hindi: "स्क्रीन पर आरव के पीछे कोई खड़ा था!",
          english: "On screen, someone stood behind Aarav!",
          highlightWords: ["कोई", "खड़ा"],
          highlightColor: "red",
          startFrame: 1225,
          durationFrames: 135,
        },
        {
          hindi: "मुड़कर देखा... वहाँ कोई नहीं था!",
          english: "Looked back... no one was there!",
          highlightWords: ["कोई", "नहीं"],
          highlightColor: "red",
          startFrame: 1365,
          durationFrames: 125,
        },
      ],
    },

    // ─── SCENE 6: FINAL CLIFFHANGER (1500–1800, 50.0–60.0s) ───────────
    cliffhanger: {
      id: "ep2_scene_6_cliffhanger",
      title: "CLIFFHANGER",
      titleEnglish: "DO NOT GO UP",
      timecode: "12:24 AM",
      startFrame: 1500,
      durationFrames: 300,
      audioFile: "audio/hindi/ep02/ep2_scene_6_cliffhanger.mp3",
      captions: [
        {
          hindi: "अगला विज़िटर: आरव",
          english: "Next Visitor: AARAV",
          highlightWords: ["अगला", "विज़िटर"],
          highlightColor: "gold",
          startFrame: 1500,
          durationFrames: 115,
        },
        {
          hindi: "\"इस बार ऊपर मत जाना।\"",
          english: '"Do not go up this time."',
          highlightWords: ["ऊपर", "मत", "जाना"],
          highlightColor: "red",
          startFrame: 1620,
          durationFrames: 130,
        },
      ],
    },
  },
};
