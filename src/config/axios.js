import axios from "axios";

const instance = axios.create();
// instance.baseURL = 'https://api.example.com';  
// instance.config.headers['User-Agent'] = "axios 0.21.1"
// // instance.timeout = 10000dsd

export const api = instance