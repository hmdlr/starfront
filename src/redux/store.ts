import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { alias } from "webext-redux";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import aliases from "./aliases";

const composedEnhancer = composeWithDevTools(
    applyMiddleware(
        alias(aliases),
        thunkMiddleware
    )
);

export const store = createStore(
    reducers,
    composedEnhancer
);
