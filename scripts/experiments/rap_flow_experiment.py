"""
CTRL_WALA Experimental Tech-Rap Engine
Creates rhythmic, rhyme-driven Hinglish tech explanations over a 95 BPM Hip-Hop / Trap beat.
"""

import os
import sys
import math
import wave
import struct
import random
import asyncio
from pathlib import Path
import edge_tts

# Add scripts directory for speech normalizer
sys.path.insert(0, str(Path(__file__).parent.parent))
from speech_normalizer import normalize_for_speech

EXP_DIR = Path("d:/my-series/public/audio/ctrl_wala/experiments")
EXP_DIR.mkdir(parents=True, exist_ok=True)

SAMPLE_RATE = 44100
BPM = 95.0
BEAT_SEC = 60.0 / BPM
BAR_SEC = BEAT_SEC * 4

def write_wav(path: Path, samples: list):
    with wave.open(str(path), 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw = bytearray()
        for s in samples:
            val = max(-32767, min(32767, int(s * 32767)))
            raw.extend(struct.pack('<h', val))
        wf.writeframes(raw)

def generate_hiphop_beat(duration_sec: float = 25.0) -> Path:
    total_samples = int(SAMPLE_RATE * duration_sec)
    samples = [0.0] * total_samples
    
    kick_len = int(SAMPLE_RATE * 0.45)
    kick_buf = []
    for i in range(kick_len):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 9.0)
        pitch = 110 * math.exp(-t * 22.0) + 42
        wave_val = math.sin(2 * math.pi * pitch * t)
        dist = math.tanh(wave_val * 2.0)
        kick_buf.append(dist * env * 0.85)

    snare_len = int(SAMPLE_RATE * 0.22)
    snare_buf = []
    for i in range(snare_len):
        t = i / SAMPLE_RATE
        env_tone = math.exp(-t * 28.0)
        env_noise = math.exp(-t * 18.0)
        tone = math.sin(2 * math.pi * 185 * t) * env_tone * 0.4
        noise = (random.random() * 2 - 1) * env_noise * 0.75
        snare_buf.append((tone + noise) * 0.75)

    hat_len = int(SAMPLE_RATE * 0.05)
    hat_buf = []
    for i in range(hat_len):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 90.0)
        noise = (random.random() * 2 - 1) * env * 0.4
        hat_buf.append(noise)

    num_beats = int(duration_sec / BEAT_SEC)
    for b in range(num_beats):
        beat_start_sample = int(b * BEAT_SEC * SAMPLE_RATE)
        beat_in_bar = b % 4

        is_kick = (beat_in_bar == 0) or (beat_in_bar == 2 and random.random() > 0.3)
        if is_kick:
            for i, val in enumerate(kick_buf):
                pos = beat_start_sample + i
                if pos < total_samples:
                    samples[pos] += val

        if beat_in_bar == 1 or beat_in_bar == 3:
            for i, val in enumerate(snare_buf):
                pos = beat_start_sample + i
                if pos < total_samples:
                    samples[pos] += val

        for sub in range(4):
            hat_pos = beat_start_sample + int(sub * (BEAT_SEC / 4.0) * SAMPLE_RATE)
            vol = 0.85 if sub % 2 == 0 else 0.55
            for i, val in enumerate(hat_buf):
                pos = hat_pos + i
                if pos < total_samples:
                    samples[pos] += val * vol

    for i in range(total_samples):
        t = i / SAMPLE_RATE
        bar_idx = int(t / BAR_SEC)
        root_freq = 55.0 if bar_idx % 2 == 0 else 48.99
        sub = math.sin(2 * math.pi * root_freq * t) * 0.18
        harm = math.sin(2 * math.pi * (root_freq * 2) * t) * 0.06
        samples[i] += sub + harm

    beat_path = EXP_DIR / "hiphop_95bpm_beat.wav"
    write_wav(beat_path, samples)
    return beat_path

TECH_RAP_BARS = [
    {
        "bar_num": 1,
        "text": "Frontend me ghanto jo dimaag tu khapata tha!",
        "displayText": "Frontend me ghanto jo dimaag tu khapata tha...",
    },
    {
        "bar_num": 2,
        "text": "Bug dhoondh dhoondh ke jo raat bhar jagata tha!",
        "displayText": "Bug dhoondh dhoondh ke jo raat bhar jagata tha...",
    },
    {
        "bar_num": 3,
        "text": "Next.js ka scene dekh, pal me badal gaya!",
        "displayText": "Next.js ka scene dekh, pal me badal gaya!",
    },
    {
        "bar_num": 4,
        "text": "V0 pe prompt mara, website nikal gaya!",
        "displayText": "V0 pe prompt mara, website nikal gaya!",
    },
    {
        "bar_num": 5,
        "text": "Clean Tailwind CSS, Shadcn UI components!",
        "displayText": "Clean Tailwind CSS, Shadcn UI components!",
    },
    {
        "bar_num": 6,
        "text": "Minute-on me beat kare saare opponents!",
        "displayText": "Minute-on me beat kare saare opponents!",
    },
    {
        "bar_num": 7,
        "text": "DeepSeek ka beast dekh, 671 Billion!",
        "displayText": "DeepSeek ka beast dekh, 671B parameters!",
    },
    {
        "bar_num": 8,
        "text": "Comment karo RAP, link mil jaye direct inbox me!",
        "displayText": "Comment karo RAP, link inbox me instant!",
    }
]

async def generate_rap_voice():
    for i, bar in enumerate(TECH_RAP_BARS):
        clean_spoken = normalize_for_speech(bar["text"])
        out_path = EXP_DIR / f"rap_bar_{i+1}.mp3"
        communicate = edge_tts.Communicate(
            text=clean_spoken,
            voice="hi-IN-MadhurNeural",
            rate="+24%",
            pitch="+2Hz"
        )
        await communicate.save(str(out_path))

if __name__ == "__main__":
    generate_hiphop_beat(25.0)
    asyncio.run(generate_rap_voice())
    print("[SUCCESS] Audio regenerated successfully!")

