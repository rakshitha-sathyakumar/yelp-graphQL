import {ADD_EVENT} from '../actions/types';
import {GET_RESTEVENT, GET_ALLEVENT, GET_USERREGLIST} from '../actions/types';

const initialState = {
    event: [], 
    user: []
}

export default function(state = initialState, action){
    switch(action.type){
        case ADD_EVENT:
            return {
                ...state,
                event: action.payload
            };
        case GET_RESTEVENT:
            return {
                ...state,
                event: action.payload
            };

        case GET_ALLEVENT:
            return {
                ...state,
                event: action.payload
            };

        case GET_USERREGLIST:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state
    }
};

