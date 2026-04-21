import axios from "axios";

const API_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Jobs API endpoints
export const fetchJobs = () => api.get("/jobs");
export const fetchJob = (jobId) => api.get(`/jobs/${jobId}`);
export const createJob = (job) => api.post("/jobs", job);
export const updateJob = (jobId, job) => api.put(`/jobs/${jobId}`, job);
export const deleteJob = (jobId) => api.delete(`/jobs/${jobId}`);

export default api;
