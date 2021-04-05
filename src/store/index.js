import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import question from "./question";
import survey from "./survey";

const reducer = combineReducers({
  question,
  survey,
});

const store = configureStore(reducer);

export default store;
