// import axios from "axios";
// import { useApi } from "../services/AxiosInstance/useApi";
// export const api_url = process.env.REACT_APP_API_URL
const axios = require('axios');
const useApi = require('../services/AxiosInstance/useApi');
const { default: requests } = require('../services/api/request');


async function refreshTokenUser() {
    

    const refreshToken = localStorage.getItem('refresh_token');
    const body = {
        'refresh_token' : refreshToken
    }
    console.log("🚀 ~ file: auth.js:12 ~ Authenticated ~ body:", body)
    try {
        const refreshToken = await axios.post(requests.refreshToken, body)
        console.log("🚀 ~ file: auth.js:18 ~ Authenticated ~ refreshToken:", refreshToken)
        return refreshToken;
    } catch (error) {
        throw new Error("Echec du refreshToken " + error)
    }


}
module.exports = {
    refreshTokenUser
}