import requests from "../../services/api/request";
import axios from 'axios';
import { LOAD_AUTHORS } from "./actions-type";



export const loadAuthors = () => {
    return function (dispatch) {
        axios.get(requests.fetchAllAutors, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'

            }
        })
            .then((response) => {
                console.log('Les auteurs des BD : ', response);
                dispatch({
                    type: LOAD_AUTHORS,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}


