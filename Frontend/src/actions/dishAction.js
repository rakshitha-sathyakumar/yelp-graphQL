import { ADD_DISH } from "./types";
import { GET_DISH } from "./types";
import { UPDATE_DISH } from "./types";
import axios from "axios";
import backendServer from "../backendServer";
axios.defaults.headers.common['authorization'] = localStorage.getItem(
    'token',
  );

export const addDish = (dishData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.post(`${backendServer}/yelp/addDish`,dishData)
        .then(response => dispatch({
            type: ADD_DISH,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_DISH,
                    payload: error.response.data
                });
            }
        });
}

export const getDish = (restId, dishId) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${backendServer}/yelp/editDish/${restId}/${dishId}`)
    .then(response => dispatch({
        type: GET_DISH,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: GET_DISH,
                payload: error.response.data
            });
        }
    });

}

export const updateDish = (dishData) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/yelp/editDish`,dishData)
    .then(response => dispatch({
        type: UPDATE_DISH,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: UPDATE_DISH,
                payload: error.response.data
            });
        }
    });

}

//export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});