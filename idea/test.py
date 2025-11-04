import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Tạo ma trận R (4 người dùng x 5 sản phẩm)
R = np.array([[5, 3, 0, 1, 0], [4, 0, 0, 1, 0], [1, 1, 0, 5, 4], [0, 0, 5, 4, 0]])

# Áp dụng SVD
U, s, VT = np.linalg.svd(R, full_matrices=False)
Sigma = np.diag(s)

# Giảm số chiều xuống k=2 (ví dụ: 2 đặc trưng tiềm ẩn)
k = 2
U_k = U[:, :k]
Sigma_k = Sigma[:k, :k]
VT_k = VT[:k, :]

# Thiết lập đồ thị
fig, axs = plt.subplots(1, 4, figsize=(16, 4))
sns.heatmap(R, cmap="Blues", cbar=True, annot=True, ax=axs[0])
axs[0].set_title("Ma trận R (4x5)")
axs[0].set_xlabel("Sản phẩm")
axs[0].set_ylabel("Người dùng")

sns.heatmap(U_k, cmap="Greens", cbar=True, annot=True, ax=axs[1])
axs[1].set_title("U (4x2)")
axs[1].set_xlabel("Đặc trưng ẩn")
axs[1].set_ylabel("Người dùng")

sns.heatmap(Sigma_k, cmap="Oranges", cbar=True, annot=True, ax=axs[2])
axs[2].set_title("Σ (2x2)")
axs[2].set_xlabel("Đặc trưng ẩn")
axs[2].set_ylabel("Đặc trưng ẩn")

sns.heatmap(VT_k, cmap="Purples", cbar=True, annot=True, ax=axs[3])
axs[3].set_title("Vᵀ (2x5)")
axs[3].set_xlabel("Sản phẩm")
axs[3].set_ylabel("Đặc trưng ẩn")

plt.tight_layout()
plt.suptitle("Phân rã ma trận R ≈ UΣVᵀ bằng SVD (k=2)", y=1.05, fontsize=16)
plt.show()
