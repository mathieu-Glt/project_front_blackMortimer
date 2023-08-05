import axios from 'axios';
import jwt_decode from "jwt-decode";
import { destroyTokenUser } from '../../utils/destroyToken';
import { refreshTokenUser } from '../../utils/refreshToken';

export const api_url = process.env.REACT_APP_API_URL

export function useApi() {
    // console.log(api_url);

    const api = axios.create({
        baseURL: api_url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': `Bearer ${token?.access}`
        },
    })

    api.interceptors.request.use((config) => {

        const token = localStorage.getItem('access_token');
        console.log("🚀 ~ file: useApi.j:21 ~ api.interceptors.request.use ~ token:", token)
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    }, error => {
        Promise.reject(error)
    })

    api.interceptors.response.use((response) => {
        console.log("🚀 ~ file: useApi.js:34 ~ api.interceptors.request.use ~ config:", response)

        return response

    }, async (error) => {
        // console.log("🚀 ~ file: useApi.js:35 ~ api.interceptors.response.use ~ error:", error.response.status)
        if (error.response && error.response.status === 401) {

            const originalRequest = error.config;
            console.log("🚀 ~ file: useApi.js:42 ~ api.interceptors.response.use ~ originalRequest:", originalRequest)

            if (!originalRequest._retry) {
                // pour éviter boucle infinie du refreshToken
                originalRequest._retry = true;
            }
            // récupérer le refreshToken localStorage
            const refreshToken = localStorage.getItem('refresh_token')
            if (refreshToken) {
                try {
                    const results = await refreshTokenUser();
                    console.log("🚀 ~ file: useApi.js:52 ~ api.interceptors.response.use ~ results:", results)
                } catch (error) {
                    destroyTokenUser();
                    window.location.href('/login')
                }
            } else {
                destroyTokenUser();
                window.location.href('/login')
            }
            if (error.response && error.response.status === 500) {
                destroyTokenUser();
                window.location.href('/login')
            }


        }
        return Promise.reject(error)
    })
    return api;
}


