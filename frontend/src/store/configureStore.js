import {createBrowserHistory} from "history";
import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import createRootReducer from './reducers'
import thunk from "redux-thunk";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunk,
    routerMiddleware(history),
    sagaMiddleware,
    localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

export const store = createStore(createRootReducer(history), persistedState, enhancers);

store.replaceReducer(createRootReducer(history))

export default store;