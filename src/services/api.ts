import axios from "axios";

const API = axios.create({
    baseURL: "https://expense-tracker-backend-syad.onrender.com/api",
    // baseURL: "http://localhost:3000/api"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    // 🔥 Public routes (no token needed)
    const publicRoutes = [
        "/auth/login",
        "/auth/register",
        "/auth/google",
        "/auth/forgot-password",
        "/auth/reset-password",
    ];

    if (publicRoutes.some((route) => req.url?.includes(route))) {
        return req;
    }

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;