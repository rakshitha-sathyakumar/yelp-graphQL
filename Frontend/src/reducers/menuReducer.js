import { APPETIZER, SALAD, GET_MAINCOURSE, GET_DESSERT, GET_BEVERAGES, GET_ALLUSERMENU} from '../actions/types';

 const initialState = {
     user: []
 };

 export default function(state = initialState, action){

    switch(action.type)
    {
        case APPETIZER:
            return {
                ...state,
                user: action.payload
            };
        case SALAD:
            return {
                ...state,
                user: action.payload
            };
        case GET_MAINCOURSE:
            return {
                ...state,
                user: action.payload
            };
        case GET_DESSERT:
            return {
                ...state,
                user: action.payload
            };
        case GET_BEVERAGES:
            return {
                ...state,
                user: action.payload
            };

        case GET_ALLUSERMENU:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
 };