import {initialCart} from "../data/cart";
import * as actionTypes from "../constants/action-types"

export const cartReducer = (state = initialCart, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM:
            return [...state, action.payload]
        case actionTypes.REMOVE_ITEM:
            return state.filter(item => item.recId != action.payload)

        default:
            return state;
    }
}