import axios from "axios";

const api = axios.create({
  baseURL: "https://newsnest-backend.onrender.com/",
  withCredentials: true,
});

export default api;
