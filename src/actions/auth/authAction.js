import requests from "../../services/api/request";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } from "./actions-types";
import axios from 'axios';
import { api_url } from "../../services/api/request";


export const login = (body) => {
    return (dispatch) => {
        console.log(body);
        const data = body;
        dispatch({ type: LOGIN_START });

        // const data = JSON.stringify(body)

        console.log("🚀 ~ file: userActions.js:49 ~ return ~ data:", data,
        {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }

        )
        //TODO ici requête axios post pour le login
        axios.post(`${api_url}/api/authentication`, data) 
        .then((response) => {
            console.log("resultat de la requête axios post : ", response.data);
            
            if (response.status === 200) {
                dispatch({
                    type: LOGIN_SUCCESS, payload: {
                        'email': body.email,
                        'password': body.password,
                        'token': response.data.token,
                        'refresh_token': response.data.refresh_token
                    }
                })
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refresh_token);

            }
        })
        .catch(error => {
            console.log("🚀 ~ file: userActions.js:57 ~ return ~ error:", error)
            dispatch({ type: LOGIN_FAILURE, payload: error.mesage})
            
        })


    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_USER });
    }
}
