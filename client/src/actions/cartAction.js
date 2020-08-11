import Axios from 'axios';
import Cookies from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types';

// To Add A product In a Cart
export const addToCart = (productId, qty) => async (dispatch, getState) => {

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

        const { cartReducer: { cartItems } } = getState();
        Cookies.set("cartItems", JSON.stringify(cartItems));

    } catch (err) {

    }
};

// To Remove A product In a Cart
export const removeFromCart = (productId) => (dispatch, getState) => {

    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: productId
        });

        const { cartReducer: { cartItems } } = getState();
        Cookies.set("cartItems", JSON.stringify(cartItems));

    } catch (err) {

    }
};