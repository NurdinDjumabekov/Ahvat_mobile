import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateSlice from "./reducers/stateSlice";
import requestSlice from "./reducers/requestSlice";
import saveDataSlice from "./reducers/saveDataSlice";

const reducer = combineReducers({
  stateSlice,
  requestSlice,
  saveDataSlice,
});
export const store = configureStore({
  reducer,
});
