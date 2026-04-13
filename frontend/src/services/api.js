// src/services/api.js

const BASE_URL = "http://localhost:3000/api"; // your backend

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        status: response.status,
        message: data.error || data.message || "API Error",
      };
    }

    return data;
  } catch (error) {
    return {
      error: true,
      message: "Network error. Please try again.",
    };
  }
}
