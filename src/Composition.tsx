import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { EpisodeConfig } from "./types/story";
import { episode1Config } from "./config/episode1";
import { Scene1Hook } from "./components/scenes/Scene1Hook";
import { Scene2Mall } from "./components/scenes/Scene2Mall";
import { Scene3Blackout } from "./components/scenes/Scene3Blackout";
import { Scene4Discovery } from "./components/scenes/Scene4Discovery";
import { Scene5Decision } from "./components/scenes/Scene5Decision";
import { Scene6Cliffhanger } from "./components/scenes/Scene6Cliffhanger";

interface StoryReelProps {
  config?: EpisodeConfig;
}

export const StoryReel: React.FC<StoryReelProps> = ({
  config = episode1Config,
}) => {
  const { scenes, audio } = config;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#F7F4EE",
        overflow: "hidden",
      }}
    >
      {/* 1. AMBIENT SUSPENSE DRONE (Plays across entire video) */}
      {audio.ambientDrone && (
        <Audio
          src={staticFile(audio.ambientDrone)}
          volume={0.25}
          loop
        />
      )}

      {/* 2. PROCEDURAL SOUND EFFECTS */}
      {/* Shutter slam impact at frame 15 */}
      <Sequence from={15} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx/shutter_slam.wav")} volume={0.8} />
      </Sequence>

      {/* Heartbeat pulse in climax scene (from frame 1560) */}
      <Sequence from={1560} durationInFrames={240}>
        <Audio src={staticFile("audio/sfx/heartbeat.wav")} volume={0.65} />
      </Sequence>

      {/* Tension riser building up to the choice (from frame 1710) */}
      <Sequence from={1710} durationInFrames={90}>
        <Audio src={staticFile("audio/sfx/riser.wav")} volume={0.5} />
      </Sequence>

      {/* 3. SCENE SEQUENCES (0 to 1800 frames) */}
      {/* SCENE 1: THE LOCKDOWN HOOK (0-120 frames, 0-4s) */}
      <Sequence
        name="Scene 1: Hook"
        from={scenes[0].startFrame}
        durationInFrames={scenes[0].durationFrames}
      >
        {scenes[0].audioFile && (
          <Audio src={staticFile(scenes[0].audioFile)} volume={1.0} />
        )}
        <Scene1Hook scene={scenes[0]} />
      </Sequence>

      {/* SCENE 2: EMPTY MALL ATRIUM (120-360 frames, 4-12s) */}
      <Sequence
        name="Scene 2: Mall Atrium"
        from={scenes[1].startFrame}
        durationInFrames={scenes[1].durationFrames}
      >
        {scenes[1].audioFile && (
          <Audio src={staticFile(scenes[1].audioFile)} volume={1.0} />
        )}
        <Scene2Mall scene={scenes[1]} />
      </Sequence>

      {/* SCENE 3: ONE PERCENT & BLACKOUT (360-750 frames, 12-25s) */}
      <Sequence
        name="Scene 3: Blackout"
        from={scenes[2].startFrame}
        durationInFrames={scenes[2].durationFrames}
      >
        {scenes[2].audioFile && (
          <Audio src={staticFile(scenes[2].audioFile)} volume={1.0} />
        )}
        <Scene3Blackout scene={scenes[2]} />
      </Sequence>

      {/* SCENE 4: FLOOR THREE DISCOVERY (750-1200 frames, 25-40s) */}
      <Sequence
        name="Scene 4: Discovery"
        from={scenes[3].startFrame}
        durationInFrames={scenes[3].durationFrames}
      >
        {scenes[3].audioFile && (
          <Audio src={staticFile(scenes[3].audioFile)} volume={1.0} />
        )}
        <Scene4Discovery scene={scenes[3]} />
      </Sequence>

      {/* SCENE 5: SURVEILLANCE & THREAT (1200-1560 frames, 40-52s) */}
      <Sequence
        name="Scene 5: Threat"
        from={scenes[4].startFrame}
        durationInFrames={scenes[4].durationFrames}
      >
        {scenes[4].audioFile && (
          <Audio src={staticFile(scenes[4].audioFile)} volume={1.0} />
        )}
        <Scene5Decision scene={scenes[4]} />
      </Sequence>

      {/* SCENE 6: CLIFFHANGER & VOTING (1560-1800 frames, 52-60s) */}
      <Sequence
        name="Scene 6: Cliffhanger & Vote"
        from={scenes[5].startFrame}
        durationInFrames={scenes[5].durationFrames}
      >
        {scenes[5].audioFile && (
          <Audio src={staticFile(scenes[5].audioFile)} volume={1.0} />
        )}
        <Scene6Cliffhanger scene={scenes[5]} />
      </Sequence>
    </div>
  );
};
