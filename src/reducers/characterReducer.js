import { LOAD_CHARACTERS } from "../actions/character/actions-types";

const initialState = {
    characters: [],
}

export default function characterReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case LOAD_CHARACTERS:
            return {
                characters: action.payload
            }
            break;
            
        default:
            return state
            break;
    }

    return state
}