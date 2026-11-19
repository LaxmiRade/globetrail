import { configureStore, createSlice } from "@reduxjs/toolkit";

//Slice
const shirtSlice = createSlice({
    name:"Shirt",
    initialState :{
        noOFShirts : 10
    }, 
    reducers :{
        buyshirt:(state) => {
            state.noOFShirts -= 1
        }
    }
});

//Actions 
export const {buyshirt} = shirtSlice.actions;

//Store
const store = configureStore({
    reducer : shirtSlice.reducer
});

//Initial State
console.log("Initial State :", store.getState());

//Subscribe
store.subscribe(() => {
    console.log("Updated State : ", store.getState());
});

//Dispatch Actions 
store.dispatch(buyshirt());
store.dispatch(buyshirt());
store.dispatch(buyshirt());
store.dispatch(buyshirt());

