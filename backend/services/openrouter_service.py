import json
import os
from urllib import error, request


def generate_text(prompt: str) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not configured.")

    payload = json.dumps({
        "model": os.getenv("OPENROUTER_MODEL", "openrouter/auto"),
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("OPENROUTER_SITE_URL", "http://localhost:5173"),
        "X-Title": "SocialPulse",
    }
    http_request = request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=payload,
        headers=headers,
        method="POST",
    )

    try:
        with request.urlopen(http_request, timeout=45) as response:
            result = json.loads(response.read().decode("utf-8"))
    except (error.HTTPError, error.URLError, TimeoutError) as exc:
        raise RuntimeError("OpenRouter request failed.") from exc

    try:
        content = result["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError("OpenRouter returned an unexpected response.") from exc

    if not isinstance(content, str) or not content.strip():
        raise RuntimeError("OpenRouter returned an empty response.")
    return content.strip()