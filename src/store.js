import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from "./reducers";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducers, composedEnhancer);

export default store;