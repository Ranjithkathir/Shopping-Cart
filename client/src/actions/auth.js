import Axios from 'axios';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, LOGOUT, USER_LOADED, AUTH_ERROR } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Auth User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await Axios.get('api/users/getauthuser');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// User Login
export const login = (email, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        email,
        password,
    });

    try {

        const res = await Axios.post("/api/users/login", body, config);
        console.log(res.data)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: USER_LOGIN_FAIL,
        });
    }
};

// User Register
export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {

        const res = await Axios.post("/api/users/register", body, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: USER_REGISTER_FAIL,
        });
    }
};

// LOGOUT

export const logout = () => (dispatch) => {

    dispatch({ type: LOGOUT });

};