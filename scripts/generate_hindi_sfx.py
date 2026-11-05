"""
Cinematic SFX Generator — THE UNKNOWN CITY Series
Generates additional Hindi-episode-specific SFX:
  - elevator_bell.wav
  - elevator_hum.wav
  - mall_ambience.wav
  - announcement_static.wav
  - footsteps.wav
  - cctv_glitch.wav
  - suspense_impact.wav

Existing SFX reused: heartbeat.wav, ambient_drone.wav, riser.wav, shutter_slam.wav
"""

import math, wave, struct, random
from pathlib import Path

SAMPLE_RATE = 44100

def create_wav(filename, samples, channels=1):
    with wave.open(str(filename), 'w') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw = bytearray()
        for s in samples:
            val = max(-32767, min(32767, int(s * 32767)))
            raw.extend(struct.pack('<h', val))
        wf.writeframes(raw)
    print(f"  Generated: {Path(filename).name}  ({len(samples)/SAMPLE_RATE:.2f}s)")

def elevator_bell(duration=1.5):
    """Classic hotel elevator DING — metallic resonant bell"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        # Fundamental + harmonics of a bell (440Hz, 880Hz, 1320Hz)
        f1 = math.sin(2 * math.pi * 523.25 * t) * math.exp(-t * 2.5)
        f2 = 0.4 * math.sin(2 * math.pi * 1046.5 * t) * math.exp(-t * 4.0)
        f3 = 0.2 * math.sin(2 * math.pi * 1568 * t) * math.exp(-t * 6.0)
        samples.append((f1 + f2 + f3) * 0.6)
    return samples

def elevator_motor(duration=4.0):
    """Low mechanical hum of elevator motor while moving"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        progress = t / duration
        ramp = min(progress * 5, 1.0) * min((1 - progress) * 8, 1.0)
        motor = math.sin(2 * math.pi * 85 * t) + 0.3 * math.sin(2 * math.pi * 170 * t)
        vibration = 0.1 * math.sin(2 * math.pi * 340 * t + math.sin(t * 3))
        samples.append((motor + vibration) * 0.3 * ramp)
    return samples

def mall_ambience(duration=60.0):
    """Empty mall at night: distant AC hum, faint echo, low reverb"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    seed = 42
    random.seed(seed)
    # Pre-generate noise
    noise_buf = [random.gauss(0, 0.08) for _ in range(n)]
    for i in range(n):
        t = i / SAMPLE_RATE
        ac_hum = 0.06 * math.sin(2 * math.pi * 50 * t)
        distant = 0.03 * math.sin(2 * math.pi * 120 * t + math.sin(t * 0.5))
        noise = noise_buf[i] * 0.04
        samples.append(ac_hum + distant + noise)
    return samples

def announcement_static(duration=1.0):
    """PA system crackle and static before announcement"""
    n = int(SAMPLE_RATE * duration)
    random.seed(99)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        crackle = random.gauss(0, 0.4) * math.exp(-t * 2)
        hiss = random.gauss(0, 0.15)
        carrier = 0.1 * math.sin(2 * math.pi * 2000 * t) * math.exp(-t * 3)
        samples.append((crackle + hiss + carrier) * 0.4)
    return samples

def footsteps(steps=8, duration=4.0):
    """Echoing footsteps in empty marble corridor"""
    n = int(SAMPLE_RATE * duration)
    step_interval = duration / steps
    samples = [0.0] * n
    random.seed(77)
    for step in range(steps):
        step_start = int(step * step_interval * SAMPLE_RATE)
        # Impact transient
        for j in range(int(0.15 * SAMPLE_RATE)):
            if step_start + j >= n:
                break
            t = j / SAMPLE_RATE
            impact = (random.gauss(0, 0.6)) * math.exp(-t * 25)
            echo1 = impact * 0.3 * math.exp(-t * 10)
            samples[step_start + j] += (impact + echo1) * 0.5
    return samples

def cctv_glitch(duration=1.5):
    """Electronic static burst — CRT monitor glitch interference"""
    n = int(SAMPLE_RATE * duration)
    random.seed(55)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        burst = random.gauss(0, 1.0) * math.exp(-t * 3) if t < 0.3 else 0
        hum = 0.2 * math.sin(2 * math.pi * 60 * t) * math.exp(-t * 2)
        samples.append((burst + hum) * 0.5)
    return samples

def suspense_impact(duration=2.0):
    """Cinematic low-end boom + reverse reverb tail"""
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        sub = math.sin(2 * math.pi * 40 * (1 - t * 0.4) * t) * math.exp(-t * 3.5)
        mid = 0.3 * math.sin(2 * math.pi * 120 * t) * math.exp(-t * 5)
        samples.append((sub + mid) * 0.65)
    return samples

def main():
    root = Path(__file__).resolve().parent.parent
    sfx_dir = root / "public" / "audio" / "sfx"
    sfx_dir.mkdir(parents=True, exist_ok=True)

    print("Generating Hindi Episode SFX into public/audio/sfx/")
    create_wav(sfx_dir / "elevator_bell.wav", elevator_bell())
    create_wav(sfx_dir / "elevator_motor.wav", elevator_motor())
    create_wav(sfx_dir / "mall_ambience.wav", mall_ambience())
    create_wav(sfx_dir / "announcement_static.wav", announcement_static())
    create_wav(sfx_dir / "footsteps.wav", footsteps())
    create_wav(sfx_dir / "cctv_glitch.wav", cctv_glitch())
    create_wav(sfx_dir / "suspense_impact.wav", suspense_impact())
    print("All Hindi SFX generated successfully!")

if __name__ == "__main__":
    main()

