import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types';

// To Add A product In a Cart
export const addToCart = (productId, qty) => async (dispatch) => {

    try {

        const { data } = await Axios.get("/api/products/" + productId);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });

    } catch (err) {
        dispatch({
            // type: ADD_CART_FAIl,
            // payload: err.message
        });
    }
};

// To Add A product In a Cart
export const removeFromCart = (productId) => (dispatch) => {

    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: productId
        });

    } catch (err) {
        dispatch({
            // type: CART_REMOVE_ITEM_Fail,
            // payload: err.message
        });
    }
};