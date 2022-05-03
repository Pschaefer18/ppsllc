import {initialUserInfo} from "../data/userInfo";
import * as actionTypes from "../constants/action-types"
export const userInfoReducer = (state = initialUserInfo, action) => {
    switch (action.type) {
        case actionTypes.SET_INFO:
            return action.payload
        default:
            return state;
    }
}