"""
Hindi Narration Audio Generator — THE UNKNOWN CITY Series
Episode 01: "Mall Band Tha... Phir Lift Kisne Chalayi?"

Uses Microsoft Edge TTS: hi-IN-MadhurNeural (Free, natural Hindi male voice)
Saves scene-wise audio + timing manifest into public/audio/hindi/
"""

import sys
import os
import json
import asyncio
from pathlib import Path

DEFAULT_VOICE = "hi-IN-MadhurNeural"
RATE = "-5%"   # Slightly slower for suspense and clarity
PITCH = "-3Hz" # Slightly lower for cinematic gravity

# Scene narration lines — natural Hindi, present-tense storytelling
HINDI_SCRIPT = [
    {
        "id": "h_scene_1_hook",
        "sceneIndex": 0,
        "title": "HOOK",
        "startFrame": 0,
        "durationFrames": 120,  # 0-4s
        "lines": [
            "मॉल बंद था...",
            "फिर ये लिफ्ट किसने चलाई?"
        ]
    },
    {
        "id": "h_scene_2_lockdown",
        "sceneIndex": 1,
        "title": "LOCKDOWN",
        "startFrame": 120,
        "durationFrames": 240,  # 4-12s
        "lines": [
            "आरव को लगा, सिक्योरिटी गार्ड उसे बाहर निकालना भूल गया।",
            "उसने दरवाज़ा खींचा। बंद था।",
            "फ़ोन उठाया। नो नेटवर्क।"
        ]
    },
    {
        "id": "h_scene_3_elevator",
        "sceneIndex": 2,
        "title": "LIFT",
        "startFrame": 360,
        "durationFrames": 300,  # 12-22s
        "lines": [
            "तभी... एक घंटी बजी।",
            "सामने की लिफ्ट अपने आप चलने लगी।",
            "G... एक... दो... तीन।",
            "दरवाज़े खुले। लिफ्ट खाली थी।"
        ]
    },
    {
        "id": "h_scene_4_announcement",
        "sceneIndex": 3,
        "title": "ANNOUNCEMENT",
        "startFrame": 660,
        "durationFrames": 330,  # 22-33s
        "lines": [
            "फिर स्पीकर से आवाज़ आई...",
            "\"आरव...\"",
            "\"तुम वहाँ अकेले नहीं हो।\"",
            "एक-एक करके लाइटें बुझने लगीं।"
        ]
    },
    {
        "id": "h_scene_5_cctv",
        "sceneIndex": 4,
        "title": "CCTV",
        "startFrame": 990,
        "durationFrames": 420,  # 33-47s
        "lines": [
            "आरव सिक्योरिटी रूम में घुसा।",
            "उसने CCTV कैमरा सात खोला।",
            "स्क्रीन पर... वही गलियारा था।",
            "और उसके पीछे... कोई खड़ा था।"
        ]
    },
    {
        "id": "h_scene_6_twist",
        "sceneIndex": 5,
        "title": "TWIST",
        "startFrame": 1410,
        "durationFrames": 210,  # 47-54s
        "lines": [
            "आरव ने पीछे देखा।",
            "कोई नहीं था।",
            "उसने स्क्रीन देखी... वो परछाईं और क़रीब आ गई थी।"
        ]
    },
    {
        "id": "h_scene_7_cliffhanger",
        "sceneIndex": 6,
        "title": "CLIFFHANGER",
        "startFrame": 1620,
        "durationFrames": 180,  # 54-60s
        "lines": [
            "लिफ्ट की घंटी फिर बजी।",
            "फ्लोर: B1.",
            "तुम होते तो क्या करते? A या B?"
        ]
    }
]

def check_dependencies():
    try:
        import edge_tts
        return edge_tts
    except ImportError:
        print("\n" + "="*60)
        print("ERROR: edge-tts not installed!")
        print("Run: python -m pip install edge-tts")
        print("="*60 + "\n")
        sys.exit(1)

async def generate_scene_audio(edge_tts, scene, output_dir: Path):
    full_text = " ".join(scene["lines"])
    scene_id = scene["id"]
    audio_path = output_dir / f"{scene_id}.mp3"

    communicate = edge_tts.Communicate(
        text=full_text,
        voice=DEFAULT_VOICE,
        rate=RATE,
        pitch=PITCH
    )

    audio_chunks = []
    sentence_boundaries = []

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_chunks.append(chunk["data"])
        elif chunk["type"] == "SentenceBoundary":
            start_ms = chunk["offset"] / 10000
            duration_ms = chunk["duration"] / 10000
            sentence_boundaries.append({
                "text": chunk["text"],
                "startMs": round(start_ms),
                "endMs": round(start_ms + duration_ms)
            })

    with open(audio_path, "wb") as f:
        for chunk in audio_chunks:
            f.write(chunk)

    total_ms = sentence_boundaries[-1]["endMs"] if sentence_boundaries else 0
    print(f"  Generated: {scene_id}.mp3  (~{total_ms/1000:.1f}s, {len(sentence_boundaries)} sentences)")

    return {
        "sceneId": scene_id,
        "audioFile": f"audio/hindi/{scene_id}.mp3",
        "fullText": full_text,
        "sentences": sentence_boundaries,
        "totalMs": total_ms
    }

async def main():
    edge_tts = check_dependencies()

    root = Path(__file__).resolve().parent.parent
    hindi_audio_dir = root / "public" / "audio" / "hindi"
    hindi_audio_dir.mkdir(parents=True, exist_ok=True)

    config_dir = root / "src" / "hindi"
    config_dir.mkdir(parents=True, exist_ok=True)

    print(f"Voice: {DEFAULT_VOICE} | Rate: {RATE} | Pitch: {PITCH}")
    print(f"Output: {hindi_audio_dir}\n")

    results = []
    for scene in HINDI_SCRIPT:
        res = await generate_scene_audio(edge_tts, scene, hindi_audio_dir)
        results.append(res)

    # Save manifest
    manifest_path = root / "src" / "hindi" / "narration_manifest_hindi.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\nManifest saved: {manifest_path}")
    print("Hindi audio generation complete!")

    # Print timing summary for calibration
    print("\n--- Scene Timing Summary ---")
    for r in results:
        print(f"  {r['sceneId']}: {r['totalMs']}ms (~{r['totalMs']/1000:.1f}s)")

if __name__ == "__main__":
    asyncio.run(main())

