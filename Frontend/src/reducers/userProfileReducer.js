import { GET_USER, UPDATE_USER, UPDATE_PROFILEPIC, GET_ALLUSER } from '../actions/types';

 const initialState = {
     user: [],
     status: ""
 };

 export default (state = initialState, action) => {
     console.log(action.payload);
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                status: action.payload
            };

        case UPDATE_PROFILEPIC:
            return {
                ...state,
                status: action.payload
            }

        case GET_ALLUSER:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
 };