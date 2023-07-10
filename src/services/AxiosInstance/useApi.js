import axios from 'axios';
export const api_url = process.env.REACT_APP_API_URL

export function useApi() {
    // console.log(api_url);
    // const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token'))

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

        const token = localStorage.getItem('token');
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
                    console.log('Bonjour le nouveau token');
                } else {
                    console.log('Pas de nouveau token');
                }
            }
        }
    })

    return api;
}


