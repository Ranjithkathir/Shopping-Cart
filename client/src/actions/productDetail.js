import axios from 'axios';
import { PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from './types';

// To get product Details
export const productDetails = (productId) => async (dispatch) => {

    try {

        const res = await axios.get("/api/products/" + productId);

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: err.message
        });
    }
};