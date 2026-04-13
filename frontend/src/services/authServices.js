// src/services/AuthService.js
import { apiRequest } from "./api";

class AuthService {
  async login(credentials) {
    const data = await apiRequest("/user/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: credentials,
    });

    if (data.error) return data;

    localStorage.setItem('token', data.token);
    return data;
  }

  async register(userData) {
    return apiRequest("/user/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: userData,
    });
  }

  getProfile() {
    return apiRequest("/auth/profile");
  }
}

export default new AuthService();
