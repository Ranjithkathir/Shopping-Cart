import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

const initialState = {
    cartItems: []
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
        default:
            return state;
    }
}