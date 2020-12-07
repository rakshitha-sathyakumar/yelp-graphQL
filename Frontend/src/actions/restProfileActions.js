import { GET_RESTAURANT, UPDATE_RESTAURANT } from "./types";
import axios from "axios";
import backendServer from "../backendServer";

export const getRest = () => dispatch => {
    axios.get(`${backendServer}/yelp/restProfile/${localStorage.getItem("rest_id")}`)
        .then(response => dispatch({
            type: GET_RESTAURANT,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}

export const updateRest = (restProfileData) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/yelp/restProfile/update/${localStorage.getItem("rest_id")}`, restProfileData)
        .then(response => dispatch({
            type: UPDATE_RESTAURANT,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: UPDATE_RESTAURANT,
                    payload: error.response.data
                });
            }
            return;
        });
}
