// src/services/accountService.js
import { apiRequest } from "./api";

class AccountService {
  async getAll() {
    return apiRequest("/account");
  }

  async getById(id) {
    return apiRequest(`/account/${id}`);
  }

  async create(accountData) {
    return apiRequest("/account", {
      method: "POST",
      body: accountData,headers: { 'Content-Type': 'application/json' },
    });
  }

  async update(id, accountData) {
    return apiRequest(`/account/${id}`, {
      method: "PUT",headers: { 'Content-Type': 'application/json' },
      body: accountData,
    });
  }

  async delete(id) {
    return apiRequest(`/account/${id}`, {
      method: "DELETE",headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new AccountService();
