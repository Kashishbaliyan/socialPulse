import os
import re
import google.generativeai as genai
from dotenv import load_dotenv

from services.scoring_service import score_content

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
_model = genai.GenerativeModel("gemini-3.6-flash")


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
    response = _model.generate_content(prompt)
    return response.text.strip().strip('"')


def simulate_hook_improvement(text: str) -> dict:
    sentences = _split_sentences(text)
    if not sentences:
        raise ValueError("No content to simulate.")

    original_hook = sentences[0]
    new_hook = _generate_improved_hook(original_hook, text)

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