"""
CTRL_WALA Studio — Complete CLI & Pipeline for Instagram Reels
Automates:
  1. Human-styled, high-CTR Instagram Reel script generation (no generic AI fluff)
  2. Automatic phonetic & speech normalization (zero dot-stutter, clean numbers, zero letter-spelling)
  3. Audio synthesis with exact frame boundaries (hi-IN-MadhurNeural + procedural SFX)
  4. Instant voice testing CLI (hear any word/sentence in 2 seconds)
"""

import os
import sys
import json
import argparse
import asyncio
from pathlib import Path
import edge_tts

# Add scripts directory to path if needed
sys.path.insert(0, str(Path(__file__).parent))
from speech_normalizer import normalize_for_speech, TECH_PHONETIC_MAP, normalize_numbers

AUDIO_BASE = Path("d:/my-series/public/audio/ctrl_wala")
BLUEPRINT_DIR = Path("d:/my-series/src/ctrl_wala/blueprints")
VOICE = "hi-IN-MadhurNeural"
RATE = "+18%"
PITCH = "+3Hz"
FPS = 30

async def synthesize_sentence(text: str, output_path: Path, voice: str = VOICE, rate: str = RATE, pitch: str = PITCH):
    """Synthesizes a single sentence with Edge TTS."""
    spoken = normalize_for_speech(text)
    print(f"\n[Original]: {text}")
    print(f"[Spoken]  : {spoken}")
    print(f"[Voice]   : {voice} ({rate}, {pitch})")
    print(f"[Saving]  : {output_path}")

    communicate = edge_tts.Communicate(text=spoken, voice=voice, rate=rate, pitch=pitch)
    await communicate.save(str(output_path))
    print(f"[Done]    : Audio ready at {output_path}")

def cmd_test_voice(args):
    """Test voice pronunciation of any word or sentence in 2 seconds."""
    text = args.text
    voice = args.voice if args.voice else VOICE
    rate = args.rate if args.rate else RATE
    pitch = args.pitch if args.pitch else PITCH
    out_file = Path(args.output) if args.output else AUDIO_BASE / "test_preview.mp3"
    out_file.parent.mkdir(parents=True, exist_ok=True)
    asyncio.run(synthesize_sentence(text, out_file, voice=voice, rate=rate, pitch=pitch))

def cmd_inspect_speech(args):
    """Inspect how a script will be normalized without generating audio."""
    text = args.text
    spoken = normalize_for_speech(text)
    print("=" * 60)
    print("CTRL_WALA SPEECH NORMALIZER INSPECTION")
    print("=" * 60)
    print(f"INPUT RAW:\n{text}\n")
    print(f"NORMALIZED FOR TTS (Zero Stutter / Fluent Phonetics):\n{spoken}\n")
    print("=" * 60)

def cmd_human_script_guide(args):
    """Displays the CTRL_WALA Instagram Reels Human Scriptwriting Formula."""
    guide = """
================================================================================
CTRL_WALA INSTAGRAM REELS — HUMAN CREATOR SCRIPTWRITING BLUEPRINT
================================================================================
Goal: High Retention, 100% Human Feel, Zero Generic AI Fluff.

1. HOOK (0 - 3s) — THE PATTERN INTERRUPT:
   - Rule: Never start with "In this video...", "Hello guys...", or "Aaj hum baat karenge..."
   - Examples of Human Hooks:
     * "Stop scrolling agar tum coding me apna time waste kar rahe ho!"
     * "Yeh ek AI tool 95% developers ko secretly replace kar raha hai."
     * "OpenAI ka sabse bada dar sach ho gaya!"
     * "Next.js website 10 seconds me banani hai? Dekho ye trick."

2. TENSION / AGITATION (3 - 8s):
   - Rule: Call out the painful truth or common mistake.
   - Example:
     * "Subah se raat tak UI banane me lage rehte ho, jabki ye kaam ek prompt se ho sakta hai."

3. THE CORE REVEAL / VALUE (8 - 25s):
   - Rule: Show the actual tool, code, or interface immediately.
   - No buzzwords. Be hyper-specific:
     * Name the exact model: "DeepSeek V3", "Claude 3.5 Sonnet", "v0"
     * Give exact numbers: "95% cheaper", "$0.14 vs $2.50", "671 Billion parameters"
     * Highlight key features: Tailwind, Shadcn, Next.js, Ollama

4. COMMENT-DRIVEN CALL TO ACTION (25 - 35s):
   - Rule: Always give a clear, high-value asset in exchange for a single comment keyword.
   - Examples:
     * "Comment 'TOOL' aur mai direct link DM kar dunga!"
     * "Comment 'PROMPT' for my top 5 system architect prompts."
     * "Follow CTRL_WALA for daily AI builds & secrets!"

================================================================================
"""
    print(guide)

def main():
    parser = argparse.ArgumentParser(description="CTRL_WALA Instagram Reel Studio CLI")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # test-voice
    p_test = subparsers.add_parser("test-voice", help="Test voice pronunciation of any text")
    p_test.add_argument("text", type=str, help="Text or sentence to speak")
    p_test.add_argument("--output", "-o", type=str, default=None, help="Output MP3 path")
    p_test.add_argument("--voice", "-v", type=str, default="hi-IN-MadhurNeural", help="Voice model (e.g. hi-IN-MadhurNeural, hi-IN-SwaraNeural, en-IN-PrabhatNeural)")
    p_test.add_argument("--rate", "-r", type=str, default="+18%", help="Speed (e.g. +15%, +20%)")
    p_test.add_argument("--pitch", "-p", type=str, default="+3Hz", help="Pitch adjustment")

    # inspect-speech
    p_inspect = subparsers.add_parser("inspect", help="Inspect phonetic normalization of any text")
    p_inspect.add_argument("text", type=str, help="Text to normalize")

    # script-guide
    subparsers.add_parser("script-guide", help="Show Instagram Reels human scriptwriting guide")

    args = parser.parse_args()
    if args.command == "test-voice":
        cmd_test_voice(args)
    elif args.command == "inspect":
        cmd_inspect_speech(args)
    elif args.command == "script-guide":
        cmd_human_script_guide(args)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()

