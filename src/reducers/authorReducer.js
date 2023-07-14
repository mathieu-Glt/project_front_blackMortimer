import { LOAD_AUTHORS_BY_NAME_ARTIST } from "../actions/author/actions-types";


const initialState = {
    author: ""
}

export default function authorReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case LOAD_AUTHORS_BY_NAME_ARTIST:
            return {
                author: action.payload
            }
            break;

        default:
            return state
            break;
    }

    return state
}