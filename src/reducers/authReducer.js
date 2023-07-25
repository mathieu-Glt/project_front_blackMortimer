import { LOGIN_START, LOGOUT_USER, LOGIN_SUCCESS, LOGIN_FAILURE, LOAD_USER_STORAGE } from "../actions/auth/actions-types"

const initialState = {
    token: null,
    refreshToken: null,
    firstname: null,
    lastname: null,
    email: null,
    isLogged: false,
    error: null,
    user: null
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                isLogged: false,
                error: null
            }
            break;
        case LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                refreshToken: action.payload.refresh_token,
                isLogged: true,
                error: null
            }
            break;
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLogged: false
            }
            break;        
        case LOAD_USER_STORAGE:
            return {
                ...state,
                user: action.payload,
                token: action.payload,
                isLogged: true
            }
            break;

        case LOGOUT_USER:
            return {
                ...state,
                error: action.paylaod
            };
            break;

        default:
            return state;
    }

    return state;
}