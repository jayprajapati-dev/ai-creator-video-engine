import asyncio
import edge_tts

async def list_voices():
    voices = await edge_tts.list_voices()
    for v in voices:
        if "IN" in v["Locale"] or "hi-" in v["Locale"]:
            print(f"{v['ShortName']:25} | {v['Gender']:6} | {v['Locale']}")

if __name__ == "__main__":
    asyncio.run(list_voices())

