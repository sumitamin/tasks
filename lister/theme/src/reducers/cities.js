
import {
    RECEIVE_CITIES } from "../constants/ActionTypes";


const initialState = {
    data: []
};


const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CITIES:
            return { ...state,
                data:action.cities
            }
        
        default:
            return state;
    }
};
export default cityReducer;