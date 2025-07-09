import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const resetPassword = async (email) => {
    const response = await api.post("/", {email})
    return response.data;
}