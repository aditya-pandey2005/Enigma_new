import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import Ridge
import pickle
import os

# Load dataset
data_path = os.path.join(os.path.dirname(__file__), "data.csv")
df = pd.read_csv(data_path)

# Features & labels
X = df["text"]
y = df["score"]

# Vectorization
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

# Model
model = Ridge()
model.fit(X_vec, y)

# Save model
model_dir = os.path.dirname(__file__)
with open(os.path.join(model_dir, "model.pkl"), "wb") as f:
    pickle.dump(model, f)

with open(os.path.join(model_dir, "vectorizer.pkl"), "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ Model trained & saved")