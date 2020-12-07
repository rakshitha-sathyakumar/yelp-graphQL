import {ADD_EVENT} from './types';
import {GET_RESTEVENT, GET_USERREGLIST, GET_ALLEVENT} from './types';
import axios from "axios";
import backendServer from "../backendServer";

 export const addEvent = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/yelp/addEvent`,data)
        .then(response => dispatch({
            type: ADD_EVENT,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_EVENT,
                    payload: error.response.data
                });
            }
        });

 } 

 export const getRestEvents = () => dispatch => {
    axios.get(`${backendServer}/yelp/viewEvents/${localStorage.getItem("rest_id")}`)
        .then(response => dispatch({
            type: GET_RESTEVENT,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}

export const getAllevents = () => dispatch => {
    axios.get(`${backendServer}/yelp/viewEvents`)
        .then(response => dispatch({
            type: GET_ALLEVENT,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}


export const getUserReglist = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.get(`${backendServer}/yelp/viewEvents/user/${localStorage.getItem("user_id")}`)
        .then(response => dispatch({
            type: GET_USERREGLIST,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}

