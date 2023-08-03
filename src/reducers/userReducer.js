import { LOGOUT_USER } from "../actions/auth/actions-types";
import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE, USER_CONNECTED } from "../actions/user/actions-types";

const initialState = {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    loading: false,
    isRegistered: false,
    error: null,
    role: []

}


export default function UserReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                isRegistered: false,
                loading: true,
                error: null
            }
            break;
        case REGISTER_SUCCESS:
            return {
                ...state,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                email: action.payload.email,
                isRegistered: true,
                loading: false,
                error: null
            }
            break;
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.paylaod
            }
            break;
        case USER_CONNECTED:
            return {
                ...state,
                id: action.payload.id,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                email: action.payload.email,
                isRegistered: true,
                loading: false,
                role: action.payload.role,
                error: null
            }
            break;



        default:
            return state;
    }

    return state;
}