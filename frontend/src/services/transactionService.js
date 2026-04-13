// src/services/transactionService.js
import { apiRequest } from "./api";

class TransactionService {
  async getAll(limit = null) {
    const endpoint = limit ? `/transaction?limit=${limit}` : "/transactions";
    return apiRequest(endpoint);
  }

  async getMonthlySummary(year = null, month = null) {
    const now = new Date();
    const params = new URLSearchParams();
    
    if (year) params.append('year', year);
    if (month) params.append('month', month);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/transaction/summary?${queryString}` : "/transaction/summary";
    
    return apiRequest(endpoint);
  }

  async create(transactionData) {
    return apiRequest("/transaction", {
      method: "POST",
      body: transactionData,
    });
  }

  async update(id, transactionData) {
    return apiRequest(`/transaction/${id}`, {
      method: "PUT",
      body: transactionData,
    });
  }

  async delete(id) {
    return apiRequest(`/transaction/${id}`, {
      method: "DELETE",
    });
  }
}

export default new TransactionService();
