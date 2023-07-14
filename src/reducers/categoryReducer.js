import { LOAD_CATEGORIES } from "../actions/category/actions-types";


const initialState = {
    categories: []
}


export default function categoryReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case LOAD_CATEGORIES:
            return {
                categories: action.payload
            }
            break;
                        
        default:
            return state
            break;
    }

    return state
}