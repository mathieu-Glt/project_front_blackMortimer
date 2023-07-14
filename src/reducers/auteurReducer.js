import { LOAD_AUTHORS } from "../actions/auteur/actions-type";


const initialState = {
    authors: [],
}

export default function auteurReducer(state = initialState, action) {
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