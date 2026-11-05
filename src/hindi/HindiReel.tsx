import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { episode1HindiConfig } from "./episodeConfig";
import { HScene1Hook } from "./scenes/HScene1Hook";
import { HScene2Lockdown } from "./scenes/HScene2Lockdown";
import { HScene3Elevator } from "./scenes/HScene3Elevator";
import { HScene4Announcement } from "./scenes/HScene4Announcement";
import { HScene5CCTV } from "./scenes/HScene5CCTV";
import { HScene6Twist } from "./scenes/HScene6Twist";
import { HScene7Cliffhanger } from "./scenes/HScene7Cliffhanger";

export const HindiReel: React.FC = () => {
  const { scenes, audio } = episode1HindiConfig;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#05080F",
        overflow: "hidden",
      }}
    >
      {/* Background mall ambience loop */}
      <Audio src={staticFile(audio.mallAmbience)} volume={0.18} loop />

      {/* Synchronized SFX elements */}
      <Sequence from={15} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx/elevator_bell.wav")} volume={0.8} />
      </Sequence>

      <Sequence from={495} durationInFrames={120}>
        <Audio src={staticFile("audio/sfx/elevator_motor.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={495} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx/elevator_bell.wav")} volume={0.7} />
      </Sequence>

      <Sequence from={820} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx/announcement_static.wav")} volume={0.65} />
      </Sequence>

      <Sequence from={1095} durationInFrames={90}>
        <Audio src={staticFile("audio/sfx/footsteps.wav")} volume={0.55} />
      </Sequence>

      <Sequence from={1350} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx/cctv_glitch.wav")} volume={0.75} />
      </Sequence>

      <Sequence from={1500} durationInFrames={60}>
        <Audio src={staticFile("audio/sfx/suspense_impact.wav")} volume={0.75} />
      </Sequence>

      <Sequence from={1620} durationInFrames={180}>
        <Audio src={staticFile(audio.heartbeat)} volume={0.6} />
      </Sequence>
      <Sequence from={1635} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx/elevator_bell.wav")} volume={0.9} />
      </Sequence>

      {/* 7 Modular Scenes */}
      <Sequence from={scenes[0].startFrame} durationInFrames={scenes[0].durationFrames} name={scenes[0].id}>
        <Audio src={staticFile(scenes[0].audioFile)} volume={1.0} />
        <HScene1Hook scene={scenes[0]} />
      </Sequence>

      <Sequence from={scenes[1].startFrame} durationInFrames={scenes[1].durationFrames} name={scenes[1].id}>
        <Audio src={staticFile(scenes[1].audioFile)} volume={1.0} />
        <HScene2Lockdown scene={scenes[1]} />
      </Sequence>

      <Sequence from={scenes[2].startFrame} durationInFrames={scenes[2].durationFrames} name={scenes[2].id}>
        <Audio src={staticFile(scenes[2].audioFile)} volume={1.0} />
        <HScene3Elevator scene={scenes[2]} />
      </Sequence>

      <Sequence from={scenes[3].startFrame} durationInFrames={scenes[3].durationFrames} name={scenes[3].id}>
        <Audio src={staticFile(scenes[3].audioFile)} volume={1.0} />
        <HScene4Announcement scene={scenes[3]} />
      </Sequence>

      <Sequence from={scenes[4].startFrame} durationInFrames={scenes[4].durationFrames} name={scenes[4].id}>
        <Audio src={staticFile(scenes[4].audioFile)} volume={1.0} />
        <HScene5CCTV scene={scenes[4]} />
      </Sequence>

      <Sequence from={scenes[5].startFrame} durationInFrames={scenes[5].durationFrames} name={scenes[5].id}>
        <Audio src={staticFile(scenes[5].audioFile)} volume={1.0} />
        <HScene6Twist scene={scenes[5]} />
      </Sequence>

      <Sequence from={scenes[6].startFrame} durationInFrames={scenes[6].durationFrames} name={scenes[6].id}>
        <Audio src={staticFile(scenes[6].audioFile)} volume={1.0} />
        <HScene7Cliffhanger scene={scenes[6]} />
      </Sequence>
    </div>
  );
};

