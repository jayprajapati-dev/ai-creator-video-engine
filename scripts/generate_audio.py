"""
Audio and Subtitle Generation Script for Instagram Reel Story Engine
Uses Microsoft Edge TTS (Free, high-quality neural voice)
Generates synchronized audio files and JSON caption timing data.
"""

import sys
import os
import json
import asyncio
from pathlib import Path

# Target voice - crisp, dramatic, natural English storyteller
DEFAULT_VOICE = "en-US-ChristopherNeural"

# Episode 1 Story Script - Second-person, present tense, short 4-5 word sentences
EPISODE_1_SCRIPT = [
    {
        "id": "scene_1_hook",
        "sceneIndex": 0,
        "title": "THE LOCKDOWN",
        "startFrame": 0,
        "durationFrames": 120, # 4s
        "lines": [
            "The iron gate slams shut.",
            "Heavy padlocks lock outside.",
            "You are trapped inside."
        ]
    },
    {
        "id": "scene_2_mall",
        "sceneIndex": 1,
        "title": "EMPTY ATRIUM",
        "startFrame": 120,
        "durationFrames": 240, # 8s
        "lines": [
            "All escalators grind dead.",
            "Every neon sign cuts off.",
            "You stayed too late.",
            "Just one more game.",
            "Now nobody hears you."
        ]
    },
    {
        "id": "scene_3_blackout",
        "sceneIndex": 2,
        "title": "ONE PERCENT",
        "startFrame": 360,
        "durationFrames": 390, # 13s
        "lines": [
            "You pull out your phone.",
            "One percent battery remains.",
            "Zero cell service bars.",
            "The screen dies completely.",
            "Main power grid cuts out.",
            "Total darkness swallows you."
        ]
    },
    {
        "id": "scene_4_discovery",
        "sceneIndex": 3,
        "title": "FLOOR THREE",
        "startFrame": 750,
        "durationFrames": 450, # 15s
        "lines": [
            "Heavy boots thud upstairs.",
            "Someone is pacing above.",
            "You turn on flashlight.",
            "Floor three stands forbidden.",
            "A rusted door creaks open.",
            "The hallway breathes cold."
        ]
    },
    {
        "id": "scene_5_decision",
        "sceneIndex": 4,
        "title": "SURVEILLANCE ROOM",
        "startFrame": 1200,
        "durationFrames": 360, # 12s
        "lines": [
            "You slip inside quietly.",
            "Old security monitors glow.",
            "One camera begins turning.",
            "The lens tracks you.",
            "A dark silhouette approaches."
        ]
    },
    {
        "id": "scene_6_cliffhanger",
        "sceneIndex": 5,
        "title": "HIDE OR RUN",
        "startFrame": 1560,
        "durationFrames": 240, # 8s
        "lines": [
            "Footsteps sprint outside now.",
            "You have three seconds.",
            "Do you HIDE inside?",
            "Or RUN for exits?",
            "Vote in comments now!"
        ]
    }
]

def check_dependencies():
    """Verify python environment and edge-tts installation"""
    try:
        import edge_tts
        return edge_tts
    except ImportError:
        print("\n" + "="*60)
        print("ERROR: edge-tts package is not installed!")
        print("To install edge-tts, run:")
        print("    python -m pip install edge-tts")
        print("="*60 + "\n")
        sys.exit(1)

async def generate_scene_audio(edge_tts, scene, output_dir: Path):
    full_text = " ".join(scene["lines"])
    scene_id = scene["id"]
    audio_filename = f"{scene_id}.mp3"
    audio_path = output_dir / audio_filename

    communicate = edge_tts.Communicate(
        text=full_text,
        voice=DEFAULT_VOICE,
        rate="+5%",   # Slightly brisk for high engagement
        pitch="+0Hz"
    )

    audio_chunks = []
    sentence_boundaries = []

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_chunks.append(chunk["data"])
        elif chunk["type"] == "SentenceBoundary":
            # offset and duration in 100ns units -> convert to ms
            start_ms = chunk["offset"] / 10000
            duration_ms = chunk["duration"] / 10000
            end_ms = start_ms + duration_ms
            sentence_boundaries.append({
                "text": chunk["text"],
                "startMs": round(start_ms),
                "endMs": round(end_ms)
            })

    # Save audio file
    with open(audio_path, "wb") as f:
        for chunk in audio_chunks:
            f.write(chunk)

    print(f"Generated: {audio_filename} ({len(sentence_boundaries)} sentences)")
    return {
        "sceneId": scene_id,
        "audioFile": f"audio/{audio_filename}",
        "fullText": full_text,
        "sentences": sentence_boundaries
    }

async def generate_full_narration(edge_tts, scenes, output_dir: Path):
    """Generate a combined master narration audio track for simple playback"""
    combined_lines = []
    for s in scenes:
        combined_lines.extend(s["lines"])
    full_story = " ... ".join(combined_lines)

    audio_path = output_dir / "narration_full.mp3"
    communicate = edge_tts.Communicate(
        text=full_story,
        voice=DEFAULT_VOICE,
        rate="+4%",
        pitch="+0Hz"
    )

    audio_chunks = []
    sentences = []

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_chunks.append(chunk["data"])
        elif chunk["type"] == "SentenceBoundary":
            start_ms = chunk["offset"] / 10000
            duration_ms = chunk["duration"] / 10000
            sentences.append({
                "text": chunk["text"],
                "startMs": round(start_ms),
                "endMs": round(start_ms + duration_ms)
            })

    with open(audio_path, "wb") as f:
        for chunk in audio_chunks:
            f.write(chunk)

    print(f"Generated master narration: narration_full.mp3")

async def main():
    edge_tts = check_dependencies()

    project_root = Path(__file__).resolve().parent.parent
    audio_dir = project_root / "public" / "audio"
    audio_dir.mkdir(parents=True, exist_ok=True)

    config_dir = project_root / "src" / "config"
    config_dir.mkdir(parents=True, exist_ok=True)

    print(f"Using voice: {DEFAULT_VOICE}")
    print(f"Generating audio for 6 scenes into: {audio_dir}")

    results = []
    for scene in EPISODE_1_SCRIPT:
        res = await generate_scene_audio(edge_tts, scene, audio_dir)
        results.append(res)

    await generate_full_narration(edge_tts, EPISODE_1_SCRIPT, audio_dir)

    # Save timing manifest to src/config/narration_manifest.json
    manifest_path = config_dir / "narration_manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\nManifest saved to: {manifest_path}")
    print("Edge TTS Audio generation complete!")

if __name__ == "__main__":
    asyncio.run(main())

