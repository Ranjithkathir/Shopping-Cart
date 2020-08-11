import Axios from 'axios';
import Cookies from 'js-cookie';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, LOGOUT } from './types';

// User Login
export const login = (email, password) => async (dispatch) => {

    dispatch({
        type: USER_LOGIN_REQUEST,
        payload: {
            email,
            password
        }
    });

    try {

        const { data } = await Axios.post("/api/users/login", { email, password });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        Cookies.set("userInfo", JSON.stringify(data));

    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.message
        });
    }
};

// User Register
export const register = (name, email, password) => async (dispatch) => {

    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {
            name,
            email,
            password
        }
    });

    try {

        const { data } = await Axios.post("/api/users/register", { name, email, password });

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        Cookies.set("userInfo", JSON.stringify(data));

    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.message
        });
    }
};

// LOGOUT

export const logout = () => (dispatch) => {

    dispatch({ type: LOGOUT });

    Cookies.remove('userInfo', {});
};