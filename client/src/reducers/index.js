import { combineReducers } from 'redux';
import productList from './productList';
import productDetail from './productDetail';
import cartReducer from './cartReducer';

export default combineReducers({
    productList,
    productDetail,
    cartReducer
});