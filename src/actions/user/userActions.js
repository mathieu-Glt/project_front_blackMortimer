import axios from "axios";
import requests, { api_url } from "../../services/api/request";
import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE } from "./actions-types";

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

// export const login = (body) => {
//     return (dispatch) => {
//         console.log(body);
//         const data = body;
//         // const data = JSON.stringify(body)

//         console.log("🚀 ~ file: userActions.js:49 ~ return ~ data:", data,
//         {
//             headers: {
//                 'Access-Control-Allow-Origin': 'http://localhost:3000'
//             }
//         }

//         )
//         //TODO ici requête axios post pour le login
//         axios.post(`${api_url}/api/logincheck`, data) 
//         .then((response) => {
//             console.log("resultat de la requête axios post : ", response.data);
            
//             if (response.status === 200) {
//                 dispatch({
//                     type: LOGIN_SUCCESS, payload: {
//                         'email': body.email,
//                         'password': body.password,
//                         'token': response.data.token
//                     }
//                 })

//             }
//         })
//         .catch(error => {
//             console.log("🚀 ~ file: userActions.js:57 ~ return ~ error:", error)
//             dispatch({ type: LOGIN_FAILURE, payload: error.mesage})
            
//         })


//     }
// }