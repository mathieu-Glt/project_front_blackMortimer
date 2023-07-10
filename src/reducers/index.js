import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import characterReducer from "./characterReducer";
import authorReducer from "./authorReducer";


const rootReducers = combineReducers({
    movies: movieReducer,
    auth: authReducer,
    user: userReducer,
    characters: characterReducer,
    authors: authorReducer
    
})

export default rootReducers;