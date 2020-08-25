import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import rootReducer from './reducers';

const cartItems = Cookies.getJSON("cartItems") || [];

const initialState = { cartReducer: { cartItems, shipping: {}, payment: {} } };

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
