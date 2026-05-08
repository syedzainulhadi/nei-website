import axios from "axios";

// const BASE = "http://localhost:5000/api/nccnss";
const BASE = `${import.meta.env.VITE_API_URL}/api/achievements`;// const BASE = `${import.meta.env.VITE_API_URL}/api/activities`;
// const BASE = "/api/activities";

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getNccNss      = ()               => axios.get(BASE);
export const createNccNss   = (fd, token)      => axios.post(BASE, fd, authHeader(token));
export const updateNccNss   = (id, fd, token)  => axios.put(`${BASE}/${id}`, fd, authHeader(token));
export const deleteNccNss   = (id, token)      => axios.delete(`${BASE}/${id}`, authHeader(token));

// Pin / Unpin
export const pinNccNss = (id, pinned, token) =>
  axios.patch(`${BASE}/${id}/pin`, { pinned }, authHeader(token));