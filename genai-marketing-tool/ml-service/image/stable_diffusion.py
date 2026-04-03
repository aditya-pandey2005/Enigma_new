from diffusers import StableDiffusionPipeline
import torch

pipe = None  # DO NOT LOAD HERE

def load_model():
    global pipe
    if pipe is None:
        print("Loading Stable Diffusion model...")
        pipe = StableDiffusionPipeline.from_pretrained(
            "runwayml/stable-diffusion-v1-5"
        )
        pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")
    return pipe


def generate_image(prompt):
    model = load_model()
    image = model(prompt).images[0]
    image.save("generated.png")
    return "generated.png"