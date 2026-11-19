import { configureStore } from "@reduxjs/toolkit";


//State
const initialStock = {
    noOfShirts: 10
}

//Action Type
const BUY_SHIRT = "BUY_SHIRT";

//Action Creator
const buyshirt = ()=>{
    //return action object 
    return {
        type: BUY_SHIRT
    }
}

//Reducer
//Updates state based upon action type
const shirtReducer = (state=initialStock, action) => {
    switch(action.type){
        case BUY_SHIRT:
        return{
            noOfShirts : state.noOfShirts -1
        }
     default :
     return state   
    }
}

//Store
const store =  configureStore({reducer: shirtReducer})

//Initial State
console.log('Initial State :' , store.getState());

//Updated State
store.subscribe(() => {
    console.log('Updated State :', store.getState());
})

store.dispatch(buyshirt());
store.dispatch(buyshirt());
