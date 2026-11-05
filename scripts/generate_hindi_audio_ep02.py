"""
Hindi Narration Audio Generator — THE UNKNOWN CITY Series
Episode 02: "B1 Par Aarav Ka Intezar Kaun Kar Raha Tha?"

Calibrated precisely for a 60-second video (1800 frames):
  Scene 1 Hook: ~3.5s (0-4s scene)
  Scene 2 Branch A: ~7.0s (4-12s scene)
  Scene 2 Branch B: ~7.0s (4-12s scene)
  Scene 3 Basement: ~8.0s (12-22s scene)
  Scene 4 Register: ~8.0s (22-33s scene)
  Scene 5 CCTV Twist: ~11.0s (33-47s scene)
  Scene 6 Cliffhanger: ~8.0s (47-60s scene)

Total speech: ~45 seconds -> Leaving 15 seconds of pure tension & silence.
Zero voice overlap between scenes!
"""

import sys
import os
import json
import asyncio
from pathlib import Path

# Ensure UTF-8 output on Windows consoles
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DEFAULT_VOICE = "hi-IN-MadhurNeural"
RATE = "+0%"    # Standard natural speed (not slow) to prevent speech bleeding
PITCH = "-2Hz"

EP02_AUDIO_DIR = Path("public/audio/hindi/ep02")
EP02_AUDIO_DIR.mkdir(parents=True, exist_ok=True)

# Tight, cinematic, high-retention narration lines
HINDI_SCRIPT_EP02 = [
    {
        "id": "ep2_scene_1_hook",
        "title": "HOOK",
        "lines": [
            "B1 पर... कोई आरव का इंतज़ार कर रहा था।"
        ]
    },
    {
        "id": "ep2_scene_2_branch_a",
        "title": "BRANCH_A_CCTV",
        "lines": [
            "आरव सिक्योरिटी रूम में घुसा।",
            "कैमरे में दिखा... लिफ्ट B1 पर खुली है!",
            "और एक गुप्त रास्ता नीचे जा रहा था।"
        ]
    },
    {
        "id": "ep2_scene_2_branch_b",
        "title": "BRANCH_B_LIFT",
        "lines": [
            "आरव लिफ्ट में घुसा। दरवाज़े बंद।",
            "लिफ्ट सीधे B1 पर रुकी।",
            "और फुसफुसाहट आई: 'आरव... तुम वापस आ गए?'"
        ]
    },
    {
        "id": "ep2_scene_3_basement",
        "title": "BASEMENT_DISCOVERY",
        "lines": [
            "बेसमेंट में अजीब सन्नाटा था...",
            "जैसे यहाँ सालों से कोई इंसान नहीं आया।"
        ]
    },
    {
        "id": "ep2_scene_4_register",
        "title": "VISITOR_REGISTER",
        "lines": [
            "डेस्क पर पुराना रजिस्टर खुला था।",
            "नाम: आरव।",
            "तारीख़: सत्रह साल पहले!"
        ]
    },
    {
        "id": "ep2_scene_5_cctv",
        "title": "CCTV_TWIST",
        "lines": [
            "अचानक मॉनिटर चालू हुआ।",
            "स्क्रीन पर आरव के पीछे... कोई खड़ा था!",
            "उसने मुड़कर देखा... वहाँ कोई नहीं था!"
        ]
    },
    {
        "id": "ep2_scene_6_cliffhanger",
        "title": "CLIFFHANGER",
        "lines": [
            "मॉनिटर पर आया: अगला विज़िटर — आरव।",
            "फ़ोन पर मैसेज बजा: 'इस बार ऊपर मत जाना।'"
        ]
    }
]

async def generate_scene_audio(communicate_cls, scene, voice=DEFAULT_VOICE):
    scene_id = scene["id"]
    output_file = EP02_AUDIO_DIR / f"{scene_id}.mp3"
    full_text = " ".join(scene["lines"])

    print(f"Generating [{scene_id}] ({scene['title']}): '{full_text}'")

    communicate = communicate_cls(
        text=full_text,
        voice=voice,
        rate=RATE,
        pitch=PITCH
    )

    boundaries = []
    audio_data = bytearray()

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.extend(chunk["data"])
        elif chunk["type"] == "SentenceBoundary":
            boundaries.append({
                "offset": chunk["offset"],
                "duration": chunk["duration"],
                "text": chunk["text"]
            })

    with open(output_file, "wb") as f:
        f.write(audio_data)

    file_size = os.path.getsize(output_file)
    duration_sec = 0.0
    if boundaries:
        last = boundaries[-1]
        duration_sec = (last["offset"] + last["duration"]) / 10_000_000.0
    else:
        duration_sec = file_size / 6000.0

    print(f"  -> Saved: {output_file.name} ({duration_sec:.2f}s, {file_size} bytes)")

    return {
        "id": scene_id,
        "title": scene["title"],
        "audioFile": f"audio/hindi/ep02/{output_file.name}",
        "fullText": full_text,
        "durationSec": round(duration_sec, 2),
        "durationFrames": int(round(duration_sec * 30)),
        "sentenceCount": len(scene["lines"]),
        "boundaries": boundaries
    }

async def main():
    try:
        import edge_tts
    except ImportError:
        print("ERROR: edge-tts is not installed. Run: python -m pip install edge-tts")
        sys.exit(1)

    print("==================================================")
    print("THE UNKNOWN CITY — Episode 02 Audio Calibrated")
    print(f"Voice: {DEFAULT_VOICE} (Hindi Neural)")
    print("==================================================")

    manifest = {
        "series": "THE UNKNOWN CITY",
        "episode": 2,
        "titleHindi": "B1 पर आरव का इंतज़ार कौन कर रहा था?",
        "titleEnglish": "Who was waiting for Aarav at B1?",
        "voice": DEFAULT_VOICE,
        "scenes": []
    }

    for scene in HINDI_SCRIPT_EP02:
        meta = await generate_scene_audio(edge_tts.Communicate, scene)
        manifest["scenes"].append(meta)

    out_manifest = Path("src/hindi/ep02/narration_manifest_ep02.json")
    out_manifest.parent.mkdir(parents=True, exist_ok=True)
    with open(out_manifest, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\nManifest saved to: {out_manifest}")
    print("All Episode 02 audio calibrated and generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
