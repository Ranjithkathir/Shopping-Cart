import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
    profile: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_PROFILE:
            return {
                loading: false
            };
        default:
            return state;
    }
}