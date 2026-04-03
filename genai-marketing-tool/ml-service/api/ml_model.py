import pickle
import os

# Get the models directory path
models_dir = os.path.join(os.path.dirname(__file__), '..', 'models')

# Load model & vectorizer
with open(os.path.join(models_dir, "model.pkl"), "rb") as f:
    model = pickle.load(f)

with open(os.path.join(models_dir, "vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)


def predict_score(text):
    X = vectorizer.transform([text])
    score = model.predict(X)[0]

    # normalize to 0–10
    score = max(0, min(10, round(score, 2)))

    return score