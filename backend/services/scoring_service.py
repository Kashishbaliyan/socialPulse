import re

CTA_KEYWORDS = [
    "comment", "share", "try", "click", "sign up", "join", "follow",
    "subscribe", "download", "learn more", "check out", "let me know",
    "what do you think", "reach out", "connect", "message me",
]

STRONG_HOOK_MARKERS = [
    "?", "!", "never", "always", "secret", "mistake", "won't", "won’t",
    "here's why", "here’s why", "truth", "nobody tells you",
]


def _split_sentences(text: str) -> list[str]:
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    return [s.strip() for s in sentences if s.strip()]


def _score_hook(sentences: list[str]) -> tuple[int, str]:
    if not sentences:
        return 40, "No content to evaluate."

    opening = sentences[0]
    word_count = len(opening.split())
    score = 50

    if any(marker in opening.lower() for marker in STRONG_HOOK_MARKERS):
        score += 20
        evidence = f'Opening uses attention-grabbing language: "{opening}"'
    else:
        evidence = f'Opening is generic/topic-stating: "{opening}"'

    if 5 <= word_count <= 15:
        score += 15
    elif word_count > 25:
        score -= 10

    if any(char.isdigit() for char in opening):
        score += 10

    return max(0, min(100, score)), evidence


def _score_clarity(sentences: list[str]) -> tuple[int, str]:
    if not sentences:
        return 40, "No content to evaluate."

    lengths = [len(s.split()) for s in sentences]
    avg_len = sum(lengths) / len(lengths)

    if avg_len <= 15:
        score = 90
        evidence = f"Average sentence length is {avg_len:.0f} words — easy to follow."
    elif avg_len <= 22:
        score = 75
        evidence = f"Average sentence length is {avg_len:.0f} words — reasonably clear."
    else:
        score = 55
        evidence = f"Average sentence length is {avg_len:.0f} words — some sentences may be hard to follow."

    return score, evidence


def _score_cta(text: str, sentences: list[str]) -> tuple[int, str]:
    lower = text.lower()
    found = [kw for kw in CTA_KEYWORDS if kw in lower]

    if not found:
        return 35, "No clear call-to-action detected."

    last_sentence = sentences[-1].lower() if sentences else ""
    if any(kw in last_sentence for kw in CTA_KEYWORDS):
        return 85, f'Clear CTA near the end: "{sentences[-1]}"'

    return 60, f"CTA language found ({found[0]}), but not positioned as a strong closing action."


def _score_readability(sentences: list[str]) -> tuple[int, str]:
    if not sentences:
        return 40, "No content to evaluate."

    word_counts = [len(s.split()) for s in sentences]
    avg_words = sum(word_counts) / len(word_counts)
    long_sentences = sum(1 for w in word_counts if w > 25)

    score = 90
    if avg_words > 20:
        score -= 15
    if long_sentences > len(sentences) * 0.3:
        score -= 15

    evidence = f"{len(sentences)} sentences, avg {avg_words:.0f} words/sentence, {long_sentences} long sentence(s)."
    return max(0, min(100, score)), evidence


def score_content(text: str) -> dict:
    sentences = _split_sentences(text)

    hook_score, hook_evidence = _score_hook(sentences)
    clarity_score, clarity_evidence = _score_clarity(sentences)
    cta_score, cta_evidence = _score_cta(text, sentences)
    readability_score, readability_evidence = _score_readability(sentences)

    overall = round(
        hook_score * 0.30 +
        clarity_score * 0.25 +
        cta_score * 0.25 +
        readability_score * 0.20
    )

    return {
        "overall_score": overall,
        "dimensions": {
            "hook": {"score": hook_score, "evidence": hook_evidence},
            "clarity": {"score": clarity_score, "evidence": clarity_evidence},
            "cta": {"score": cta_score, "evidence": cta_evidence},
            "readability": {"score": readability_score, "evidence": readability_evidence},
        },
    }