import requests from "../../services/api/request.js";
import { ADD_CHARACTER_BASKET, DELETE_CHARACTER_BASKET, LOAD_BASKET } from "./actions-types.js";
import axios from 'axios';

export const loadBasket = () => {
    return function (dispatch) {
        const basket = localStorage.getItem("character");
        console.log("🚀 ~ file: basketActions.js:9 ~ basket:", JSON.parse(basket))
        dispatch({
            type: 'LOAD_BASKET',
            payload: JSON.parse(basket)
        })

    }
}

// export const addCharacterBasket = (id) => {
//     console.log("🚀 ~ file: basketActions.js:11 ~ addCharacterBasket ~ id:", id)
//     return function (dispatch) {
//         axios.get(requests.fetchCharacterById + id)
//             .then((response) => {
//                 console.log("🚀 ~ file: basketActions.js:16 ~ .then ~ response:", response)
//                 dispatch({
//                     type: 'ADD_CHARACTER_BASKET',
//                     payload: response.data.results
//                 })

//             })
//             .catch(err => console.log(err))
//     }
// }


// export const deleteCharacterBasket = (id) => {
//     console.log("🚀 ~ file: basketActions.js:19 ~ deleteCharacterBasket ~ id:", id)
//     return function (dispatch) {
//         dispatch({
//             type: 'DELETE_CHARACTER_BASKET',
//             payload: id
//         })
//     }
// }


