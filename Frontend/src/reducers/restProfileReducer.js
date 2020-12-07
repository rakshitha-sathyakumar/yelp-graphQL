import { GET_RESTAURANT, UPDATE_RESTAURANT } from '../actions/types';

 const initialState = {
     user: {},
     status: ""
 };

 export default (state = initialState, action) => {
    //  console.log(action)
    //  console.log(action.payload);
    switch(action.type){
        case GET_RESTAURANT:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_RESTAURANT:
            return {
                ...state,
                status: action.payload
            };
        default:
            return state;
    }
 };