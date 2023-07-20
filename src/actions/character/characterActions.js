import requests from "../../services/api/request";
import axios from 'axios';
import { LOAD_CHARACTERS, LOAD_ONE_CHARACTER_BY_ID } from "./actions-types";



export const loadCharacters = () => {
    return function (dispatch) {
        axios.get(requests.fetchAllCharacters, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'

            }
        })
            .then((response) => {
                console.log('Les personnages de Tintin : ', response);
                dispatch({
                    type: LOAD_CHARACTERS,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}

export const loadOneCharacterById = (id) => {
    return function (dispatch) {
        // const api = useApi();

        axios.get(requests.fetchCharacterById + id)
            .then((response) => {
                console.log(response);
                dispatch({
                    type: LOAD_ONE_CHARACTER_BY_ID,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}

