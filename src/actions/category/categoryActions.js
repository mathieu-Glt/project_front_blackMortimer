import axios from "axios";
import requests from "../../services/api/request";
import { LOAD_CATEGORIES } from "./actions-types";



export const loadCategories = () => {
    return function (dispatch) {
        axios.get(requests.fetchAllCategories, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'

            }
        })
            .then((response) => {
                console.log('Les categories des BD : ', response);
                dispatch({
                    type: LOAD_CATEGORIES,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}
