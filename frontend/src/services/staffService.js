// =====================================================
// services/staffService.js
// All API calls for Staff
// =====================================================

import axios from "axios";

const BASE = "http://localhost:5000/api/staff";
// const BASE = `${import.meta.env.VITE_API_URL}/api/activities`;
// const BASE = "/api/activities";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getStaff = () => axios.get(BASE);

export const getStaffByCategory = (category) =>
  axios.get(`${BASE}?category=${category}`);

export const createStaff = (formData, token) =>
  axios.post(BASE, formData, authHeader(token));

export const updateStaff = (id, formData, token) =>
  axios.put(`${BASE}/${id}`, formData, authHeader(token));

export const deleteStaff = (id, token) =>
  axios.delete(`${BASE}/${id}`, authHeader(token));