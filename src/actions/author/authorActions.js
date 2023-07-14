import requests from "../../services/api/request";
import axios from 'axios';
import { LOAD_AUTHORS_BY_NAME_ARTIST } from "./actions-types";




export const loadAuthorsByNameArtist = () => {
    return function (dispatch) {
        axios.get(requests.fetchAllAuthorsByNameArtist, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'

            }
        })
            .then((response) => {
                console.log('Les auteurs par nom artiste  : ', response.data.results);
                const authors = response.data.results;
                console.log("🚀 ~ file: authorActions.js:39 ~ .then ~ authors:", authors)
                const author = []
                for (let i = 0; i < authors.length; i++) {
                    const value = authors[i];
                    author.push(value)
                    console.log("🚀 ~ file: authorActions.js:42 ~ .then ~ author:", author)
                    
                }
                

                dispatch({
                    type: LOAD_AUTHORS_BY_NAME_ARTIST,
                    payload: author
                })
            })
            .catch(err => console.log(err))
    }
}

