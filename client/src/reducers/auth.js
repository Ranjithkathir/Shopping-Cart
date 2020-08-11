import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, LOGOUT } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    userInfo: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
            };

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                loading: false,
                userInfo: payload,
                isAuthenticated: true
            }
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                token: null
            }
        case LOGOUT:
            return {
                loading: false,
                isAuthenticated: false,
                token: null
            }
        default:
            return state;
    }
}