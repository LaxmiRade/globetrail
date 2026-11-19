import { configureStore } from "@reduxjs/toolkit";
import { shirtReducer } from "./Reducer";

 export const store = configureStore({reducer: shirtReducer})