import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost/api";

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});

export const getRecommendations = async () => {
    return await axiosInstance
        .get("/recommendation/get-recommendation")
        .then((res) => res.data)
        .catch((err) => err);
};

export const swipeRecommendation = async (body: any) => {
    return await axiosInstance
        .patch("/recommendation/swipe-recommendation", body)
        .then((res) => res.data)
        .catch((err) => err);
};
