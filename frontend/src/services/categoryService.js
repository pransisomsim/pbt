// src/services/categoryService.js
import { apiRequest } from "./api";

class CategoryService {
  async getAll() {
    return apiRequest("/categories");
  }

  async create(categoryData) {
    return apiRequest("/categories", {
      method: "POST",
      body: categoryData,
    });
  }

  async delete(id) {
    return apiRequest(`/categories/${id}`, {
      method: "DELETE",
    });
  }
}

export default new CategoryService();
