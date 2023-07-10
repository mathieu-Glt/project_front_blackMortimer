import requests from "../../services/api/request";
import axios from 'axios';
import { LOAD_CHARACTERS } from "./actions-types";



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
