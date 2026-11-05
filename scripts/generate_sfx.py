"""
Generate Royalty-Free Cinematic SFX for Instagram Storytelling Engine
Uses Python standard library (wave, math, struct) - 100% free, zero external dependencies.
"""

import math
import wave
import struct
from pathlib import Path

SAMPLE_RATE = 44100

def create_wav(filename, samples):
    with wave.open(str(filename), 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2) # 16-bit
        wf.setframerate(SAMPLE_RATE)
        # clamp to 16-bit range
        raw = bytearray()
        for s in samples:
            val = max(-32767, min(32767, int(s * 32767)))
            raw.extend(struct.pack('<h', val))
        wf.writeframes(raw)
    print(f"Generated SFX: {filename.name} ({len(samples)/SAMPLE_RATE:.2f}s)")

def generate_metal_slam(duration=1.2):
    """Heavy metallic shutter slam impact with low resonance"""
    n_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        # Initial transient impact (noise + low thud)
        decay = math.exp(-t * 6.0)
        low_thud = math.sin(2 * math.pi * 55 * (1.0 - t*0.5) * t) * math.exp(-t * 4.0)
        mid_clang = (math.sin(2 * math.pi * 180 * t) + 0.5 * math.sin(2 * math.pi * 270 * t)) * math.exp(-t * 8.0)
        rattle = 0.2 * math.sin(2 * math.pi * 440 * t) * math.exp(-t * 15.0)
        s = (0.7 * low_thud + 0.3 * mid_clang + rattle) * decay
        samples.append(s)
    return samples

def generate_ambient_drone(duration=60.0):
    """Low ominous tension drone for the entire 60s Reel"""
    n_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        # Slow pulsating sub-bass drone around 50Hz and 75Hz
        lfo = 0.5 + 0.5 * math.sin(2 * math.pi * 0.15 * t)
        drone1 = math.sin(2 * math.pi * 48.0 * t)
        drone2 = 0.4 * math.sin(2 * math.pi * 72.0 * t + 0.3)
        drone3 = 0.2 * math.sin(2 * math.pi * 96.0 * t + 0.7)
        # Subtle eerie modulation
        filter_mod = 0.6 + 0.4 * math.sin(2 * math.pi * 0.08 * t)
        s = (0.6 * drone1 + drone2 + drone3) * 0.25 * filter_mod * (0.8 + 0.2 * lfo)
        samples.append(s)
    return samples

def generate_heartbeat(duration=8.0):
    """Urgent heartbeat pulse for cliffhanger scene"""
    n_samples = int(SAMPLE_RATE * duration)
    samples = []
    # Heartbeat rate ~ 120 bpm (2 beats per second)
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        cycle = t % 0.6  # every 600ms a lub-dub
        # lub
        s1 = math.sin(2 * math.pi * 60 * cycle) * math.exp(-cycle * 25.0) if cycle < 0.2 else 0
        # dub
        c2 = cycle - 0.18
        s2 = math.sin(2 * math.pi * 50 * c2) * math.exp(-c2 * 28.0) if 0 <= c2 < 0.25 else 0
        s = (s1 + 0.8 * s2) * 0.5
        samples.append(s)
    return samples

def generate_riser(duration=3.0):
    """Tension riser pitch slide up to climax"""
    n_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        progress = t / duration
        freq = 80 + 350 * (progress ** 2)
        s = 0.3 * math.sin(2 * math.pi * freq * t) * (progress ** 1.5)
        samples.append(s)
    return samples

def main():
    root = Path(__file__).resolve().parent.parent
    sfx_dir = root / "public" / "audio" / "sfx"
    sfx_dir.mkdir(parents=True, exist_ok=True)

    create_wav(sfx_dir / "shutter_slam.wav", generate_metal_slam())
    create_wav(sfx_dir / "ambient_drone.wav", generate_ambient_drone())
    create_wav(sfx_dir / "heartbeat.wav", generate_heartbeat())
    create_wav(sfx_dir / "riser.wav", generate_riser())
    print("All SFX generated successfully in public/audio/sfx/")

if __name__ == "__main__":
    main()

