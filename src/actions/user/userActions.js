import axios from "axios";
import requests, { api_url } from "../../services/api/request";
import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE, USER_CONNECTED } from "./actions-types";
import { useApi } from "../../services/AxiosInstance/useApi";

export const register = (body) => {
    return (dispatch) => {
        console.log(body);
        const data = JSON.stringify(body)
        console.log("🚀 ~ file: userActions.js:9 ~ return ~ data:", data)
        dispatch({ type: REGISTER_START });

        axios.post(`${api_url}/api/register`, data,
            // {
            //     headers: {
            //         'Access-Control-Allow-Origin': 'http://localhost:3000'
            //     }
            // }
        )

            .then((response) => {
                console.log("resultat de la requête axios post : ", response.data.results);

                if (response.status === 201) {
                    dispatch({
                        type: REGISTER_SUCCESS, payload: {
                            'firstname': body.firstname,
                            'lastname': body.lastname,
                            'email': body.email,
                            'password': body.password
                        }
                    })

                } else {
                    console.log('error de la requête axios');
                }

            })
            .catch(error => {
                console.log("erreur de la requête axios post : ", error);
                dispatch({ type: REGISTER_FAILURE, payload: error.message })
            })
    }
}

export const userShow = (email) => {
    return (dispatch) => {
        console.log("🚀 ~ file: userActions.js:46 ~ userShow ~ email:", email)
        const api = useApi();
        const emailStringify = JSON.stringify(email);
        console.log("🚀 ~ file: userActions.js:51 ~ return ~ emailStringify:", emailStringify)
        axios.post(requests.fetchUserConnected, emailStringify)
        .then((response) => {
            console.log("🚀 ~ file: userActions.js:54 ~ .then ~ response:", response.data.results)
            console.log("resultat de la requête axios post : ", response.data.results[0].email);
            if (response.status === 200) {
                dispatch({
                    type: USER_CONNECTED, payload: {
                        'id': response.data.results[0].id,
                        'firstname': response.data.results[0].firstname,
                        'lastname': response.data.results[0].lastname,
                        'email': response.data.results[0].email,
                        'role': response.data.results[0].roles[0]
                    }
                })
            } else {
                console.log('error de la requête axios');
            }

        })
        .catch(error => {
            console.log("🚀 ~ file: userActions.js:54 ~ return ~ error:", error)
            
        })

    }
}

