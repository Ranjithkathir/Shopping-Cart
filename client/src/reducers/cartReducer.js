import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../actions/types';

const initialState = {
    cartItems: [],
    payment: {},
    shipping: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;
            const product = state.cartItems.find(x => x.product === item.product)

            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x.product === product.product ? item : x)
                };
            } else {
                return {
                    cartItems: [...state.cartItems, item]
                };
            }
        case CART_REMOVE_ITEM:
            return {
                cartItems: state.cartItems.filter(x => x.product !== payload)
            }
        case CART_SAVE_SHIPPING:
            return {
                ...state,
                shipping: payload
            }
        case CART_SAVE_PAYMENT:
            return {
                ...state,
                payment: payload
            }
        default:
            return state;
    }
}