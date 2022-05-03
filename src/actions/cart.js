import * as actionTypes from "../constants/action-types";

export const addItemToCart = (item) => {
    return {
        type: actionTypes.ADD_ITEM,
        payload: item
    }
}

export const removeItemFromCart = (index) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        payload: index
    }
}