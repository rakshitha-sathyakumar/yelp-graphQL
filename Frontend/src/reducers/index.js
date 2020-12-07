import { combineReducers } from 'redux';
import userProfileReducer from './userProfileReducer';
import restProfileReducer from './restProfileReducer'
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import dishReducer from './dishReducer';
import menuReducer from './menuReducer';
import eventReducer from './eventReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    userProfile: userProfileReducer,
    restProfile: restProfileReducer,
    addDish: dishReducer,
    getMenu: menuReducer,
    events: eventReducer,
    orders: orderReducer
});