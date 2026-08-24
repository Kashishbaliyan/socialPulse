import os
import re
from dotenv import load_dotenv

from services.scoring_service import score_content
from services.openrouter_service import generate_text

load_dotenv()

def _split_sentences(text: str) -> list[str]:
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    return [s.strip() for s in sentences if s.strip()]


def _generate_improved_hook(original_hook: str, full_text: str) -> str:
    prompt = (
        "You are an expert social media editor. Rewrite ONLY the opening "
        "hook sentence below to be more attention-grabbing and specific. "
        "Use a bold claim, a surprising number, or a pointed question. "
        "Keep it under 20 words. Return ONLY the new sentence, nothing else "
        "-- no quotes, no explanation.\n\n"
        f"Original hook: {original_hook}\n\n"
        f"Full content for context:\n{full_text[:1000]}"
    )
    return generate_text(prompt).strip('"')


def _fallback_hook(original_hook: str) -> str:
    if len(original_hook.split()) <= 5:
        hook_subject = original_hook.rstrip(".!? ").lower()
        return f"What nobody tells you about {hook_subject}."
    return "The biggest lesson here is the mistake most people make first."


def simulate_hook_improvement(text: str) -> dict:
    sentences = _split_sentences(text)
    if not sentences:
        raise ValueError("No content to simulate.")

    original_hook = sentences[0]
    try:
        new_hook = _generate_improved_hook(original_hook, text)
    except Exception:
        new_hook = _fallback_hook(original_hook)

    modified_sentences = [new_hook] + sentences[1:]
    modified_text = " ".join(modified_sentences)

    original_scoring = score_content(text)
    simulated_scoring = score_content(modified_text)

    original_overall = original_scoring["overall_score"]
    simulated_overall = simulated_scoring["overall_score"]

    dimension_deltas = {
        key: simulated_scoring["dimensions"][key]["score"] - original_scoring["dimensions"][key]["score"]
        for key in original_scoring["dimensions"]
    }

    return {
        "original_hook": original_hook,
        "simulated_hook": new_hook,
        "original_overall_score": original_overall,
        "simulated_overall_score": simulated_overall,
        "improvement": simulated_overall - original_overall,
        "dimension_deltas": dimension_deltas,
        "modified_text": modified_text,
    }