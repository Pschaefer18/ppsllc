import {initialPlants} from "../data/plants";
import * as actionTypes from "../constants/action-types"
export const plantsReducer = (state = initialPlants, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PLANTS:
            return action.payload
        default:
            return state;
    }
}