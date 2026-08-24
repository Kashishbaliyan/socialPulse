import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
_model = genai.GenerativeModel("gemini-3.6-flash")

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
        response = _model.generate_content(prompt)
        raw = response.text.strip()
        raw = raw.replace("```json", "").replace("```", "").strip()
        parsed = json.loads(raw)
        return {**DEFAULT_DNA, **parsed}
    except Exception:
        return DEFAULT_DNA