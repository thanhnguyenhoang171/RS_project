import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["XLA_FLAGS"] = "--xla_hlo_profile=false --xla_dump_to="

import warnings
import absl.logging

warnings.filterwarnings("ignore")
absl.logging.set_verbosity(absl.logging.FATAL)

import tensorflow as tf

tf.get_logger().setLevel("ERROR")

import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from tensorflow.keras.metrics import AUC, Precision, Recall

# Load dữ liệu test đã được chuyển sang parquet cho nhanh
test = pd.read_parquet("datasets/retailrocket_recommender_system_dataset/test.parquet")

class_weights_dict = {
    0: 0.3448122847956183,
    1: 13.203563749252517,
    2: 41.435008284921444,
}
class_weights_np = np.array(list(class_weights_dict.values()))


def focal_loss_with_class_weights(class_weights, gamma=2.0):
    def loss(y_true, y_pred):
        y_pred = tf.clip_by_value(y_pred, 1e-7, 1.0)
        cross_entropy = -y_true * tf.math.log(y_pred)
        focal = tf.pow(1 - y_pred, gamma)
        class_weights_tensor = tf.constant(class_weights, dtype=tf.float32)
        weighted_focal = class_weights_tensor * focal * cross_entropy
        return tf.reduce_mean(tf.reduce_sum(weighted_focal, axis=-1))

    return loss


# Load mô hình với custom loss và metrics
model = load_model(
    "model_saved/Implicit_LightFM_DNNs/best_model_finetune.keras",
    custom_objects={
        "loss": focal_loss_with_class_weights(
            class_weights=class_weights_np, gamma=2.0
        ),
        "auc": AUC(),
        "precision": Precision(),
        "recall": Recall(),
    },
)

# Tạo groupby để truy cập dữ liệu nhanh theo user_id
test_grouped = test.groupby("user_id")
unique_users = list(test_grouped.groups.keys())
print(f" - Total user in test set: {len(unique_users)}")

# Chọn ngẫu nhiên một user
sample_user = np.random.choice(unique_users)
user_data = test_grouped.get_group(sample_user)

print(f" - Found {len(user_data)} interactions for user {sample_user}")

# Chuẩn bị input cho mô hình từ user_data
sample_inputs = [
    np.full(len(user_data), sample_user, dtype=np.int32),
    user_data["item_id"].values,
    user_data["category_id"].values,
    user_data["parent_category"].values,
    user_data["timestamp_norm"].values,
    user_data["price"].values,
    user_data["age"].values,
    user_data["gender"].values,
    user_data["hour"].values,
    user_data["dayofweek"].values,
    user_data["is_weekend"].values,
    user_data["hour_sin"].values,
    user_data["hour_cos"].values,
    user_data["dayofweek_sin"].values,
    user_data["dayofweek_cos"].values,
    user_data["time_diff"].values,
    user_data["session_id"].values,
]

# Dự đoán xác suất với batch_size lớn hơn và verbose=0
predicted_probs = model.predict(sample_inputs, batch_size=512, verbose=0)

# Xác định số lượng sản phẩm tối đa có thể đề xuất
max_possible_recommendations = len(predicted_probs)
top_k = min(5, max_possible_recommendations)  # Đảm bảo không vượt quá số lượng có sẵn

if top_k > 0:
    # Lấy top k sản phẩm có xác suất giao dịch cao nhất
    top_indices = np.argsort(-predicted_probs[:, 2])[:top_k]  # Sắp xếp giảm dần

    print(f"\n TOP {top_k} RECOMMENDED PRODUCTS FOR USER {sample_user}:")
    print(
        "{:<10} {:<15} {:<10} {:<10} {:<15}".format(
            "STT", "Product ID", "View Prob", "Cart Prob", "Transaction Prob"
        )
    )
    print("-" * 60)

    for i, idx in enumerate(top_indices, 1):
        product_id = sample_inputs[1][idx]
        probs = predicted_probs[idx]
        print(
            "{:<10} {:<15} {:<10.2f} {:<10.2f} {:<15.2f}".format(
                i, product_id, probs[0], probs[1], probs[2]
            )
        )
else:
    print(f"\n No recommendations available for user {sample_user} (no interactions)")
