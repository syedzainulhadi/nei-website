// =====================================================
// services/authService.js
// Admin login API call
// =====================================================

import axios from "axios";

// const BASE = "http://localhost:5000/api/admin";
const BASE = `${import.meta.env.VITE_API_URL}/api/admin`;
// const BASE = `${import.meta.env.VITE_API_URL}/api/activities`;
// const BASE = "/api/activities";

export const loginAdmin = (username, password) =>
  axios.post(`${BASE}/login`, { username, password });