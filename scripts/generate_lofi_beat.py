"""
CTRL_WALA Royalty-Free Viral Creator Lo-Fi Beat Generator
Produces a warm, modern 92 BPM chill-hop tech groove:
- Warm Rhodes / Electric Piano chords (Dm9 -> G13 -> Cmaj9 -> Am7)
- 808 sub bass with warm saturation
- Punchy lofi kick & crisp wooden rimshot
- Shuffling swinging hi-hats with velocity groove
- Subtle tape warmth and vinyl flutter
100% royalty-free, copyright-free, procedurally synthesized.
"""

import math
import random
import wave
import struct
from pathlib import Path

SAMPLE_RATE = 44100
BPM = 92
BEAT_DUR = 60.0 / BPM
BAR_DUR = BEAT_DUR * 4
NUM_BARS = 4  # 4-bar loop = ~10.43 seconds seamless loop
TOTAL_DUR = BAR_DUR * NUM_BARS
TOTAL_SAMPLES = int(SAMPLE_RATE * TOTAL_DUR)

OUTPUT_PATH = Path("d:/my-series/public/audio/ctrl_wala/sfx/tech_beat_loop.wav")

def note_to_freq(note_str):
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    octave = int(note_str[-1])
    pitch = note_str[:-1]
    semitone = notes.index(pitch)
    midi = 12 * (octave + 1) + semitone
    return 440.0 * (2.0 ** ((midi - 69) / 12.0))

# 4-bar Chord progression (Frequencies)
CHORDS = [
    # Bar 1: Dm9 (D3, F3, A3, C4, E4)
    [note_to_freq("D3"), note_to_freq("F3"), note_to_freq("A3"), note_to_freq("C4"), note_to_freq("E4")],
    # Bar 2: G13 (G2, F3, B3, E4)
    [note_to_freq("G2"), note_to_freq("F3"), note_to_freq("B3"), note_to_freq("E4")],
    # Bar 3: Cmaj9 (C3, E3, G3, B3, D4)
    [note_to_freq("C3"), note_to_freq("E3"), note_to_freq("G3"), note_to_freq("B3"), note_to_freq("D4")],
    # Bar 4: Am9 (A2, G3, C4, E4, B4)
    [note_to_freq("A2"), note_to_freq("G3"), note_to_freq("C4"), note_to_freq("E4"), note_to_freq("B4")]
]

BASS_NOTES = [note_to_freq("D2"), note_to_freq("G1"), note_to_freq("C2"), note_to_freq("A1")]

def synthesize_beat():
    samples_left = [0.0] * TOTAL_SAMPLES
    samples_right = [0.0] * TOTAL_SAMPLES

    # 1. Synthesize Rhodes Chords
    for bar_idx in range(NUM_BARS):
        bar_start_time = bar_idx * BAR_DUR
        chord_freqs = CHORDS[bar_idx]
        
        # Strum chord at beat 0 and beat 2.5 (syncopated lofi rhythm)
        strum_offsets = [0.0, BEAT_DUR * 2.5]
        for strum in strum_offsets:
            chord_time = bar_start_time + strum
            chord_sample_start = int(chord_time * SAMPLE_RATE)
            chord_dur_samples = int(BEAT_DUR * 2.2 * SAMPLE_RATE)
            
            for s_idx in range(min(chord_dur_samples, TOTAL_SAMPLES - chord_sample_start)):
                t = s_idx / SAMPLE_RATE
                env = math.exp(-t * 2.2) * (1.0 - math.exp(-t * 60))
                
                # Tremolo / chorus
                tremolo = 1.0 + 0.15 * math.sin(2 * math.pi * 4.5 * t)
                
                chord_val = 0.0
                for f in chord_freqs:
                    # Bell tone + warm body
                    tone = (
                        math.sin(2 * math.pi * f * t) * 0.5 +
                        math.sin(2 * math.pi * f * 2 * t) * 0.25 * math.exp(-t * 4.0) +
                        math.sin(2 * math.pi * f * 3 * t) * 0.10 * math.exp(-t * 8.0)
                    )
                    chord_val += tone
                
                chord_val = (chord_val / len(chord_freqs)) * env * tremolo * 0.35
                
                pos = chord_sample_start + s_idx
                if pos < TOTAL_SAMPLES:
                    samples_left[pos] += chord_val * 0.95
                    samples_right[pos] += chord_val * 1.05

    # 2. Synthesize 808 Sub Bass
    for bar_idx in range(NUM_BARS):
        bar_start_time = bar_idx * BAR_DUR
        bass_f = BASS_NOTES[bar_idx]
        
        # Bass hits on beat 0 and beat 2.5
        bass_times = [0.0, BEAT_DUR * 2.5]
        for b_time in bass_times:
            start_s = int((bar_start_time + b_time) * SAMPLE_RATE)
            dur_s = int(BEAT_DUR * 2.0 * SAMPLE_RATE)
            for s_idx in range(min(dur_s, TOTAL_SAMPLES - start_s)):
                t = s_idx / SAMPLE_RATE
                env = math.exp(-t * 2.0)
                sub = math.sin(2 * math.pi * bass_f * t)
                # Soft saturation
                sat = math.tanh(sub * 1.8) * 0.4 * env
                pos = start_s + s_idx
                if pos < TOTAL_SAMPLES:
                    samples_left[pos] += sat
                    samples_right[pos] += sat

    # 3. Drums: Kick, Snare/Rim, Hi-Hats
    kick_pattern = [0.0, 1.75, 2.5]  # syncopated hip-hop groove
    snare_pattern = [1.0, 3.0]        # on beats 2 & 4
    
    for bar_idx in range(NUM_BARS):
        bar_start_t = bar_idx * BAR_DUR
        
        # Kicks
        for k_beat in kick_pattern:
            k_start = int((bar_start_t + k_beat * BEAT_DUR) * SAMPLE_RATE)
            k_dur = int(0.28 * SAMPLE_RATE)
            for s_idx in range(min(k_dur, TOTAL_SAMPLES - k_start)):
                t = s_idx / SAMPLE_RATE
                k_env = math.exp(-t * 22.0)
                k_freq = 110 * math.exp(-t * 35.0) + 42
                kick = math.sin(2 * math.pi * k_freq * t) * k_env * 0.55
                pos = k_start + s_idx
                if pos < TOTAL_SAMPLES:
                    samples_left[pos] += kick
                    samples_right[pos] += kick

        # Snares / Wooden Rims
        for s_beat in snare_pattern:
            s_start = int((bar_start_t + s_beat * BEAT_DUR) * SAMPLE_RATE)
            s_dur = int(0.18 * SAMPLE_RATE)
            for s_idx in range(min(s_dur, TOTAL_SAMPLES - s_start)):
                t = s_idx / SAMPLE_RATE
                s_env = math.exp(-t * 28.0)
                tone = math.sin(2 * math.pi * 210 * t) * 0.4
                noise = (random.random() * 2 - 1) * 0.6
                snare = (tone + noise) * s_env * 0.38
                pos = s_start + s_idx
                if pos < TOTAL_SAMPLES:
                    samples_left[pos] += snare * 0.95
                    samples_right[pos] += snare * 1.05

        # Hi-Hats (8th notes with subtle swing and velocity)
        for h_step in range(8):
            swing = 0.025 if (h_step % 2 == 1) else 0.0
            h_time = (h_step * 0.5 + swing) * BEAT_DUR
            h_start = int((bar_start_t + h_time) * SAMPLE_RATE)
            h_dur = int(0.06 * SAMPLE_RATE)
            velocity = 0.22 if (h_step % 2 == 0) else 0.14
            for s_idx in range(min(h_dur, TOTAL_SAMPLES - h_start)):
                t = s_idx / SAMPLE_RATE
                h_env = math.exp(-t * 90.0)
                hat = (random.random() * 2 - 1) * h_env * velocity
                pos = h_start + s_idx
                if pos < TOTAL_SAMPLES:
                    samples_left[pos] += hat * 0.8
                    samples_right[pos] += hat * 1.1

    # 4. Master Limiter & Normalization
    max_amp = max(max(abs(s) for s in samples_left), max(abs(s) for s in samples_right), 0.001)
    target_peak = 0.88
    gain = target_peak / max_amp

    interleaved = []
    for l, r in zip(samples_left, samples_right):
        sl = max(-32767, min(32767, int(l * gain * 32767)))
        sr = max(-32767, min(32767, int(r * gain * 32767)))
        interleaved.extend([sl, sr])

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUTPUT_PATH), 'w') as wf:
        wf.setnchannels(2)  # Stereo
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw_bytes = struct.pack(f'<{len(interleaved)}h', *interleaved)
        wf.writeframes(raw_bytes)

    print(f"Generated viral royalty-free lo-fi beat: {OUTPUT_PATH} ({TOTAL_DUR:.2f}s seamless loop)")

if __name__ == "__main__":
    synthesize_beat()

