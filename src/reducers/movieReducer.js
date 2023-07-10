import { LOAD_MOVIES, LOAD_MOVIES_FAVORIES, LOAD_ONE_MOVIE_BY_ID, LOAD_MOVIES_RANDOM, LOAD_MOVIES_SEARCH_BY_QUERY } from "../actions/movie/actions-types";
const initialState = {
    movies: [],
}

export default function movieReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case LOAD_MOVIES:
            return {
                movies: action.payload
            }
            break;
        case LOAD_MOVIES_FAVORIES:
            return {
                movies: action.payload
            }
            break;
        case LOAD_ONE_MOVIE_BY_ID:
                return {
                    movies: action.payload
                }
                break;
        case LOAD_MOVIES_RANDOM:
                return {
                     movies: action.payload
                }
                break;
        case LOAD_MOVIES_SEARCH_BY_QUERY:
                return {
                    movies: action.payload
                }
                break;
                        
        default:
            return state
            break;
    }

    return state
}