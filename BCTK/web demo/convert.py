import pandas as pd
dtypes = {
    "user_id": "int32",
    "item_id": "int32",
    "category_id": "int32",
    "parent_category": "int32",
    "price": "float32",
    "age": "float32",
    "gender": "float32",
    "interaction_value": "float32",
    "hour": "float32",
    "dayofweek": "float32",
    "is_weekend": "float32",
    "hour_sin": "float32",
    "hour_cos": "float32",
    "dayofweek_sin": "float32",
    "dayofweek_cos": "float32",
    "time_diff": "float32",
    "session_id": "int32",
    "timestamp_norm": "float32",
}
# Chuyển từ CSV sang Parquet một lần duy nhất
df = pd.read_csv(
    "datasets/retailrocket_recommender_system_dataset/test.csv", dtype=dtypes
)
df.to_parquet("test.parquet")

# Sau này load cực nhanh và nhẹ
df = pd.read_parquet("test.parquet")
