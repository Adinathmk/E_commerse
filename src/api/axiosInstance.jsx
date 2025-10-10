// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // JSON Server URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default axiosInstance;
