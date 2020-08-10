import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from '../actions/types';

const initialState = {
    product: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: payload
            };
        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: payload
            };
        default:
            return state;
    }
}