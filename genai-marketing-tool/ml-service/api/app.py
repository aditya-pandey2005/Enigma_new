from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import urllib.parse
import random
import requests
import io

# ✅ Import ML model
from api.ml_model import predict_score

app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# 📦 REQUEST MODELS
# =========================

class ImageRequest(BaseModel):
    product: str
    audience: str
    platform: str
    tone: str

class MLRequest(BaseModel):
    text: str


# =========================
# 🌐 ROOT
# =========================

@app.get("/")
def root():
    return {"message": "Pollinations + ML API running 🚀"}


# =========================
# 🖼 IMAGE GENERATION API
# =========================

@app.post("/generate-image")
def generate_image_api(data: ImageRequest):

    prompt = f"""
Professional product photography of {data.product}.

Scene:
Modern gym environment with dumbbells and workout equipment.

Target audience:
{data.audience}

Platform style:
{data.platform} advertisement

Tone:
{data.tone}

Style:
Vibrant colors, cinematic lighting, high contrast.

Composition:
Product centered, blurred gym background, depth of field.

IMPORTANT:
No text, no letters, no typography, no watermark, no logo.

Quality:
4k, ultra realistic, commercial photography
"""

    encoded_prompt = urllib.parse.quote(prompt)

    seed = random.randint(1, 100000)

    image_url = (
        f"https://image.pollinations.ai/prompt/{encoded_prompt}"
        f"?seed={seed}&nologo=true&enhance=true"
    )

    return {
        "image_url": image_url,
        "status": "Pollinations-generated image",
        "seed": seed
    }


# =========================
# 📥 IMAGE DOWNLOAD PROXY
# =========================

@app.get("/download-image")
def download_image(url: str):
    try:
        response = requests.get(url)

        if response.status_code != 200:
            return {"error": "Failed to fetch image"}

        return StreamingResponse(
            io.BytesIO(response.content),
            media_type="image/png",
            headers={
                "Content-Disposition": "attachment; filename=ai-post.png"
            }
        )
    except Exception as e:
        return {"error": str(e)}


# =========================
# 🤖 ML EVALUATION API
# =========================

@app.post("/ml-evaluate")
def ml_evaluate(data: MLRequest):
    score = predict_score(data.text)

    return {
        "ml_score": score
    }