import jwt_decode from "jwt-decode";
import axios from 'axios';
import requests from "../services/api/request";
import { useState } from "react";


export async function handleStorage() {

    const accessToken = localStorage.getItem('access_token');
    console.log("🚀 ~ file: handleStorage.js:8 ~ accessToken:", accessToken)
    const user =    JSON.parse(localStorage.getItem('user'));
    console.log("🚀 ~ file: handleStorage.js:12 ~ user:", user)
    const refreshToken = localStorage.getItem('refresh_token');
    console.log("🚀 ~ file: handleStorage.js:10 ~ refreshToken:", refreshToken)

    const decodedToken = jwt_decode(accessToken);
    console.log("🚀 ~ file: handleStorage.js:15 ~ decodedToken:", decodedToken)


    // TODO requête axios avec le refresh token vers la table refresh toekn pour recup l'email de l tilisateur
    return axios.get(requests.fetchUser, {
        headers: {
            "Authorization" : `Bearer ${accessToken}`,
            "refresh_token" : `${refreshToken}`
        }
    })
    .then((response) => {
        console.log("L'utilisateur de la recherche' : ", response);
        const user = response.data.results
        console.log("🚀 ~ file: handleStorage.js:30 ~ .then ~ user:", user)
        return Promise.resolve(user);
    })
      .catch(err => {
        console.log('Error error hndlestorage');
        return Promise.reject(err)
    })


      

}