import os
import json
import re
from dotenv import load_dotenv
from services.openrouter_service import generate_text

load_dotenv()

DEFAULT_DNA = {
    "purpose": "Unknown",
    "topic": "Unknown",
    "content_type": "Unknown",
    "tone": "Unknown",
    "emotion": "Unknown",
    "audience": "Unknown",
    "structure": "Unknown",
    "complexity": "Unknown",
}


def _fallback_dna(text: str) -> dict:
    words = re.findall(r"[A-Za-z]+", text)
    lower = text.lower()
    sentences = [part for part in re.split(r"[.!?]+", text) if part.strip()]
    average_sentence_length = len(words) / max(len(sentences), 1)

    if any(word in lower for word in ("buy", "pricing", "offer", "download", "sign up")):
        purpose = "Sell"
    elif any(word in lower for word in ("learn", "lesson", "how to", "guide", "steps")):
        purpose = "Educate"
    elif any(word in lower for word in ("built", "started", "learned", "my first")):
        purpose = "Inspire"
    else:
        purpose = "Inform"

    if any(word in lower for word in ("i ", "my ", "me ", "built", "started")):
        content_type = "Personal Story"
    elif any(word in lower for word in ("how to", "steps", "tutorial", "guide")):
        content_type = "Tutorial"
    elif any(word in lower for word in ("product", "service", "offer", "pricing")):
        content_type = "Marketing"
    else:
        content_type = "Thought Leadership"

    tone = "Humorous" if any(word in lower for word in ("funny", "joke", "😂")) else "Casual"
    complexity = "Advanced" if average_sentence_length > 22 else "Medium" if average_sentence_length > 12 else "Simple"
    topic_words = words[:4] or ["General content"]

    return {
        **DEFAULT_DNA,
        "purpose": purpose,
        "topic": " ".join(topic_words),
        "content_type": content_type,
        "tone": tone,
        "emotion": "Curiosity" if "?" in text else "Interest",
        "audience": "Social media readers",
        "structure": "Hook -> Context -> Insight" if len(sentences) > 1 else "Single-point message",
        "complexity": complexity,
    }


def analyze_content_dna(text: str) -> dict:
    prompt = (
        "Analyze this social media content and classify it. "
        "Return ONLY a JSON object with these exact keys, no other text, "
        "no markdown formatting, no code fences:\n"
        '{"purpose": "one of: Educate, Inspire, Sell, Entertain, Inform",\n'
        '"topic": "the main subject, 2-4 words",\n'
        '"content_type": "one of: Thought Leadership, Marketing, Personal Story, Tutorial, News",\n'
        '"tone": "one of: Professional, Casual, Humorous, Urgent, Empathetic",\n'
        '"emotion": "the primary emotion evoked, 1-2 words",\n'
        '"audience": "who this is written for, 2-4 words",\n'
        '"structure": "the content flow, e.g. Hook -> Context -> Insight -> CTA",\n'
        '"complexity": "one of: Simple, Medium, Advanced"}\n\n'
        f"Content:\n{text[:1500]}"
    )

    try:
        raw = generate_text(prompt)
        raw = raw.replace("```json", "").replace("```", "").strip()
        parsed = json.loads(raw)
        return {**DEFAULT_DNA, **parsed}
    except Exception:
        return _fallback_dna(text)