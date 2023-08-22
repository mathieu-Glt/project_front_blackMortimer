import { ADD_CHARACTER_BASKET, DELETE_CHARACTER_BASKET, LOAD_BASKET } from "../actions/basket/actions-types";

const initialState = {
    basket: [],
}

export default function basketReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case LOAD_BASKET:
            return {
                basket: action.payload
            }
            break;
        case ADD_CHARACTER_BASKET:
            return {
                basket: action.payload
            }
            break;
        case DELETE_CHARACTER_BASKET:
            return {
                basket: action.payload
            }
            break;

        default:
            return state
            break;
    }

    return state
}