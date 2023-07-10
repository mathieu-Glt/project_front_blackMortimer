import axios, { AxiosInstance } from 'axios';

export function useApi() {

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers,
    })

    api.interceptors.request.use((config) => {
        // Logique supplémentaire pour modifier la requête
        return config
    })

    api.interceptors.response.use((response) => {
        // Logique supplémentaire pour traiter la réponse
        return response
    }, (error) => {
        // Logique supplémentaire pour traiter les erreurs
        // Pour rediriger : location.href="/route"
        return Promise.reject(error)
    })

    return api
}