import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { thunk } from "redux-thunk";

//State
const initialState = {
    loading : false,
    users : [],
    errro : null
}

//Action Type
const FETCH_USERS_REQUEST ="FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS ="FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE ="FETCH_USERS_FAILURE";

//Action Creators
const fetchUsersRequest = () => {
    //return action object
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users//It Holds data in  action 
    }
}

const fetchUsersFailure = (message) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: message
    }
}

//Reducer
const usersReducer = (state= initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                users: action.payload
            }
        case FETCH_USERS_FAILURE:
            return{
                ...state,
                error: action.payload
            } 
        default:
            return state           
    }
}

//Store 
const store = configureStore({reducer: usersReducer}, applyMiddleware(thunk))

//Initial State
console.log("Initial State :", store.getState());

//Updated State
store.subscribe (() => {
    console.log("Updated State :", store.getState());
})


//Middleware
const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest()),
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => {
            const users= res.data.map ( u=> u.name)
            dispatch(fetchUsersSuccess(users))
        })
        .catch((err) =>{
            dispatch(fetchUsersFailure(err.message))
        })
    }
}


store.dispatch(fetchUsers())




// //Dispatch Actions
// store.dispatch(fetchUsersRequest())
// store.dispatch(fetchUsersSuccess(["Laxmi", "Kavya", "Manasa", "Bhagya"]))
// store.dispatch(fetchUsersFailure(["Somthing went Wrong"]))
