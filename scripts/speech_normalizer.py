"""
CTRL_WALA Intelligent Speech Normalizer & Phonetic Engine
Designed for Instagram Reels & Shorts Tech Content in Hinglish.

Fixes all Edge-TTS (hi-IN-MadhurNeural / hi-IN-SwaraNeural) issues:
1. Stuttering on dotted tech names ("Next.js" -> "नेक्स्ट जेएस", NOT "नेक्स्ट डॉट जेएस").
2. Letter-by-letter spelling bug ("DeepSeek" -> "डीपसीक", NOT "D-E-E-P-S-E-E-K").
3. Number mispronunciations (decimals like "3.5", currencies "$2.50", percentages "95%", "10X", "1M").
4. Unnatural robotic pauses or staccato breaks.
"""

import re
from typing import Tuple, Dict

# Complete Dictionary of Tech Terms -> Natural Fluent Phonetics for Edge TTS
# Key: case-insensitive regex or exact word
# Value: natural Devanagari or smooth phonetic representation
TECH_PHONETIC_MAP = {
    # Frameworks & Libraries with dot or tricky names
    r"\bnext(?:\.|\s*dot\s*)js\b": "नेक्स्ट जेएस",
    r"\bnode(?:\.|\s*dot\s*)js\b": "नोड जेएस",
    r"\bvue(?:\.|\s*dot\s*)js\b": "व्यू जेएस",
    r"\breact(?:\.|\s*dot\s*)js\b": "रिएक्ट जेएस",
    r"\bthree(?:\.|\s*dot\s*)js\b": "थ्री जेएस",
    r"\bexpress(?:\.|\s*dot\s*)js\b": "एक्सप्रेस जेएस",
    r"\bnuxt(?:\.|\s*dot\s*)js\b": "नक्स्ट जेएस",
    r"\bnest(?:\.|\s*dot\s*)js\b": "नेस्ट जेएस",
    r"\bshadcn(?:\s*ui)?\b": "शैडसीन यूआई",
    r"\blucide(?:\s*icons)?\b": "ल्यूसाइड आइकन्स",
    r"\btailwind(?:\s*css)?\b": "टेलविंड सीएसएस",
    r"\bbootstrap\b": "बूटस्ट्रैप",

    # AI Models & Platforms
    r"\bdeepseek\s*v3\b": "डीपसीक वी थ्री",
    r"\bdeepseek\s*r1\b": "डीपसीक आर वन",
    r"\bdeepseek\b": "डीपसीक",
    r"\bgpt[-\s]*4o\b": "जीपीटी फोर-ओ",
    r"\bgpt[-\s]*4\b": "जीपीटी फोर",
    r"\bgpt[-\s]*3\.5\b": "जीपीटी थ्री पॉइंट फाइव",
    r"\bchatgpt\b": "चैट जीपीटी",
    r"\bopenai\b": "ओपन एआई",
    r"\bclaude\s*3\.5\s*sonnet\b": "क्लाउड थ्री पॉइंट फाइव सॉनेट",
    r"\bclaude\s*3\.5\b": "क्लाउड थ्री पॉइंट फाइव",
    r"\bclaude\s*3\b": "क्लाउड थ्री",
    r"\bclaude\b": "क्लाउड",
    r"\banthropic\b": "एंथ्रोपिक",
    r"\bgemini\s*1\.5\s*pro\b": "जेमिनी वन पॉइंट फाइव प्रो",
    r"\bgemini\s*1\.5\s*flash\b": "जेमिनी वन पॉइंट फाइव फ्लैश",
    r"\bgemini\s*2\.0\b": "जेमिनी टू पॉइंट ओ",
    r"\bgemini\b": "जेमिनी",
    r"\bllama\s*3\b": "लामा थ्री",
    r"\bllama\s*3\.1\b": "लामा थ्री पॉइंट वन",
    r"\bllama\b": "लामा",
    r"\bmistral\b": "मिस्ट्रल",
    r"\bollama\b": "ओलामा",
    r"\bhugging\s*face\b": "हगिंग फेस",
    r"\bmidjourney\b": "मिडजर्नी",
    r"\brunway(?:\s*gen-?3)?\b": "रनवे",
    r"\beleven\s*labs\b": "इलेवन लैब्स",
    r"\bsuno(?:\s*ai)?\b": "सूनो एआई",
    r"\budio\b": "यूडियो",
    r"\bcursor(?:\s*ai)?\b": "कर्सर एआई",
    r"\bdevin\b": "डेविन",
    r"\bv0(?:\.dev)?\b": "वी-ज़ीरो",
    r"\bgithub\s*copilot\b": "गिटहब कोपायलट",
    r"\bcopilot\b": "कोपायलट",
    r"\bperplex(?:ity)?(?:\s*ai)?\b": "परप्लेक्सिटी",

    # Developer Tools & Platforms
    r"\bgithub\b": "गिटहब",
    r"\bgitlab\b": "गिटलैब",
    r"\bvercel\b": "वरसेल",
    r"\bsupabase\b": "सुपाबेस",
    r"\bfirebase\b": "फायरबेस",
    r"\bdocker\b": "डॉकर",
    r"\bkubernetes\b": "कुबर्नेटीज़",
    r"\bpostgresql\b": "पोस्टग्रेस",
    r"\bpostgres\b": "पोस्टग्रेस",
    r"\bmongodb\b": "मोंगो डीबी",
    r"\bmysql\b": "माई सीक्वल",
    r"\bsqlite\b": "सीक्वेलाइट",
    r"\bprisma\b": "प्रिज्मा",
    r"\bdrizzle\b": "ड्रिज़ल",
    r"\bpostman\b": "पोस्टमेन",
    r"\blinux\b": "लिनक्स",
    r"\bubuntu\b": "उबुंटू",
    r"\bvscode\b": "वीएस कोड",
    r"\bvs\s*code\b": "वीएस कोड",

    # Languages & Tech Terms
    r"\btypescript\b": "टाइपस्क्रिप्ट",
    r"\bjavascript\b": "जावास्क्रिप्ट",
    r"\bpython\b": "पायथन",
    r"\bgolang\b": "गो-लैंग",
    r"\brust\b": "रस्ट",
    r"\bfrontend\b": "फ्रंटएंड",
    r"\bbackend\b": "बैकएंड",
    r"\bfull[- ]?stack\b": "फुल-स्टैक",
    r"\bopen[- ]?weights\b": "ओपन वेट्स",
    r"\bopen[- ]?source\b": "ओपन सोर्स",
    r"\bprompt\s*engineering\b": "प्रॉम्प्ट इंजीनियरिंग",
    r"\bbenchmarks?\b": "बेंचमार्क्स",
    r"\bparameters?\b": "पैरामीटर्स",
    r"\bproduction[- ]?ready\b": "प्रोडक्शन रेडी",
    r"\bcheatsheet\b": "चीटशीट",
    r"\bspaghetti\s*code\b": "स्पैगेटी कोड",
    r"\broot\s*cause\b": "रूट कॉज़",
    r"\bdebugger\b": "डीबगर",
    r"\barchitecture\b": "आर्किटेक्चर",
    r"\bdatabase\s*schema\b": "डेटाबेस स्कीमा",

    # Acronyms & Short words
    r"\bapi\b": "एपीआई",
    r"\bapis\b": "एपीआईज़",
    r"\bui\b": "यूआई",
    r"\bux\b": "यूएक्स",
    r"\bcss\b": "सीएसएस",
    r"\bhtml\b": "एचटीएमएल",
    r"\bsdk\b": "एसडीके",
    r"\bcli\b": "सीएलआई",
    r"\bllm\b": "एलएलएम",
    r"\bllms\b": "एलएलएम्स",
    r"\bai\b": "एआई",
    r"\bml\b": "एमएल",
    r"\bpr\b": "पीआर",
    r"\bci/cd\b": "सीआई सीडी",
    r"\bjson\b": "जेसन",
    r"\bsvg\b": "एसवीजी",
    r"\burl\b": "यूआरएल",
    r"\burls\b": "यूआरएल्स",
    r"\bdur\b": "डीएम",
    r"\bdm\b": "डीएम",
    r"\bdms\b": "डीएम्स",
    r"\bcta\b": "सीटीए",
    r"\bctr\b": "सीटीआर",
}

# Number words in English phonetics
ONES = {
    0: "ज़ीरो", 1: "वन", 2: "टू", 3: "थ्री", 4: "फोर", 5: "फाइव",
    6: "सिक्स", 7: "सेवन", 8: "एट", 9: "नाइन", 10: "टेन",
    11: "इलेवन", 12: "ट्वेल्व", 13: "थर्टीन", 14: "फोर्टींन", 15: "फिफ्टीन",
    16: "सिक्सटीन", 17: "सेवन्टीन", 18: "एइटीन", 19: "नाइन्टीन"
}

TENS = {
    20: "ट्वेंटी", 30: "थर्टी", 40: "फॉरटी", 50: "फिफ्टी",
    60: "सिक्सटी", 70: "सेवन्टी", 80: "एइटी", 90: "नाइन्टी"
}

def int_to_spoken_english(n: int) -> str:
    """Converts integer into spoken English Devanagari phonetics."""
    if n < 0:
        return "माइनस " + int_to_spoken_english(-n)
    if n in ONES:
        return ONES[n]
    if n < 100:
        tens_val = (n // 10) * 10
        rem = n % 10
        if rem == 0:
            return TENS.get(tens_val, str(n))
        return f"{TENS.get(tens_val, '')} {ONES[rem]}"
    if n < 1000:
        h = n // 100
        rem = n % 100
        base = f"{ONES[h]} हंड्रेड"
        if rem > 0:
            base += f" {int_to_spoken_english(rem)}"
        return base
    if n < 1000000:
        k = n // 1000
        rem = n % 1000
        base = f"{int_to_spoken_english(k)} थाउज़ेंड"
        if rem > 0:
            base += f" {int_to_spoken_english(rem)}"
        return base
    if n < 1000000000:
        m = n // 1000000
        rem = n % 1000000
        base = f"{int_to_spoken_english(m)} मिलियन"
        if rem > 0:
            base += f" {int_to_spoken_english(rem)}"
        return base
    b = n // 1000000000
    rem = n % 1000000000
    base = f"{int_to_spoken_english(b)} बिलियन"
    if rem > 0:
        base += f" {int_to_spoken_english(rem)}"
    return base

def normalize_numbers(text: str) -> str:
    """
    Transforms all numbers, decimals, currencies, and multipliers into
    smooth, natural spoken English phonetics.
    """
    # 1. Multipliers: 10x, 10X, 5x, 100x
    text = re.sub(r"\b(\d+)\s*[xX]\b", lambda m: f"{int_to_spoken_english(int(m.group(1)))} एक्स", text)

    # 2. Currency: $2.50, $0.14, $10, $500
    def replace_currency(m):
        val = m.group(1)
        if "." in val:
            dollars, cents = val.split(".", 1)
            d_int = int(dollars) if dollars else 0
            c_int = int(cents.ljust(2, "0")[:2])
            if d_int == 0 and c_int > 0:
                return f"{int_to_spoken_english(c_int)} सेंट्स"
            elif c_int == 0:
                return f"{int_to_spoken_english(d_int)} डॉलर्स"
            else:
                return f"{int_to_spoken_english(d_int)} पॉइंट {int_to_spoken_english(c_int)} डॉलर्स"
        else:
            return f"{int_to_spoken_english(int(val))} डॉलर्स"

    text = re.sub(r"\$\s*(\d+(?:\.\d+)?)", replace_currency, text)

    # 3. Percentages: 95%, 100%, 50%
    text = re.sub(
        r"(\d+(?:\.\d+)?)\s*%",
        lambda m: f"{normalize_single_num(m.group(1))} परसेंट",
        text
    )

    # 4. Units: 1M, 1B, 10K, 671B
    text = re.sub(
        r"\b(\d+(?:\.\d+)?)\s*[kK]\b",
        lambda m: f"{normalize_single_num(m.group(1))} थाउज़ेंड",
        text
    )
    text = re.sub(
        r"\b(\d+(?:\.\d+)?)\s*[mM]\b",
        lambda m: f"{normalize_single_num(m.group(1))} मिलियन",
        text
    )
    text = re.sub(
        r"\b(\d+(?:\.\d+)?)\s*[bB]\b",
        lambda m: f"{normalize_single_num(m.group(1))} बिलियन",
        text
    )

    # 5. Decimals: 3.5, 4.0, 1.5, 0.14
    def replace_decimal(m):
        whole, frac = m.group(1).split(".")
        w_spoken = int_to_spoken_english(int(whole)) if whole else "ज़ीरो"
        # Frac spoken digit by digit if long, or as value if short
        if len(frac) == 1:
            f_spoken = ONES.get(int(frac), frac)
        else:
            f_spoken = " ".join(ONES.get(int(d), d) for d in frac)
        return f"{w_spoken} पॉइंट {f_spoken}"

    text = re.sub(r"\b(\d+\.\d+)\b", replace_decimal, text)

    # 6. Ordinals & Ranked lists: #1, #2, #3, 1st, 2nd, 3rd
    text = re.sub(r"#\s*1\b", "नंबर वन", text)
    text = re.sub(r"#\s*2\b", "नंबर टू", text)
    text = re.sub(r"#\s*3\b", "नंबर थ्री", text)
    text = re.sub(r"#\s*4\b", "नंबर फोर", text)
    text = re.sub(r"#\s*5\b", "नंबर फाइव", text)

    # 7. Remaining Standalone Integers
    text = re.sub(r"\b(\d+)\b", lambda m: int_to_spoken_english(int(m.group(1))), text)

    return text

def normalize_single_num(val_str: str) -> str:
    """Helper to speak a float or int string."""
    if "." in val_str:
        w, f = val_str.split(".", 1)
        w_s = int_to_spoken_english(int(w))
        f_s = " ".join(ONES.get(int(d), d) for d in f)
        return f"{w_s} पॉइंट {f_s}"
    return int_to_spoken_english(int(val_str))

def normalize_for_speech(raw_text: str) -> str:
    """
    Master function: Takes a raw script string and converts it into
    100% natural, stutter-free, fluent phonetics for hi-IN-MadhurNeural.
    """
    text = raw_text

    # Step 1: Pre-clean dot-domains or filenames so they don't break
    # "Next.js" -> "नेक्स्ट जेएस" (Done via TECH_PHONETIC_MAP first!)
    for pattern, replacement in TECH_PHONETIC_MAP.items():
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

    # Step 2: Handle numbers, decimals, currencies, percentages
    text = normalize_numbers(text)

    # Step 3: Clean up remaining English tech words that may be scattered
    # e.g., "prompt" -> "प्रॉम्प्ट", "code" -> "कोड", "website" -> "वेबसाइट"
    common_vocab = {
        r"\bprompt\b": "प्रॉम्प्ट",
        r"\bprompts\b": "प्रॉम्प्ट्स",
        r"\bcode\b": "कोड",
        r"\bcoding\b": "कोडिंग",
        r"\bdeveloper\b": "डेवलपर",
        r"\bdevelopers\b": "डेवलपर्स",
        r"\bwebsite\b": "वेबसाइट",
        r"\bwebsites\b": "वेबसाइट्स",
        r"\bsecret\b": "सीक्रेट",
        r"\bsecrets\b": "सीक्रेट्स",
        r"\bapp\b": "ऐप",
        r"\bapps\b": "ऐप्स",
        r"\btool\b": "टूल",
        r"\btools\b": "टूल्स",
        r"\bcomment\b": "कमेंट",
        r"\bfollow\b": "फॉलो",
        r"\binbox\b": "इनबॉक्स",
        r"\bsetup\b": "सेटअप",
        r"\bguide\b": "गाइड",
        r"\blink\b": "लिंक",
        r"\binstant\b": "तुरंत",
        r"\bfast\b": "फास्ट",
        r"\bworkflow\b": "वर्कफ्लो",
        r"\bworkflows\b": "वर्कफ्लोज़",
        r"\bfeature\b": "फीचर",
        r"\bfeatures\b": "फीचर्स",
        r"\bdesign\b": "डिज़ाइन",
        r"\bcomponent\b": "कंपोनेंट",
        r"\bcomponents\b": "कंपोनेंट्स",
        r"\bclean\b": "क्लीन",
        r"\berror\b": "एरर",
        r"\berrors\b": "एरर्स",
        r"\bwarning\b": "वार्निंग",
        r"\btest\b": "टेस्ट",
        r"\btests\b": "टेस्ट्स",
        r"\bcoverage\b": "कवरेज",
        r"\bfree\b": "फ्री",
        r"\btoken\b": "टोकन",
        r"\btokens\b": "टोकन्स",
        r"\bserver\b": "सर्वर",
        r"\blocal\b": "लोकल",
    }
    for pat, repl in common_vocab.items():
        text = re.sub(pat, repl, text, flags=re.IGNORECASE)

    # Step 4: Punctuation grooming
    # Remove dots followed by letters (e.g. .com, .dev) that were not caught
    text = re.sub(r"\.([a-zA-Z])", r" \1", text)
    # Ensure exclamation marks and question marks have clean spacing
    text = re.sub(r"\s+", " ", text).strip()

    return text

def prepare_scene(raw_spoken: str, display_text: str = None) -> Tuple[str, str]:
    """
    Takes raw script and returns (clean_spoken_phonetic, clean_display_text).
    """
    clean_spoken = normalize_for_speech(raw_spoken)
    clean_display = display_text if display_text else raw_spoken
    return clean_spoken, clean_display


if __name__ == "__main__":
    # Test cases to prove zero stutter & perfect pronunciation
    test_cases = [
        "Next.js website ready",
        "next dot js app",
        "DeepSeek V3 is $0.14 per 1M tokens",
        "GPT-4o costs $2.50 while Claude 3.5 Sonnet is 10X faster",
        "671B parameters and 95% accuracy in HumanEval",
        "Comment PROMPT to get Top 5 secret UI prompts for V0.dev",
        "Node.js, Vue.js aur Three.js ka super clean code"
    ]
    print("=== TESTING CTRL_WALA SPEECH NORMALIZER ===")
    for t in test_cases:
        norm = normalize_for_speech(t)
        print(f"\nINPUT:  {t}")
        print(f"SPOKEN: {norm}")

