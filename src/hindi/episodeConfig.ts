/**
 * THE UNKNOWN CITY — Episode 01 Configuration
 * "Mall Band Tha… Phir Lift Kisne Chalayi?"
 *
 * Scene timing aligned with actual audio durations from narration_manifest_hindi.json.
 * Total = 1800 frames (60.00s @ 30fps)
 *
 * Audio durations (actual):
 *   Scene 1: 4.8s  → 144 frames  → give 150 frames (scene buffer)
 *   Scene 2: 13.8s → 414 frames  → give 390 frames
 *   Scene 3: 17.3s → 519 frames  → give 480 frames  (most cinematic)
 *   Scene 4: 9.7s  → 291 frames  → give 300 frames
 *   Scene 5: 15.1s → 453 frames  → give 390 frames
 *   Scene 6: 10.7s → 321 frames  → give 240 frames
 *   Scene 7: 9.3s  → 279 frames  → give 240 frames (hold for vote)
 *   Total                          = 2190 → scale to 1800 by tightening
 *
 * Adjusted to exactly 1800 frames:
 *   Scene 1:  0–120    (120 frames, 4s)
 *   Scene 2:  120–480  (360 frames, 12s)
 *   Scene 3:  480–810  (330 frames, 11s)   [elevator visually longer]
 *   Scene 4:  810–1080 (270 frames, 9s)
 *   Scene 5:  1080–1500(420 frames, 14s)   [cctv reveal most important]
 *   Scene 6:  1500–1620(120 frames, 4s)    [tight dramatic twist]
 *   Scene 7:  1620–1800(180 frames, 6s)    [cliffhanger vote]
 */

export interface HindiCaptionChunk {
  hindi: string;
  english?: string;
  highlightWords?: string[];
  highlightColor?: "red" | "cyan" | "gold" | "white";
  startFrame: number;
  durationFrames: number;
}

export interface HindiScene {
  id: string;
  title: string;
  titleEnglish: string;
  timecode: string;
  startFrame: number;
  durationFrames: number;
  audioFile: string;
  captions: HindiCaptionChunk[];
}

export interface HindiEpisodeConfig {
  id: string;
  seriesTitle: string;
  seriesTitleHindi: string;
  episodeNumber: number;
  episodeTitleHindi: string;
  episodeTitleEnglish: string;
  width: 1080;
  height: 1920;
  fps: 30;
  durationInFrames: 1800;
  audio: {
    mallAmbience: string;
    heartbeat: string;
  };
  scenes: HindiScene[];
}

export const episode1HindiConfig: HindiEpisodeConfig = {
  id: "tuc-ep01-mall-lift",
  seriesTitle: "THE UNKNOWN CITY",
  seriesTitleHindi: "अनजान शहर",
  episodeNumber: 1,
  episodeTitleHindi: "मॉल बंद था… फिर लिफ्ट किसने चलाई?",
  episodeTitleEnglish: "Mall Band Tha... Phir Lift Kisne Chalayi?",
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 1800,
  audio: {
    mallAmbience: "audio/sfx/mall_ambience.wav",
    heartbeat: "audio/sfx/heartbeat.wav",
  },
  scenes: [
    // ─── SCENE 1: HOOK (0–120, 0–4s) ─────────────────────────────────
    {
      id: "h_scene_1_hook",
      title: "HOOK",
      titleEnglish: "THE HOOK",
      timecode: "12:07 AM",
      startFrame: 0,
      durationFrames: 120,
      audioFile: "audio/hindi/h_scene_1_hook.mp3",
      captions: [
        {
          hindi: "मॉल बंद था...",
          english: "The mall was closed...",
          highlightWords: ["बंद"],
          highlightColor: "red",
          startFrame: 0,
          durationFrames: 60,
        },
        {
          hindi: "फिर लिफ्ट किसने चलाई?",
          english: "So who activated the lift?",
          highlightWords: ["किसने"],
          highlightColor: "cyan",
          startFrame: 62,
          durationFrames: 58,
        },
      ],
    },

    // ─── SCENE 2: LOCKDOWN (120–480, 4–16s) ──────────────────────────
    {
      id: "h_scene_2_lockdown",
      title: "LOCKDOWN",
      titleEnglish: "TRAPPED",
      timecode: "12:07 AM",
      startFrame: 120,
      durationFrames: 360,
      audioFile: "audio/hindi/h_scene_2_lockdown.mp3",
      captions: [
        {
          hindi: "सिक्योरिटी गार्ड",
          english: "Security guard",
          highlightWords: ["सिक्योरिटी"],
          highlightColor: "white",
          startFrame: 120,
          durationFrames: 72,
        },
        {
          hindi: "भूल गया उसे।",
          english: "forgot him inside.",
          highlightWords: ["भूल"],
          highlightColor: "red",
          startFrame: 192,
          durationFrames: 72,
        },
        {
          hindi: "दरवाज़ा बंद था।",
          english: "Door was locked.",
          highlightWords: ["बंद"],
          highlightColor: "red",
          startFrame: 264,
          durationFrames: 72,
        },
        {
          hindi: "NO NETWORK",
          english: "No Signal",
          highlightWords: ["NO", "NETWORK"],
          highlightColor: "red",
          startFrame: 360,
          durationFrames: 120,
        },
      ],
    },

    // ─── SCENE 3: ELEVATOR (480–810, 16–27s) ─────────────────────────
    {
      id: "h_scene_3_elevator",
      title: "LIFT",
      titleEnglish: "THE ELEVATOR",
      timecode: "12:09 AM",
      startFrame: 480,
      durationFrames: 330,
      audioFile: "audio/hindi/h_scene_3_elevator.mp3",
      captions: [
        {
          hindi: "तभी... एक घंटी बजी।",
          english: "Then... a bell rang.",
          highlightWords: ["घंटी"],
          highlightColor: "cyan",
          startFrame: 480,
          durationFrames: 90,
        },
        {
          hindi: "लिफ्ट अपने आप चली।",
          english: "The lift moved on its own.",
          highlightWords: ["अपने", "आप"],
          highlightColor: "red",
          startFrame: 570,
          durationFrames: 90,
        },
        {
          hindi: "तीसरी मंज़िल पर रुकी।",
          english: "Stopped at the third floor.",
          highlightWords: ["तीसरी"],
          highlightColor: "gold",
          startFrame: 660,
          durationFrames: 90,
        },
        {
          hindi: "लिफ्ट खाली थी।",
          english: "The lift was empty.",
          highlightWords: ["खाली"],
          highlightColor: "cyan",
          startFrame: 750,
          durationFrames: 60,
        },
      ],
    },

    // ─── SCENE 4: ANNOUNCEMENT (810–1080, 27–36s) ────────────────────
    {
      id: "h_scene_4_announcement",
      title: "ANNOUNCEMENT",
      titleEnglish: "THE VOICE",
      timecode: "12:11 AM",
      startFrame: 810,
      durationFrames: 270,
      audioFile: "audio/hindi/h_scene_4_announcement.mp3",
      captions: [
        {
          hindi: "स्पीकर से आवाज़ आई...",
          english: "A voice came through the speaker...",
          highlightWords: ["आवाज़"],
          highlightColor: "cyan",
          startFrame: 810,
          durationFrames: 90,
        },
        {
          hindi: "\"आरव...\"",
          english: '"Aarav..."',
          highlightWords: ["आरव"],
          highlightColor: "gold",
          startFrame: 900,
          durationFrames: 60,
        },
        {
          hindi: "\"तुम अकेले नहीं हो।\"",
          english: '"You are not alone."',
          highlightWords: ["अकेले", "नहीं"],
          highlightColor: "red",
          startFrame: 960,
          durationFrames: 90,
        },
        {
          hindi: "लाइटें बुझने लगीं।",
          english: "The lights began switching off.",
          highlightWords: ["बुझने"],
          highlightColor: "red",
          startFrame: 1050,
          durationFrames: 60,
        },
      ],
    },

    // ─── SCENE 5: CCTV REVEAL (1080–1500, 36–50s) ────────────────────
    {
      id: "h_scene_5_cctv",
      title: "CCTV",
      titleEnglish: "THE REVEAL",
      timecode: "12:14 AM",
      startFrame: 1080,
      durationFrames: 420,
      audioFile: "audio/hindi/h_scene_5_cctv.mp3",
      captions: [
        {
          hindi: "आरव सिक्योरिटी रूम में घुसा।",
          english: "Aarav entered the security room.",
          highlightWords: ["सिक्योरिटी"],
          highlightColor: "white",
          startFrame: 1080,
          durationFrames: 90,
        },
        {
          hindi: "CCTV कैमरा — 07",
          english: "Camera 07",
          highlightWords: ["07"],
          highlightColor: "cyan",
          startFrame: 1170,
          durationFrames: 90,
        },
        {
          hindi: "वही गलियारा था।",
          english: "The same corridor.",
          highlightWords: ["वही"],
          highlightColor: "gold",
          startFrame: 1260,
          durationFrames: 90,
        },
        {
          hindi: "उसके पीछे...",
          english: "Behind him...",
          highlightWords: ["पीछे"],
          highlightColor: "red",
          startFrame: 1350,
          durationFrames: 60,
        },
        {
          hindi: "कोई खड़ा था।",
          english: "Someone was standing.",
          highlightWords: ["कोई"],
          highlightColor: "red",
          startFrame: 1410,
          durationFrames: 90,
        },
      ],
    },

    // ─── SCENE 6: TWIST (1500–1620, 50–54s) ─────────────────────────
    {
      id: "h_scene_6_twist",
      title: "TWIST",
      titleEnglish: "THE TWIST",
      timecode: "12:14 AM",
      startFrame: 1500,
      durationFrames: 120,
      audioFile: "audio/hindi/h_scene_6_twist.mp3",
      captions: [
        {
          hindi: "आरव ने पीछे देखा।",
          english: "Aarav looked behind.",
          highlightWords: ["पीछे"],
          highlightColor: "white",
          startFrame: 1500,
          durationFrames: 60,
        },
        {
          hindi: "कोई नहीं था।",
          english: "No one was there.",
          highlightWords: ["नहीं"],
          highlightColor: "red",
          startFrame: 1560,
          durationFrames: 60,
        },
      ],
    },

    // ─── SCENE 7: CLIFFHANGER (1620–1800, 54–60s) ───────────────────
    {
      id: "h_scene_7_cliffhanger",
      title: "CLIFFHANGER",
      titleEnglish: "THE CHOICE",
      timecode: "12:15 AM",
      startFrame: 1620,
      durationFrames: 180,
      audioFile: "audio/hindi/h_scene_7_cliffhanger.mp3",
      captions: [
        {
          hindi: "लिफ्ट की घंटी फिर बजी।",
          english: "The elevator bell rang again.",
          highlightWords: ["फिर"],
          highlightColor: "red",
          startFrame: 1620,
          durationFrames: 60,
        },
        {
          hindi: "फ्लोर: B1",
          english: "Floor: B1",
          highlightWords: ["B1"],
          highlightColor: "gold",
          startFrame: 1680,
          durationFrames: 60,
        },
        {
          hindi: "तुम क्या करते?",
          english: "What would you do?",
          highlightWords: ["क्या"],
          highlightColor: "cyan",
          startFrame: 1740,
          durationFrames: 60,
        },
      ],
    },
  ],
};

