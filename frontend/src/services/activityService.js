import axios from "axios";

const BASE = "http://localhost:5000/api/activities";
// const BASE = `${import.meta.env.VITE_API_URL}/api/activities`;
// const BASE = "/api/activities";
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getActivities    = ()               => axios.get(BASE);
export const getActivityById  = (id)             => axios.get(`${BASE}/${id}`);
export const createActivity   = (fd, token)      => axios.post(BASE, fd, authHeader(token));
export const updateActivity   = (id, fd, token)  => axios.put(`${BASE}/${id}`, fd, authHeader(token));
export const deleteActivity   = (id, token)      => axios.delete(`${BASE}/${id}`, authHeader(token));

// Pin / Unpin
export const pinActivity = (id, pinned, token) =>
  axios.patch(`${BASE}/${id}/pin`, { pinned }, authHeader(token));