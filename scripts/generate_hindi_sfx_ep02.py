"""
Procedural Cinematic SFX Generator — Episode 02: Basement B1
THE UNKNOWN CITY / ANJAAN SHEHAR STORIES

Generates custom procedural SFX for Episode 02:
  - basement_drone.wav (deep underground concrete parking resonance)
  - concrete_footsteps.wav (spatial echoed footsteps on basement floor)
  - page_turn.wav (dusty paper register opening)
  - phone_sms_vibe.wav (creepy phone notification vibration)
  - monitor_crt_power.wav (vintage surveillance monitor turning on)
  - fluorescent_buzz.wav (unstable emergency lamp hum)
"""

import math
import wave
import struct
import random
from pathlib import Path

SAMPLE_RATE = 44100
SFX_DIR = Path("public/audio/sfx")
SFX_DIR.mkdir(parents=True, exist_ok=True)

def create_wav(filename: Path, samples, channels=1):
    with wave.open(str(filename), 'w') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw = bytearray()
        for s in samples:
            val = max(-32767, min(32767, int(s * 32767)))
            raw.extend(struct.pack('<h', val))
        wf.writeframes(raw)
    print(f"  Generated SFX: {filename.name} ({len(samples)/SAMPLE_RATE:.2f}s)")

def basement_drone(duration=60.0):
    """Deep underground resonance: 45Hz sub-hum, airflow flutter, cavernous low echo"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    random.seed(101)
    noise_buf = [random.gauss(0, 0.05) for _ in range(n)]
    for i in range(n):
        t = i / SAMPLE_RATE
        sub = 0.12 * math.sin(2 * math.pi * 42.5 * t)
        air = 0.04 * math.sin(2 * math.pi * 85 * t + math.sin(t * 0.4))
        wind_surge = 0.03 * math.sin(2 * math.pi * 128 * t) * (0.6 + 0.4 * math.sin(t * 0.15))
        hiss = noise_buf[i] * 0.035
        samples.append(sub + air + wind_surge + hiss)
    return samples

def concrete_footsteps(duration=4.0):
    """Echoing solitary sneaker footsteps on cold concrete floor"""
    n = int(SAMPLE_RATE * duration)
    samples = [0.0] * n
    step_times = [0.3, 1.1, 1.9, 2.7, 3.5]
    for st in step_times:
        idx = int(st * SAMPLE_RATE)
        step_len = int(SAMPLE_RATE * 0.4)
        for j in range(step_len):
            if idx + j >= n:
                break
            tj = j / SAMPLE_RATE
            heel = math.sin(2 * math.pi * 95 * tj) * math.exp(-tj * 22)
            scuff = (random.random() * 2 - 1) * math.exp(-tj * 45) * 0.15
            echo = math.sin(2 * math.pi * 80 * tj) * math.exp(-tj * 7) * 0.25
            samples[idx + j] += (heel * 0.5 + scuff + echo) * 0.6
    return samples

def page_turn(duration=1.2):
    """Heavy parchment / dusty registry book page rustle"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    random.seed(303)
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-((t - 0.4) ** 2) / 0.04) * 0.8
        paper = (random.random() * 2 - 1) * env * 0.4
        creak = math.sin(2 * math.pi * 210 * t) * math.exp(-t * 8) * 0.15
        samples.append(paper + creak)
    return samples

def phone_sms_vibe(duration=1.5):
    """Dual-pulse smartphone vibration on table: BZZZ... BZZZ"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        # Two distinct buzzes at 0.1s and 0.6s
        b1 = 1.0 if (0.1 <= t < 0.4) else 0.0
        b2 = 1.0 if (0.55 <= t < 0.85) else 0.0
        buzz = (b1 + b2) * (
            math.sin(2 * math.pi * 140 * t) * 0.45 +
            math.sin(2 * math.pi * 280 * t) * 0.25 +
            (random.random() * 2 - 1) * 0.08
        )
        samples.append(buzz)
    return samples

def monitor_crt_power(duration=1.6):
    """Vintage CRT monitor energizing: high-pitch 15kHz flyback whine + relay thud"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        # Relay snap at t=0.08
        relay = math.exp(-((t - 0.08) ** 2) / 0.001) * 0.7
        # Flyback coil ramp up
        whine_freq = min(15000, 3000 + t * 9000)
        whine = math.sin(2 * math.pi * whine_freq * t) * min(t * 2, 0.15) * math.exp(-t * 1.5)
        # Static rush
        static = (random.random() * 2 - 1) * math.exp(-t * 6) * 0.2
        samples.append((relay + whine + static) * 0.65)
    return samples

def fluorescent_buzz(duration=3.0):
    """Flickering magnetic fluorescent ballast 100Hz buzz with intermittent dropouts"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    random.seed(505)
    for i in range(n):
        t = i / SAMPLE_RATE
        flicker = 1.0 if (random.random() > 0.08) else 0.1
        hum = math.sin(2 * math.pi * 100 * t) * 0.18 + math.sin(2 * math.pi * 200 * t) * 0.08
        spark = (random.random() * 2 - 1) * 0.05 if (random.random() > 0.96) else 0.0
        samples.append((hum + spark) * flicker)
    return samples

def main():
    print("Generating Episode 02 Procedural Sound Effects...")
    create_wav(SFX_DIR / "basement_drone.wav", basement_drone())
    create_wav(SFX_DIR / "concrete_footsteps.wav", concrete_footsteps())
    create_wav(SFX_DIR / "page_turn.wav", page_turn())
    create_wav(SFX_DIR / "phone_sms_vibe.wav", phone_sms_vibe())
    create_wav(SFX_DIR / "monitor_crt_power.wav", monitor_crt_power())
    create_wav(SFX_DIR / "fluorescent_buzz.wav", fluorescent_buzz())
    print("Done! All Episode 02 SFX generated.")

if __name__ == "__main__":
    main()

