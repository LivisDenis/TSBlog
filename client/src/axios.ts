import axios from "axios";

export const baseUrl = 'http://localhost:5000'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

export default instance