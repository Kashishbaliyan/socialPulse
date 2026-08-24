import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from services.autopsy_service import build_autopsy
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.simulation_service import simulate_hook_improvement

from services.scoring_service import score_content
from services.dna_service import analyze_content_dna

app = FastAPI(title="SocialPulse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
import os
pytesseract.pytesseract.tesseract_cmd = os.getenv("TESSERACT_CMD", "/usr/bin/tesseract")

ALLOWED_TYPES = {
    "application/pdf": "pdf",
    "image/png": "image",
    "image/jpeg": "image",
}

MIN_TEXT_LENGTH_THRESHOLD = 20


def extract_from_pdf(file_bytes: bytes) -> tuple[str, str]:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text_parts = []
    for page in doc:
        text_parts.append(page.get_text())
    text = "\n".join(text_parts).strip()

    if len(text) >= MIN_TEXT_LENGTH_THRESHOLD:
        return text, "pdf_text_extraction"

    ocr_parts = []
    for page in doc:
        pix = page.get_pixmap(dpi=200)
        img_bytes = pix.tobytes("png")
        img = Image.open(io.BytesIO(img_bytes))
        ocr_parts.append(pytesseract.image_to_string(img))
    ocr_text = "\n".join(ocr_parts).strip()
    return ocr_text, "ocr_fallback_scanned_pdf"


def extract_from_image(file_bytes: bytes) -> tuple[str, str]:
    img = Image.open(io.BytesIO(file_bytes))
    text = pytesseract.image_to_string(img).strip()
    return text, "ocr_image"

class SimulateRequest(BaseModel):
    text: str
@app.get("/")
def root():
    return {"status": "ok", "message": "SocialPulse API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Please upload a PDF, PNG, or JPG."
        )

    contents = await file.read()

    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    category = ALLOWED_TYPES[file.content_type]

    try:
        if category == "pdf":
            text, method = extract_from_pdf(contents)
        else:
            text, method = extract_from_image(contents)
    except Exception:
        raise HTTPException(
            status_code=422,
            detail="We couldn't process this file. Try a clearer image or a different file."
        )

    if len(text.strip()) == 0:
        raise HTTPException(
            status_code=422,
            detail="No readable text was found in this file. Try a clearer image or a text-based PDF."
        )

    scoring = score_content(text)
    autopsy = build_autopsy(scoring)
    content_dna = analyze_content_dna(text)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "file_category": category,
        "size_bytes": len(contents),
        "extraction_method": method,
        "extracted_text": text,
        "character_count": len(text),
        "scoring": scoring,
        "autopsy": autopsy,
        "content_dna": content_dna,
    }
@app.post("/api/simulate")
async def simulate(request: SimulateRequest):
    try:
        result = simulate_hook_improvement(request.text)
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail="AI service is temporarily unavailable. Please try again."
        )
    return result