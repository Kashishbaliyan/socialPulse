DIMENSION_LABELS = {
    "hook": "Hook",
    "clarity": "Clarity",
    "cta": "CTA",
    "readability": "Readability",
}
STRONG_THRESHOLD = 80
WEAK_THRESHOLD = 60
RECOMMENDATIONS = {
    "hook": "Open with a specific claim, number, or question instead of stating the topic.",
    "clarity": "Break up long sentences and simplify complex phrasing.",
    "cta": "End with a specific action tied to the content, not a generic question.",
    "readability": "Shorten sentences and reduce run-ons to make it easier to scan.",
}
def build_autopsy(scoring: dict) -> dict:
    findings = []
    for key, data in scoring["dimensions"].items():
        score = data["score"]
        evidence = data["evidence"]
        label = DIMENSION_LABELS[key]
        if score >= STRONG_THRESHOLD:
            findings.append({
                "type": "strength",
                "dimension": label,
                "score": score,
                "title": f"Strong {label} — {score}/100",
                "evidence": evidence,
                "recommendation": None,
            })
        elif score < WEAK_THRESHOLD:
            findings.append({
                "type": "weakness",
                "dimension": label,
                "score": score,
                "title": f"Weak {label} — {score}/100",
                "evidence": evidence,
                "recommendation": RECOMMENDATIONS[key],
            })
        else:
            findings.append({
                "type": "moderate",
                "dimension": label,
                "score": score,
                "title": f"Moderate {label} — {score}/100",
                "evidence": evidence,
                "recommendation": RECOMMENDATIONS[key],
            })
    # Weaknesses first (most actionable), then moderate, then strengths.
    order = {"weakness": 0, "moderate": 1, "strength": 2}
    findings.sort(key=lambda f: order[f["type"]])
    weakest = min(scoring["dimensions"].items(), key=lambda kv: kv[1]["score"])
    return {
        "overall_score": scoring["overall_score"],
        "findings": findings,
        "top_priority_fix": DIMENSION_LABELS[weakest[0]],
    } 