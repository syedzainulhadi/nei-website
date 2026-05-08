import axios from "axios";

// const BASE = "http://localhost:5000/api/videos";
// const BASE = `${import.meta.env.VITE_API_URL}/api/activities`;
// const BASE = "/api/activities";
const BASE = `${import.meta.env.VITE_API_URL}/api/videos`;

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getVideos      = ()                => axios.get(BASE);
export const createVideo    = (fd, token)       => axios.post(BASE, fd, authHeader(token));
export const updateVideo    = (id, data, token) => axios.put(`${BASE}/${id}`, data, authHeader(token));
export const deleteVideo    = (id, token)       => axios.delete(`${BASE}/${id}`, authHeader(token));

// Pin / Unpin
export const pinVideo = (id, pinned, token) =>
  axios.patch(`${BASE}/${id}/pin`, { pinned }, authHeader(token));