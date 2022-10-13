import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESET, PROFILE_UPDATE_SUCCESS, PASS_UPDATE_REQUEST, PASS_UPDATE_RESET, PASS_UPDATE_SUCCESS, PASS_UPDATE_FAIL, FORGET_PASS_REQUEST, FORGET_PASS_SUCCESS, FORGET_PASS_FAIL, RESET_PASS_REQUEST, RESET_PASS_SUCCESS, RESET_PASS_FAIL } from "./ActionTypes";


export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }
        case LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
        case PASS_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                isUpdated: false,
            }
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                profile: action.payload,
            }
        case PASS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
            }
        case PROFILE_UPDATE_FAIL:
        case PASS_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case PROFILE_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false,
                profile: null,
            }
        case PASS_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


export const forgetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGET_PASS_REQUEST:
        case RESET_PASS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FORGET_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case RESET_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            }
        case FORGET_PASS_FAIL:
        case RESET_PASS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                message: null,

            }
        default:
            return state
    }
}