import axios from "axios";

export const api = axios.create({
    baseURL: "https://desafio-fullstack-tau.vercel.app",
})