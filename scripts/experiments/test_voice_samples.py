import asyncio
import edge_tts
from pathlib import Path

out_dir = Path("d:/my-series/public/audio/ctrl_wala/experiments")
out_dir.mkdir(parents=True, exist_ok=True)

test_phrases = [
    # Natural conversational urban Hinglish
    ("madhur_conversational", "hi-IN-MadhurNeural", "+4%", "+0Hz", 
     "Yeh poora channel na, actually AI se banta hai! Aur main? Main bas decide karta hoon. Chalo dikhata hoon kaise!"),
    ("prabhat_conversational", "en-IN-PrabhatNeural", "+4%", "+0Hz", 
     "This entire channel is built using AI, and I just make the decisions. Let me show you behind the scenes!"),
    ("madhur_hindi_natural", "hi-IN-MadhurNeural", "+2%", "+0Hz", 
     "ये पूरा चैनल ना, एक्चुअली AI से बनता है! और मैं? मैं बस डिसाइड करता हूँ। चलो दिखाता हूँ कैसे!"),
    ("prabhat_hinglish", "en-IN-PrabhatNeural", "+4%", "+0Hz", 
     "Yeh poora channel na, actually AI se banta hai! Aur main? Main bas decide karta hoon. Chalo, behind the scenes dekhte hain!"),
]

async def run_tests():
    for name, voice, rate, pitch, text in test_phrases:
        comm = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch)
        out_file = out_dir / f"{name}.mp3"
        await comm.save(str(out_file))
        print(f"Generated {out_file.name} with {voice}")

if __name__ == "__main__":
    asyncio.run(run_tests())

