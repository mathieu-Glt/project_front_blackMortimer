import requests from "../../services/api/request";
import { LOAD_MOVIES, LOAD_MOVIES_FAVORIES, LOAD_ONE_MOVIE_BY_ID, LOAD_MOVIES_RANDOM, LOAD_MOVIES_SEARCH_BY_QUERY } from "./actions-types";
import axios from 'axios';


export const loadMovies = () => {
    return function (dispatch) {
        axios.get(requests.fetchAllTintinDatabaseNotUser, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'

            }
        })
            .then((response) => {
                console.log('Les films de tintin : ', response);
                dispatch({
                    type: LOAD_MOVIES,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}

export const loadOneMovieById = (id) => {
    return function (dispatch) {
        axios.get(requests.fetchMovieById + id)
            .then((response) => {
                console.log(response);
                dispatch({
                    type: LOAD_ONE_MOVIE_BY_ID,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}


export const loadMoviesBySearch = (searchMovie) => {
    return function (dispatch) {
        console.log(searchMovie);
        axios.get(requests.fetchMovieBySearch + searchMovie, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'

            }
        })
            .then((response) => {
                console.log('Les films de la recherche : ', response);
                dispatch({
                    type: LOAD_MOVIES_SEARCH_BY_QUERY,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}




export const loadMoviesFavories = () => {
    return function (dispatch) {
        axios.get(requests.fetchFavoriesMovie)
            .then((response) => {
                console.log(response);
                dispatch({
                    type: LOAD_MOVIES_FAVORIES,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}

export const loadMoviesRandom = () => {
    return function (dispatch) {
        axios.get(requests.fetchMovieRandom)
            .then((response) => {
                console.log(response.data);
                dispatch({
                    type: LOAD_MOVIES_RANDOM,
                    payload: response.data.results
                })
            })
            .catch(err => console.log(err))
    }
}


