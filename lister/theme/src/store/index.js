import { createStore, applyMiddleware, compose } from 'redux';
// middlewares
import thunkMiddleware from 'redux-thunk'

// Import custom components
import rootReducer from '../reducers';

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

/**
 * Create a Redux store that holds the app state.
 */
const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(
        thunkMiddleware,
        ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
        return f;
    }
));

export default store;