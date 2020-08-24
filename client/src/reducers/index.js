import { combineReducers } from 'redux';
import alert from './alert';
import productList from './productList';
import productDetail from './productDetail';
import cartReducer from './cartReducer';
import auth from './auth';
import profile from './profile';
import productManage from './productManage';

export default combineReducers({
    alert,
    productList,
    productDetail,
    cartReducer,
    auth,
    profile,
    productManage
});