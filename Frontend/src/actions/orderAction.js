import {GET_RESTORDER, ADD_ORDER, UPDATE_ORDERSTATUS, GET_USERORDER, MESSAGE_SENT, CANCEL_ORDER} from './types';
import axios from "axios";
import backendServer from "../backendServer";

export const getRestOrder = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.get(`${backendServer}/yelp/order/rest/${localStorage.getItem("rest_id")}`)
        .then(response => dispatch({
            type: GET_RESTORDER,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}

export const addOrder = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/yelp/order`, data)
    .then(response => dispatch({
        type: ADD_ORDER,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: ADD_ORDER,
                payload: error.response.data
            });
        }
        return;
    });
}

export const updateOrderStatus = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.post(`${backendServer}/yelp/order/update`,data)
    .then(response => dispatch({
        type: UPDATE_ORDERSTATUS,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: UPDATE_ORDERSTATUS,
                payload: error.response.data
            });
        }
        return;
    });
}

export const getUserOrder = () => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.get(`${backendServer}/yelp/order/${localStorage.getItem("user_id")}`)
        .then(response => dispatch({
            type: GET_USERORDER,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}

export const sendMessage = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.post(`${backendServer}/yelp/messages/initiate`, data)
    .then(response => dispatch({
        type: MESSAGE_SENT,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: MESSAGE_SENT,
                payload: error.response.data
            });
        }
        return;
    });
}

export const cancelOrder = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/yelp/order/update`,data)
    .then(response => dispatch({
        type: CANCEL_ORDER,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: CANCEL_ORDER,
                payload: error.response.data
            });
        }
        return;
    });
}



