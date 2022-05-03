import { cartReducer } from "./cart-reducers"
import { userInfoReducer } from "./userInfo-reducer";
import { plantsReducer } from "./plants-reducer";
import { combineReducers } from "redux"

var allReducers = combineReducers({ plants: plantsReducer, cart: cartReducer, userInfo: userInfoReducer});
export default allReducers;