import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.utils.class_weight import compute_class_weight

import tensorflow as tf
from tensorflow.keras.utils import to_categorical

# --------------------------------------------------
# LOAD DATASET (30 plants)
# --------------------------------------------------
df = pd.read_csv("Crop_Recommendation_dataset.csv")

X = df[["soil_type", "region", "environment"]]
y = df["crop"]

# --------------------------------------------------
# ENCODE FEATURES
# --------------------------------------------------
ohe = OneHotEncoder(sparse_output=False)
X_encoded = ohe.fit_transform(X)

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

num_classes = len(np.unique(y_encoded))

y_categorical = to_categorical(y_encoded, num_classes=num_classes)

# --------------------------------------------------
# TRAIN TEST SPLIT
# --------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X_encoded,
    y_categorical,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

# --------------------------------------------------
# COMPUTE CLASS WEIGHTS
# --------------------------------------------------
y_labels = np.argmax(y_train, axis=1)

class_weights = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(y_labels),
    y=y_labels
)

class_weight_dict = dict(enumerate(class_weights))

# --------------------------------------------------
# BUILD MODEL (Stronger for 30 classes)
# --------------------------------------------------
model = tf.keras.Sequential([
    tf.keras.layers.Dense(256, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.BatchNormalization(),

    tf.keras.layers.Dense(256, activation='relu'),
    tf.keras.layers.BatchNormalization(),

    tf.keras.layers.Dense(128, activation='relu'),

    tf.keras.layers.Dense(num_classes, activation='softmax')
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# --------------------------------------------------
# CALLBACKS
# --------------------------------------------------
lr_scheduler = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,
    patience=5,
    verbose=1
)

early_stop = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True,
    verbose=1
)

# --------------------------------------------------
# TRAIN MODEL
# --------------------------------------------------
history = model.fit(
    X_train,
    y_train,
    epochs=300,
    batch_size=32,
    validation_split=0.2,
    class_weight=class_weight_dict,
    callbacks=[lr_scheduler, early_stop],
    verbose=1
)

# --------------------------------------------------
# EVALUATE MODEL
# --------------------------------------------------
y_pred_probs = model.predict(X_test)
y_pred = np.argmax(y_pred_probs, axis=1)
y_true = np.argmax(y_test, axis=1)

accuracy = accuracy_score(y_true, y_pred)
print("\nFinal Test Accuracy:", accuracy)

# --------------------------------------------------
# THEORETICAL MAX ACCURACY
# --------------------------------------------------
max_accuracy = (
    df.groupby(["soil_type","region","environment"])["crop"]
    .value_counts(normalize=True)
    .groupby(level=[0,1,2])
    .max()
    .mean()
)

print("Theoretical max accuracy:", max_accuracy)

# --------------------------------------------------
# CONFUSION MATRIX
# --------------------------------------------------
cm = confusion_matrix(y_true, y_pred)

plt.figure()
plt.imshow(cm)
plt.title("Confusion Matrix - 30 Plants")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.colorbar()
plt.show()

# --------------------------------------------------
# TRAINING CURVES
# --------------------------------------------------
plt.figure()
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title("Model Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend(["Train", "Validation"])
plt.show()

plt.figure()
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title("Model Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend(["Train", "Validation"])
plt.show()

# --------------------------------------------------
# SAVE MODEL & ENCODERS
# --------------------------------------------------
os.makedirs("../app/models", exist_ok=True)

model.save("../app/models/plant_model_top30.keras")
joblib.dump(ohe, "../app/models/onehot_encoder_top30.pkl")
joblib.dump(label_encoder, "../app/models/label_encoder_top30.pkl")

print("\nModel and encoders saved successfully inside 'models/' folder")