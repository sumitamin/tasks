import shop from "../api/shop";
import * as types from "../constants/ActionTypes";


////// All Cities

export const receiveCities = cities => ({
  type: types.RECEIVE_CITIES,
  cities
});
export const getAllCities = () => dispatch => {
    shop.getCities(cities => {
        dispatch(receiveCities(cities));
        return cities;
    });
};
