import axios from "axios";

// Update this if your backend runs on a different host/port
export const API_BASE = "http://localhost:8888/pages";

const api = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (payload) => api.post("/register", payload);
export const loginUser = (payload) => api.post("/login", payload);
export const getDashboard = () => api.get("/dashboard");

export default api;
