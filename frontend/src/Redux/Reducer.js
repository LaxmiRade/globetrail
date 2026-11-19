import { BUY_SHIRT } from "./ActionType"

const initialState = {
    shirts : 10
}

export const shirtReducer = (state= initialState , action) =>{
    switch(action.type){
        case BUY_SHIRT :
            return {
                shirts : state.shirts - 1
            }
        default:
            return state    
    }
}