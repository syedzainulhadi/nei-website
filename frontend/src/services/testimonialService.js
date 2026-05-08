import axios from "axios";

const BASE = "http://localhost:5000/api/testimonials";
// const BASE = `${import.meta.env.VITE_API_URL}/api/activities`;
// const BASE = "/api/activities";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getTestimonials    = ()               => axios.get(BASE);
export const createTestimonial  = (data, token)    => axios.post(BASE, data, authHeader(token));
export const updateTestimonial  = (id, data, token)=> axios.put(`${BASE}/${id}`, data, authHeader(token));
export const deleteTestimonial  = (id, token)      => axios.delete(`${BASE}/${id}`, authHeader(token));