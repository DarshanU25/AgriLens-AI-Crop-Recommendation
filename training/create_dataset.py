import pandas as pd
import random

# --------------------------------
# INPUT FEATURES
# --------------------------------
soil_types = ["sandy", "clay", "loamy", "peaty", "silty"]
regions = ["tropical", "subtropical", "temperate", "arid"]
environments = ["hot", "moderate", "cold"]

# --------------------------------
# 30 CROPS
# --------------------------------
crops = [
"Rice","Wheat","Maize","Barley","Sorghum","Millet","Oats",
"Cotton","Sugarcane","Groundnut","Soybean","Mustard","Sunflower",
"Potato","Tomato","Onion","Garlic","Cabbage","Cauliflower",
"Carrot","Peas","Chickpea","Lentil","Turmeric","Ginger",
"Banana","Mango","Grapes","Coconut","Coffee"
]

# --------------------------------
# CREATE UNIQUE ZONES
# --------------------------------
all_combinations = [(s,r,e) for s in soil_types for r in regions for e in environments]
random.shuffle(all_combinations)

crop_zones = {}
zones_per_crop = 2  # 2 dominant conditions per crop

for i, crop in enumerate(crops):
    start = i * zones_per_crop
    crop_zones[crop] = all_combinations[start:start+zones_per_crop]

# --------------------------------
# DATA GENERATION
# --------------------------------
rows = []
samples_per_crop = 100
noise_percentage = 0.01  # minimal noise

for crop in crops:
    zones = crop_zones[crop]

    for _ in range(samples_per_crop):

        if random.random() < noise_percentage:
            soil = random.choice(soil_types)
            region = random.choice(regions)
            env = random.choice(environments)
        else:
            soil, region, env = random.choice(zones)

        rows.append([soil, region, env, crop])

df = pd.DataFrame(rows, columns=["soil_type", "region", "environment", "crop"])

df = df.sample(frac=1).reset_index(drop=True)

df.to_csv("balanced_top30_crop_dataset.csv", index=False)

print("Crop dataset created successfully")
print("Total rows:", len(df))
print("Crop distribution:")
print(df["crop"].value_counts())