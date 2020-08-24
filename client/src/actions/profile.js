import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from './types';

// GET USER PROFILE

export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/getauthuser');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}