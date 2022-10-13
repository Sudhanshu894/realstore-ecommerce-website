import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERRORS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PASS_UPDATE_REQUEST, PASS_UPDATE_SUCCESS, PASS_UPDATE_FAIL, FORGET_PASS_REQUEST, FORGET_PASS_SUCCESS, FORGET_PASS_FAIL, RESET_PASS_REQUEST, RESET_PASS_SUCCESS, RESET_PASS_FAIL } from "./ActionTypes";


import axios from 'axios';


export const Loginuser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };


        const { data } = await axios.post(`/api/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.error });
    }
}


export const Registeruser = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/register`, userdata, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data.cruser });
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response.data.error,
        })
    }
}


export const Loaduser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/profile`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (err) {
        dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.error });
    }
}


export const Logoutuser = () => async (dispatch) => {
    try {
        await axios.get(`/api/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (err) {
        dispatch({ type: LOGOUT_FAIL, payload: err.response.data.error });
    }
}


export const Updateprofile = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_UPDATE_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.patch(`/api/profile/update`, userdata, config);

        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.success });
    } catch (err) {
        dispatch({ type: PROFILE_UPDATE_FAIL, payload: err.response.data.error });
    }
}


export const Updatepassword = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: PASS_UPDATE_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.patch(`/api/password/update`, userdata, config);

        dispatch({ type: PASS_UPDATE_SUCCESS, payload: data.success });
    } catch (err) {
        dispatch({ type: PASS_UPDATE_FAIL, payload: err.response.data.error });
    }
}


export const Forgetuser = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGET_PASS_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`/api/password/forget`, { email }, config);

        dispatch({ type: FORGET_PASS_SUCCESS, payload: data.message });
    } catch (err) {
        dispatch({ type: FORGET_PASS_FAIL, payload: err.response.data.error });
    }
}


export const Resetuserpass = (token, pass) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASS_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.patch(`/api/password/reset/${token}`, pass, config);

        dispatch({ type: RESET_PASS_SUCCESS, payload: data.success });
    } catch (err) {
        dispatch({ type: RESET_PASS_FAIL, payload: err.response.data.error });
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
};
