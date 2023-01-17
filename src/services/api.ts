import axios from 'axios';
import { AppError } from '../utils/AppError';


const api = axios.create({
    baseURL: '',
});

// api.interceptors.request.use((config) => {
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

api.interceptors.response.use(res => res, error => {
    if(error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
    } else {
        return Promise.reject(error);
    }
})

export { api }