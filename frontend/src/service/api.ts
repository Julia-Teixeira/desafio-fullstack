import axios from "axios";

export const api = axios.create({
    baseURL: "https://desafio-fullstack-977p.onrender.com",
})