import { LOAD_AUTHORS } from "../actions/author/actions-types";


const initialState = {
    authors: [],
}

export default function authorReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case LOAD_AUTHORS:
            return {
                authors: action.payload
            }
            break;
            
        default:
            return state
            break;
    }

    return state
}