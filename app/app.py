import joblib
import numpy as np
import tensorflow as tf
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load saved model and encoders
model = tf.keras.models.load_model("models/plant_model_top30.keras")
ohe = joblib.load("models/onehot_encoder_top30.pkl")
label_encoder = joblib.load("models/label_encoder_top30.pkl")

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PlantInput(BaseModel):
    soil: str
    region: str
    environment: str

@app.post("/predict")
def predict(data: PlantInput):

    input_data = [[
        data.soil.lower(),
        data.region.lower(),
        data.environment.lower()
    ]]

    input_encoded = ohe.transform(input_data)
    probs = model.predict(input_encoded)[0]

    top_k = 3
    top_indices = np.argsort(probs)[::-1][:top_k]

    plants = label_encoder.inverse_transform(top_indices)
    confidences = probs[top_indices]

    result = []
    for p, c in zip(plants, confidences):
        result.append({
            "plant": p,
            "confidence": float(c)
        })

    return {"recommendations": result}