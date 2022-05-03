import * as actionTypes from "../constants/action-types";

export const setUserInformation = (info) => {
    return {
        type: actionTypes.SET_INFO,
        payload: info
    }
}