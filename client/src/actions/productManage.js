import axios from 'axios';
import { PRODUCT_REGISTER_SUCCESS, PRODUCT_REGISTER_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from './types';

// To Save a Product and Update a product
export const saveProduct = (product) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        if (!product._id) {
            const res = await axios.post("/api/products", product, config);

            dispatch({
                type: PRODUCT_REGISTER_SUCCESS,
                payload: res.data,
                success: true
            });
        } else {
            const res = await axios.put("/api/products/" + product._id, product, config);

            dispatch({
                type: PRODUCT_REGISTER_SUCCESS,
                payload: res.data,
                success: true
            });
        }

    } catch (err) {
        dispatch({
            type: PRODUCT_REGISTER_FAIL,
            payload: err.message
        });
    }
};

// To delete a Product

export const deleteProduct = (productId) => async (dispatch) => {
    console.log(productId)
    try {
        const res = await axios.delete('/api/products/' + productId, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: res.data,
            success: true
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.message
        })
    }

};