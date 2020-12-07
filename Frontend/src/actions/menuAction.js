import { APPETIZER, SALAD, GET_MAINCOURSE, GET_DESSERT, GET_BEVERAGES, GET_ALLUSERMENU } from "./types";
import axios from "axios";
import backendServer from "../backendServer";

export const getappetizer = () => dispatch => {
    axios.get(`${backendServer}/yelp/viewMenu/appetizer/${localStorage.getItem("rest_id")}`)
    .then(response => dispatch({
        type: APPETIZER,
        payload: response.data
    }))
    .catch(error => {
        console.log(error);
    });
}

export const getsalad = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${backendServer}/yelp/viewMenu/salad/${localStorage.getItem("rest_id")}`)
    .then(response => dispatch({
        type: SALAD,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: SALAD,
                payload: error.response.data
            });
        }
    });
}

export const getmaincourse = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${backendServer}/yelp/viewMenu/maincourse/${localStorage.getItem("rest_id")}`)
    .then(response => dispatch({
        type: GET_MAINCOURSE,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: GET_MAINCOURSE,
                payload: error.response.data
            });
        }
    });
}

export const getdessert = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${backendServer}/yelp/viewMenu/dessert/${localStorage.getItem("rest_id")}`)
    .then(response => dispatch({
        type: GET_DESSERT,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: GET_DESSERT,
                payload: error.response.data
            });
        }
    });
}

export const getbeverage = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${backendServer}/yelp/viewMenu/beverage/${localStorage.getItem("rest_id")}`)
    .then(response => dispatch({
        type: GET_BEVERAGES,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: GET_BEVERAGES,
                payload: error.response.data
            });
        }
    });
}

export const getAllMenuUser = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${backendServer}/yelp/viewMenu/${localStorage.getItem("rest_id")}`)
    .then(response => dispatch({
        type: GET_ALLUSERMENU,
        payload: response.data
    }))
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: GET_ALLUSERMENU,
                payload: error.response.data
            });
        }
    });

}