import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import characterReducer from "./characterReducer";
import authorReducer from "./authorReducer";
import categoryReducer from "./categoryReducer";
import auteurReducer from "./auteurReducer";


const rootReducers = combineReducers({
    movies: movieReducer,
    auth: authReducer,
    user: userReducer,
    characters: characterReducer,
    authors: authorReducer,
    categories: categoryReducer,
    auteurs: auteurReducer
    
})

export default rootReducers;