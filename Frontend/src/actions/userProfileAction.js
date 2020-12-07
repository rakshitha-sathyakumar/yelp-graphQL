import { GET_USER, UPDATE_USER, UPDATE_PROFILEPIC, GET_ALLUSER} from "./types";
import axios from "axios";
import backendServer from "../backendServer";

export const getUser = () => dispatch => {
    axios.get(`${backendServer}/yelp/userProfile/${localStorage.getItem("user_id")}`)
        .then(response => dispatch({
            type: GET_USER,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}

export const updateUser = (userProfileData) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token',);
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/yelp/userProfile/update/${localStorage.getItem("user_id")}`, userProfileData)
        .then(response => dispatch({
            type: UPDATE_USER,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: UPDATE_USER,
                    payload: error.response.data
                });
            }
            return;
        });
}

export const updateProfilePic = (userProfileData) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem(
        'token',
      );
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/yelp/userProfile/updateProfilePic`, userProfileData)
        .then(response => dispatch({
            type: UPDATE_PROFILEPIC,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: UPDATE_PROFILEPIC,
                    payload: error.response.data
                });
            }
            return;
        });
}

export const getAlluser = () => dispatch => {
    axios.get(`${backendServer}/yelp/userProfile/allUsers/${localStorage.getItem("user_id")}`)
        .then(response => dispatch({
            type: GET_ALLUSER,
            payload: response.data
        }))
        .catch(error => {
            console.log(error);
        });
}

