import axios from 'axios';
import jwt_decode from "jwt-decode";
export const api_url = process.env.REACT_APP_API_URL

export function useApi() {
    // console.log(api_url);
    const token = localStorage.getItem('access_token');
    try {
        const decodedToken = jwt_decode(token);
        console.log("🚀 ~ file: useApi.js:11 ~ useApi ~ decodedToken:", decodedToken)
        const roleUser = decodedToken.roles
        
    } catch (error) {
        console.log("🚀 ~ file: useApi.js:14 ~ useApi ~ error:", error.message)
        window.location.href = "/login"

        
    }

    const api = axios.create({
        baseURL: api_url,
        headers: {
           'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' ,
            // 'Authorization': `Bearer ${token?.access}`
        },
    })

    api.interceptors.request.use((config) => {
        console.log("🚀 ~ file: useApi.js:15 ~ api.interceptors.request.use ~ config:", config);

        const token = localStorage.getItem('access_token');
        console.log("🚀 ~ file: useApi.js:33 ~ api.interceptors.request.use ~ token:", token)
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            console.log("🚀 ~ file: useApi.js:23 ~ api.interceptors.request.use ~ token:", token)
        }
        return config;
    }, error => {
        console.log('error erroe');
        Promise.reject(error)
    })

    api.interceptors.response.use((response) => {
        return response
        
    }, async (error) => {
        // console.log("🚀 ~ file: useApi.js:35 ~ api.interceptors.response.use ~ error:", error.response.status)
        if(error.response && error.response.status === 401) {
            console.log(' error 401 pas autorise');
            console.log('contenu de error.config : ', error.config);
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem('refresh_token')
                
                console.log("🚀 ~ file: useApi.js:43 ~ api.interceptors.response.use ~ refreshToken:", refreshToken)
                if(refreshToken) {
                    console.log("🚀 ~ file: useApi.js:56 ~ api.interceptors.response.use ~ refreshToken:", refreshToken)
                    console.log('Bonjour le nouveau token');
                    const body = {
                        'refresh_token' : refreshToken
                    }
                    console.log("🚀 ~ file: useApi.js:62 ~ api.interceptors.response.use ~ body:", body)
                    const response = await axios.post(`${api_url}/token/refresh`, body)
                    console.log("🚀 ~ file: useApi.js:65 ~ refreshToken ~ response:", response.data)
                    localStorage.setItem('access_token', response.data.token)
                    localStorage.setItem('refresh_token', response.data.refresh_token)
                    
                    console.log("🚀 ~ file: useApi.js:51 ~ api.interceptors.response.use ~ originalRequest:", originalRequest.headers['Authorization'])
                    originalRequest.headers['Authorization'] = 'Bearer ' + response.data.token;
                    return axios(originalRequest);
                } else {
                    console.log('Pas de nouveau token');
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = "/login"
                }
            }
        }
        return Promise.reject(error)
    })

    return api;
}


