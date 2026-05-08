import axios from "axios";

// const BASE = "http://localhost:5000/api/achievements";
// const BASE = `${import.meta.env.VITE_API_URL}/api/activities`;
// const BASE = "/api/activities";
const BASE = `${import.meta.env.VITE_API_URL}/api/achievements`;

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getAchievements   = ()           => axios.get(BASE);
export const createAchievement = (fd, token)  => axios.post(BASE, fd, authHeader(token));
export const updateAchievement = (id, fd, token) => axios.put(`${BASE}/${id}`, fd, authHeader(token));
export const deleteAchievement = (id, token)  => axios.delete(`${BASE}/${id}`, authHeader(token));