import { combineReducers } from 'redux';
import cityReducer from './cities';


const appReducer = combineReducers({
    cities:cityReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    if (action.type === 'CLEAR_ALL_STATE') {
        state = undefined
    }
    
    return appReducer(state, action)
}

export default rootReducer;