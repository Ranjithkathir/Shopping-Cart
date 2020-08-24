import { PRODUCT_REGISTER_SUCCESS, PRODUCT_REGISTER_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from '../actions/types';

const initialState = {
    loading: true,
    product: [],
    success: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case PRODUCT_REGISTER_SUCCESS:
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload,
                success: true,
            };

        case PRODUCT_REGISTER_FAIL:
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        default:
            return state;
    }
}