import {GET_RESTORDER, ADD_ORDER, UPDATE_ORDERSTATUS, GET_USERORDER, MESSAGE_SENT, CANCEL_ORDER} from '../actions/types';

const initialState = {
    user: [], 
    status:''
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_RESTORDER:
            return {
                ...state,
                user: action.payload
            };
        case ADD_ORDER:
            return {
                ...state,
                status: action.payload
            };
        
        case UPDATE_ORDERSTATUS:
            return {
                ...state,
                status: action.payload
            }
        
        case GET_USERORDER:
            return {
                ...state,
                user: action.payload
            }

        case MESSAGE_SENT:
            return {
                ...state,
                status: action.payload
            }

        case CANCEL_ORDER:
            return {
                ...state,
                status: action.payload
            }

        default:
            return state
    }
};
