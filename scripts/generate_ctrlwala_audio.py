"""
CTRL_WALA Audio & Narration Engine — Version 3.0 (Native Word Phonetics & Zero Letter-Spelling)
Fixes:
  - Technical terms ("DeepSeek", "Claude", "OpenAI", "Next.js", "GPT-4o", "V0") are written in
    Devanagari phonetics for TTS so Edge TTS NEVER spells them letter-by-letter (D-E-E-P-S-E-E-K)!
  - DisplayText contains the high-contrast English words for on-screen kinetic captions.
  - Generates exact audio durations and timing manifests.
"""

import os
import sys
import json
import math
import wave
import struct
import random
import asyncio
from pathlib import Path
import edge_tts

# Import our speech normalizer
from speech_normalizer import normalize_for_speech, TECH_PHONETIC_MAP, normalize_numbers

SAMPLE_RATE = 44100
FPS = 30
OUTPUT_DIR = Path("d:/my-series/public/audio/ctrl_wala")
SFX_DIR = OUTPUT_DIR / "sfx"

# Natural, conversational creator delivery (calibrated for viral tech reels)
VOICE = "hi-IN-MadhurNeural"
RATE = "+18%"
PITCH = "+0Hz"

def write_wav(path, samples):
    with wave.open(str(path), 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw = bytearray()
        for s in samples:
            val = max(-32767, min(32767, int(s * 32767)))
            raw.extend(struct.pack('<h', val))
        wf.writeframes(raw)

def generate_sfx():
    SFX_DIR.mkdir(parents=True, exist_ok=True)
    
    # 1. Cyber Whoosh (Fast scene wipe)
    n = int(SAMPLE_RATE * 0.35)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.sin(math.pi * (i / n)) ** 2
        f = 220 + 1200 * (i / n)
        noise = (random.random() * 2 - 1) * 0.3
        tone = math.sin(2 * math.pi * f * t) * 0.7
        samples.append((tone + noise) * env * 0.8)
    write_wav(SFX_DIR / "whoosh.wav", samples)
    
    # 2. Keyboard Tap (Mechanical switch clack)
    n = int(SAMPLE_RATE * 0.06)
    samples = []
    for i in range(n):
        env = math.exp(-i / (SAMPLE_RATE * 0.012))
        f = 2400 + 500 * (random.random() - 0.5)
        click = math.sin(2 * math.pi * f * (i / SAMPLE_RATE))
        noise = (random.random() * 2 - 1) * 0.6
        samples.append((click * 0.5 + noise * 0.5) * env * 0.85)
    write_wav(SFX_DIR / "key_tap.wav", samples)
    
    # 3. Cyber Impact / Sub Bass Drop (Punchy Hook)
    n = int(SAMPLE_RATE * 0.75)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 5.0)
        f = 160 * math.exp(-t * 7) + 50
        sub = math.sin(2 * math.pi * f * t)
        distortion = math.tanh(sub * 2.2)
        samples.append(distortion * env * 0.9)
    write_wav(SFX_DIR / "cyber_impact.wav", samples)

    # 4. Success Chime / UI Pop
    n = int(SAMPLE_RATE * 0.6)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env1 = math.exp(-t * 6.0)
        env2 = math.exp(-max(0.0, t - 0.1) * 5.0) if t >= 0.1 else 0.0
        chime1 = math.sin(2 * math.pi * 1046.5 * t) * env1
        chime2 = math.sin(2 * math.pi * 1318.5 * t) * env2
        samples.append((chime1 * 0.5 + chime2 * 0.6) * 0.75)
    write_wav(SFX_DIR / "success_chime.wav", samples)

    # 5. UI Pop / Click sound (badge entrance)
    n = int(SAMPLE_RATE * 0.08)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 50)
        pop = math.sin(2 * math.pi * 1200 * math.exp(-t * 30) * t)
        samples.append(pop * env * 0.8)
    write_wav(SFX_DIR / "ui_pop.wav", samples)

    # 6. Tech Synth Pulse / Background Bed (seamless 10s loop)
    n = int(SAMPLE_RATE * 10.0)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        beat_phase = (t * 2.0) % 1.0
        kick_env = math.exp(-beat_phase * 14.0)
        kick_freq = 65 * math.exp(-beat_phase * 22.0) + 42
        kick = math.sin(2 * math.pi * kick_freq * beat_phase) * kick_env * 0.5
        
        pad = (
            math.sin(2 * math.pi * 73.42 * t) * 0.10 +
            math.sin(2 * math.pi * 110.00 * t) * 0.07 +
            math.sin(2 * math.pi * 174.61 * t) * 0.05
        )
        hat_phase = (t * 4.0) % 1.0
        hat_env = math.exp(-hat_phase * 45.0)
        hat = (random.random() * 2 - 1) * hat_env * 0.07
        
        samples.append(kick + pad + hat)
    write_wav(SFX_DIR / "tech_beat_loop.wav", samples)
    print("Generated all procedural tech SFX.")

# Audio scripts:
# 'spokenText' has natural Devanagari phonetics for edge-tts (e.g. 'डीपसीक' so it NEVER spells D-E-E-P-S-E-E-K)
# 'displayText' is rendered on screen with high-CTR styling
SCRIPTS = {
    "deepseek_vs_gpt4o": [
        {
            "id": "scene_1_hook",
            "spokenText": "ओपन एआई का खेल खत्म? डीपसीक वी थ्री ने एआई की पूरी दुनिया को हिला दिया है!",
            "displayText": "OpenAI का खेल खत्म? DeepSeek V3 ने AI की पूरी दुनिया को हिला दिया है!",
            "label": "SHOCKING BREAKTHROUGH"
        },
        {
            "id": "scene_2_split_compare",
            "spokenText": "जीपीटी फोर-ओ का वन मिलियन टोकन्स टू पॉइंट फिफ्टी डॉलर्स का है, जबकि डीपसीक सिर्फ फोर्टीन सेंट्स! यानी पूरे नाइन्टी फाइव परसेंट सस्ता!",
            "displayText": "GPT-4o का 1M Tokens $2.50 का है, जबकि DeepSeek सिर्फ $0.14! यानी पूरे 95% सस्ता!",
            "label": "COST COMPARISON"
        },
        {
            "id": "scene_3_benchmarks",
            "spokenText": "कोडिंग बेंचमार्क्स में सिक्स हंड्रेड सेवेंटी वन बिलियन पैरामीटर्स का ये बीस्ट जीपीटी फोर-ओ और क्लाउड थ्री पॉइंट फाइव को बराबर टक्कर दे रहा है!",
            "displayText": "Coding benchmarks में 671B parameters का ये beast GPT-4o और Claude 3.5 को बराबर टक्कर दे रहा है!",
            "label": "ACCURACY BENCHMARK"
        },
        {
            "id": "scene_4_mascot_verdict",
            "spokenText": "और सबसे बड़ी बात—यह पूरी तरह ओपन वेट्स है! अपने लोकल सर्वर पर बिना किसी एपीआई कॉस्ट के रन करो।",
            "displayText": "और सबसे बड़ी बात—यह पूरी तरह Open Weights है! अपने लोकल सर्वर पर बिना API कॉस्ट के रन करो।",
            "label": "CTRL WALA VERDICT"
        },
        {
            "id": "scene_5_cta",
            "spokenText": "कमेंट करो डीपसीक, और मैं तुम्हें इसका लोकल सेटअप गाइड और एपीआई कीज का लिंक तुरंत डीएम कर दूंगा!",
            "displayText": "Comment करो DEEPSEEK, और मैं तुम्हें इसका Local Setup Guide और API keys तुरंत DM कर दूंगा!",
            "label": "CALL TO ACTION"
        }
    ],
    "v0_builder": [
        {
            "id": "scene_1_hook",
            "spokenText": "अब फ्रंटएंड डेवलपर्स की छुट्टी? सिर्फ एक प्रॉम्प्ट लिखो और पूरी नेक्स्ट जेएस वेबसाइट तैयार!",
            "displayText": "अब Frontend Developers की छुट्टी? सिर्फ एक Prompt लिखो और पूरी Next.js वेबसाइट तैयार!",
            "label": "FULL-STACK AI"
        },
        {
            "id": "scene_2_before_after",
            "spokenText": "एक रफ स्केच या टेक्स्ट प्रॉम्प्ट दो, और वी-ज़ीरो उसे कुछ ही सेकंड्स में फुल्ली फंक्शनल रिएक्ट ऐप में बदल देता है!",
            "displayText": "एक रफ sketch या text prompt दो, और V0 उसे कुछ ही seconds में fully functional React app में बदल देता है!",
            "label": "TRANSFORMATION"
        },
        {
            "id": "scene_3_browser_inspect",
            "spokenText": "क्लीन टेलविंड सीएसएस, ल्यूसाइड आइकन्स और शैडसीन यूआई कंपोनेंट्स! कोई स्पैगेटी कोड नहीं, बिल्कुल प्रोडक्शन रेडी!",
            "displayText": "Clean Tailwind CSS, Lucide Icons और Shadcn UI components! कोई spaghetti code नहीं, बिल्कुल production ready!",
            "label": "CODE QUALITY"
        },
        {
            "id": "scene_4_cta",
            "spokenText": "कमेंट करो वी-ज़ीरो, और मेरे टॉप फाइव सीक्रेट यूआई प्रॉम्प्ट्स तुम्हारे इनबॉक्स में!",
            "displayText": "Comment करो V0, और मेरे Top 5 secret UI prompts तुम्हारे inbox में!",
            "label": "GET PROMPTS"
        }
    ],
    "behind_scenes": [
        {
            "id": "scene_1_hook",
            "spokenText": "भाई! ये पूरा चैनल ना, एआई से बनता है! मैं बस डिसाइड करता हूँ। देखो कैसे!",
            "displayText": "Yeh poora channel AI se banta hai, main bas decide karta hoon!",
            "label": "BEHIND THE SCENES"
        },
        {
            "id": "scene_2_script",
            "spokenText": "स्टेप वन: स्क्रिप्ट! क्लॉड थ्री पॉइंट फाइव को प्रॉम्प्ट दिया, और सेकंड्स में पूरी स्क्रिप्ट रेडी!",
            "displayText": "Step 1: Script! Claude 3.5 Sonnet generates high-retention script",
            "label": "STEP 1 • SCRIPT"
        },
        {
            "id": "scene_3_voice",
            "spokenText": "स्टेप टू: आवाज़! ओपन एआई वॉइस मॉडल से टेक्स लिए। खराब टेक्स रिजेक्ट, और बेस्ट टेक सेलेक्ट!",
            "displayText": "Step 2: Awaaz! OpenAI model se 5 takes, reject bad & select best!",
            "label": "STEP 2 • AWAAZ"
        },
        {
            "id": "scene_4_caption",
            "spokenText": "स्टेप थ्री: कैप्शन्स! व्हिस्पर हर एक वर्ड का एग्ज़ैक्ट टाइम निकाल के देता है।",
            "displayText": "Step 3: Captions! Whisper word-level timestamps JSON",
            "label": "STEP 3 • CAPTIONS"
        },
        {
            "id": "scene_5_anim",
            "spokenText": "स्टेप फोर: एनिमेशन! रिमोशन यूज़ करके रिएक्ट कोड को सीधा वीडियो में बदल दिया!",
            "displayText": "Step 4: Animation! Remotion code turns into real video frames",
            "label": "STEP 4 • ANIMATION"
        },
        {
            "id": "scene_6_cta",
            "spokenText": "और बूम! वीडियो रेडी। कमेंट करो कोड, और पूरा ऑटोमेशन प्रोजेक्ट तुम्हारे डीएम में!",
            "displayText": "Comment CODE to get the full automation source code!",
            "label": "CALL TO ACTION"
        }
    ],
    "claude_prompts": [
        {
            "id": "scene_1_hook",
            "spokenText": "क्लॉड थ्री पॉइंट फाइव यूज़ करते हो? ये तीन सीक्रेट प्रॉम्प्ट्स तुम्हारी कोडिंग स्पीड टेन-एक्स कर देंगे!",
            "displayText": "Claude 3.5 use karte ho? 3 secret prompts speed 10X kar denge!",
            "label": "10X DEV HACKS"
        },
        {
            "id": "scene_2_prompt_arch",
            "spokenText": "प्रॉम्प्ट वन: सिस्टम आर्किटेक्ट! कोड से पहले डेटाबेस स्कीमा और एपीआई डिज़ाइन कर देता है।",
            "displayText": "Prompt #1: System Architect Prompt! Schema aur API contract design.",
            "label": "PROMPT 01"
        },
        {
            "id": "scene_3_prompt_debug",
            "spokenText": "प्रॉम्प्ट टू: रूट कॉज डीबगर! एरर पेस्ट करो, तीन सेकंड्स में एग्ज़ैक्ट बग फिक्स हाज़िर।",
            "displayText": "Prompt #2: Root Cause Debugger! Error paste karo, exact fix haazir.",
            "label": "PROMPT 02"
        },
        {
            "id": "scene_4_prompt_tests",
            "spokenText": "प्रॉम्प्ट थ्री: एज केस टेस्ट जनरेटर! सौ परसेंट टेस्ट कवरेज विथ ज़ीरो एफर्ट!",
            "displayText": "Prompt #3: Edge Case Test Generator! 100% test coverage.",
            "label": "PROMPT 03"
        },
        {
            "id": "scene_5_cta",
            "spokenText": "कमेंट करो प्रॉम्प्ट, और पूरी चीटशीट तुरंत डीएम में पाओ! फॉलो कंट्रोल वाला!",
            "displayText": "Comment करो PROMPT, और cheatsheet DM mein pao! Follow @CTRL_WALA",
            "label": "GET CHEATSHEET"
        }
    ],
    "coding_tutorial": [
        {
            "id": "scene_1_hook",
            "spokenText": "पायथन में अपना पहला एआई ऐप बनाओ सिर्फ पंद्रह मिनट में, बिना किसी कोडिंग एक्सपीरियंस के!",
            "displayText": "Python mein AI App banao sirf 15 minutes mein!",
            "label": "PYTHON AI APP"
        },
        {
            "id": "scene_2_code",
            "spokenText": "स्टेप वन: सिर्फ पंद्रह लाइन्स का कोड! ओपन एआई और स्ट्रीमलिट कनेक्ट कर दो।",
            "displayText": "Step 1: Sirf 15 lines! OpenAI aur Streamlit connect karo.",
            "label": "STEP 1 • CODE"
        },
        {
            "id": "scene_3_run",
            "spokenText": "स्टेप टू: टर्मिनल में रन करो स्ट्रीमलिट, और ऐप तुरंत लोकलहोस्ट पर लाइव!",
            "displayText": "Step 2: Terminal mein run karo streamlit, aur app live!",
            "label": "STEP 2 • RUN"
        },
        {
            "id": "scene_4_result",
            "spokenText": "स्टेप थ्री: पहले दो घंटे लगते थे, अब पंद्रह मिनट में पूरा ऐप तैयार!",
            "displayText": "Step 3: Pehle 2 ghante lagte the, ab 15 min mein app ready!",
            "label": "STEP 3 • RESULT"
        },
        {
            "id": "scene_5_cta",
            "spokenText": "कमेंट करो पायथन, और पूरा कोड तुम्हारे डीएम में! फॉलो कंट्रोल वाला!",
            "displayText": "Comment PYTHON, aur poora code DM kar denge! Follow @CTRL_WALA",
            "label": "CALL TO ACTION"
        }
    ]
}

async def generate_scene_audio(reel_dir: Path, scene: dict):
    scene_id = scene["id"]
    # Run through speech normalizer to guarantee zero dot-stutters and flawless number speech
    spoken_text = normalize_for_speech(scene["spokenText"])
    display_text = scene["displayText"]
    audio_path = reel_dir / f"{scene_id}.mp3"
    
    communicate = edge_tts.Communicate(text=spoken_text, voice=VOICE, rate=RATE, pitch=PITCH)
    
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
            
    total_ms = sentence_boundaries[-1]["endMs"] if sentence_boundaries else 2500
    duration_frames = max(70, int(math.ceil((total_ms / 1000.0) * FPS)) + 8)
    
    print(f"  Generated: {scene_id}.mp3  ({total_ms/1000:.2f}s, {duration_frames} frames)")
    return {
        "id": scene_id,
        "spokenText": spoken_text,
        "displayText": display_text,
        "text": display_text,
        "label": scene["label"],
        "audioFile": f"audio/ctrl_wala/{reel_dir.name}/{scene_id}.mp3",
        "totalMs": total_ms,
        "durationFrames": duration_frames,
        "sentences": sentence_boundaries
    }

async def generate_reel_narration(reel_key, scenes):
    reel_dir = OUTPUT_DIR / reel_key
    reel_dir.mkdir(parents=True, exist_ok=True)
    manifest = {"reel": reel_key, "scenes": []}
    
    current_frame = 0
    for scene in scenes:
        item = await generate_scene_audio(reel_dir, scene)
        item["startFrame"] = current_frame
        current_frame += item["durationFrames"]
        manifest["scenes"].append(item)
    
    manifest["totalDurationFrames"] = current_frame
    manifest["totalDurationSec"] = round(current_frame / FPS, 2)
    
    json_path = reel_dir / "manifest.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"Generated narration for {reel_key}: {len(scenes)} scenes, {manifest['totalDurationSec']}s total ({current_frame} frames).")

async def main():
    generate_sfx()
    for reel_key, scenes in SCRIPTS.items():
        await generate_reel_narration(reel_key, scenes)
    print("ALL CTRL_WALA AUDIO V3 GENERATED WITH PERFECT PRONUNCIATION!")

if __name__ == "__main__":
    asyncio.run(main())
