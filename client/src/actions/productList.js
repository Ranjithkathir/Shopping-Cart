import axios from 'axios';
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from './types';

// To List Products
export const listProducts = () => async (dispatch) => {

    try {

        const res = await axios.get("/api/products");

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.message
        });
    }
};