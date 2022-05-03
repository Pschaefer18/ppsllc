import { configureStore, applyMiddleware } from "@reduxjs/toolkit"
import allReducers from "../reducers"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger"
var store = configureStore({reducer: allReducers, middleWare: [thunk, logger]});

export default store;