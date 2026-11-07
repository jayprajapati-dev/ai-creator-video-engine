import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img
} from "remotion";
import { COLORS } from "../designSystem/colors";
import { FONTS } from "../designSystem/typography";

interface RapBar {
  num: number;
  rhymeA: string;
  rhymeB: string;
  highlight: string;
  tag: string;
  durationFrames: number;
  audioFile: string;
}

const BARS: RapBar[] = [
  {
    num: 1,
    rhymeA: "Frontend me ghanto jo dimaag tu khapata tha...",
    rhymeB: "",
    highlight: "HOURS WASTED",
    tag: "BAR 01",
    durationFrames: 96,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_1.mp3"
  },
  {
    num: 2,
    rhymeA: "Bug dhoondh dhoondh ke jo raat bhar jagata tha!",
    rhymeB: "",
    highlight: "NIGHT CODER",
    tag: "BAR 02",
    durationFrames: 94,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_2.mp3"
  },
  {
    num: 3,
    rhymeA: "Next.js ka scene dekh, pal me badal gaya!",
    rhymeB: "",
    highlight: "NEXT.JS REVOLUTION",
    tag: "BAR 03",
    durationFrames: 104,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_3.mp3"
  },
  {
    num: 4,
    rhymeA: "V0 pe prompt mara, website nikal gaya!",
    rhymeB: "",
    highlight: "PROMPT TO APP",
    tag: "BAR 04",
    durationFrames: 104,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_4.mp3"
  },
  {
    num: 5,
    rhymeA: "Clean Tailwind CSS, Shadcn UI components!",
    rhymeB: "",
    highlight: "CLEAN PRODUCTION",
    tag: "BAR 05",
    durationFrames: 116,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_5.mp3"
  },
  {
    num: 6,
    rhymeA: "Minute-on me beat kare saare opponents!",
    rhymeB: "",
    highlight: "10X SPEED",
    tag: "BAR 06",
    durationFrames: 90,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_6.mp3"
  },
  {
    num: 7,
    rhymeA: "DeepSeek ka beast dekh, 671 Billion!",
    rhymeB: "",
    highlight: "OPEN WEIGHTS BEAST",
    tag: "BAR 07",
    durationFrames: 124,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_7.mp3"
  },
  {
    num: 8,
    rhymeA: "Comment karo RAP, link inbox me instant!",
    rhymeB: "",
    highlight: "COMMENT 'RAP' FOR LINK",
    tag: "DROP THE MIC",
    durationFrames: 112,
    audioFile: "audio/ctrl_wala/experiments/rap_bar_8.mp3"
  }
];

export const TOTAL_RAP_FRAMES = BARS.reduce((acc, b) => acc + b.durationFrames, 0);

export const TechRapReel: React.FC = () => {
  const frame = useCurrentFrame();

  const beatFrames = 18.94;
  const beatProgress = (frame % beatFrames) / beatFrames;
  const bassPump = Math.exp(-beatProgress * 4.5);
  const containerScale = 1.0 + bassPump * 0.02;

  let currentStartFrame = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg.base,
        transform: `scale(${containerScale})`,
        transformOrigin: "center center",
        overflow: "hidden",
        fontFamily: FONTS.display,
        color: "#FFFFFF"
      }}
    >
      <Audio
        src={staticFile("audio/ctrl_wala/experiments/hiphop_95bpm_beat.wav")}
        volume={0.38}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.8
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              border: `2px solid ${COLORS.cyan.pure}`,
              overflow: "hidden",
              boxShadow: `0 0 16px ${COLORS.cyan.glowStrong}`
            }}
          >
            <Img
              src={staticFile("ctrl_wala/logo.png")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.amber.bright, letterSpacing: "0.08em" }}>
              CTRL_WALA
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.15em" }}>
              TECH • RAP • CYPHER
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(239, 68, 68, 0.2)",
            border: "1px solid #EF4444",
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 800,
            color: "#EF4444",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 0 14px rgba(239, 68, 68, 0.4)"
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              transform: `scale(${1 + bassPump * 0.5})`
            }}
          />
          95 BPM FLOW
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 260,
          left: "50%",
          transform: `translateX(-50%) translateY(${Math.sin(frame * 0.15) * 8}px) scale(${1.0 + bassPump * 0.06})`,
          zIndex: 40,
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            margin: "0 auto",
            borderRadius: "50%",
            border: `4px solid ${COLORS.violet.pure}`,
            boxShadow: `0 0 35px ${COLORS.violet.glowStrong}`,
            overflow: "hidden",
            backgroundColor: "#0D1117"
          }}
        >
          <Img
            src={staticFile("ctrl_wala/logo.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {BARS.map((bar) => {
        const fromFrame = currentStartFrame;
        currentStartFrame += bar.durationFrames;

        return (
          <Sequence
            key={bar.num}
            from={fromFrame}
            durationInFrames={bar.durationFrames}
          >
            <Audio src={staticFile(bar.audioFile)} volume={1.0} />
            <BarCard bar={bar} />
          </Sequence>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 6,
          height: 60,
          zIndex: 90
        }}
      >
        {Array.from({ length: 28 }).map((_, i) => {
          const waveHeight = interpolate(
            Math.sin(frame * 0.3 + i * 0.4),
            [-1, 1],
            [10, 52]
          ) * (0.6 + bassPump * 0.6);

          return (
            <div
              key={i}
              style={{
                width: 8,
                height: waveHeight,
                borderRadius: 4,
                backgroundColor: i % 2 === 0 ? COLORS.amber.bright : COLORS.cyan.pure,
                boxShadow: `0 0 8px ${i % 2 === 0 ? COLORS.amber.bright : COLORS.cyan.pure}88`
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const BarCard: React.FC<{ bar: RapBar }> = ({ bar }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 220 }
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 620,
        left: 50,
        right: 50,
        transform: `translateY(${(1 - entrance) * 60}px) scale(${entrance})`,
        opacity: entrance,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg, #8B5CF6, #3B82F6)",
          padding: "6px 20px",
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: "0.15em",
          color: "#FFFFFF",
          marginBottom: 16,
          boxShadow: "0 0 16px rgba(139, 92, 246, 0.6)"
        }}
      >
        {bar.tag}
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: `2px solid ${COLORS.amber.bright}`,
          borderRadius: 24,
          padding: "36px 28px",
          textAlign: "center",
          boxShadow: `0 0 40px rgba(252, 211, 77, 0.25), 0 16px 32px rgba(0,0,0,0.6)`,
          backdropFilter: "blur(12px)"
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 900,
            lineHeight: 1.3,
            color: "#FFFFFF",
            marginBottom: 20,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)"
          }}
        >
          {bar.rhymeA}
        </div>

        <div
          style={{
            display: "inline-block",
            backgroundColor: COLORS.cyan.dim,
            border: `1px solid ${COLORS.cyan.pure}`,
            padding: "8px 24px",
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 800,
            color: COLORS.cyan.pure,
            letterSpacing: "0.06em",
            boxShadow: `0 0 14px ${COLORS.cyan.glow}`
          }}
        >
          {bar.highlight}
        </div>
      </div>
    </div>
  );
};
