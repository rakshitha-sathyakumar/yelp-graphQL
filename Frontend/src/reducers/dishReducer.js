import { ADD_DISH, GET_DISH, UPDATE_DISH } from '../actions/types';

 const initialState = {
     user: [],
     status: ""
 };

 export default function(state = initialState, action){
    switch(action.type){
        case ADD_DISH:
            return {
                ...state,
                user: action.payload
            };
        case GET_DISH:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_DISH:
            return {
                ...state,
                status: action.payload
            };
        default:
            return state
    }
 };