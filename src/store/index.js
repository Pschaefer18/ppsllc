import { configureStore, applyMiddleware } from "@reduxjs/toolkit"
import allReducers from "../reducers"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger"
const store = configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  })
export default store;
