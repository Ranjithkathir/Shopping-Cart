import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    userInfo: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                userInfo: payload,
            };

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };

        default:
            return state;
    }
}