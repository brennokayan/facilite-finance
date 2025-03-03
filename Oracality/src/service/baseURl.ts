import axios from 'axios';

// const baseURL = 'http://localhost:3333';

const baseURL = import.meta.env.VITE_API_URL as string;

export const api = axios.create({
    baseURL
})



