import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { loadUser } from '../actions/auth';
import { listProducts } from '../actions/productList';
import Loader from './layouts/Loader';

function ProductList(props) {
    // useEffect(() => {
    //     loadUser();
    // }, []);

    const productList = useSelector(state => state.productList);

    const { products, loading, error } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
        return () => {
            // nothing
        };
    }, [])

    return loading ? <Loader /> :
        error ? <div>{error}</div> :
            <ul className="products">
                {
                    products.map(product =>
                        <li key={product._id}>
                            <div className="product">
                                <div className="product-image-container">
                                    <img className="product-image" src={product.image} alt="p1" />
                                </div>
                                <div className="product-name">
                                    <Link to={'/products/' + product._id}>{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">&#8377;{product.price}</div>
                                <div className="product-rating">{product.rating} stars ({product.numReviews} Reviews)</div>
                            </div>
                        </li>
                    )
                }
            </ul>
}

ProductList.propTypes = {
    // loadUser: PropTypes.func.isRequired,
    listProducts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    productList: state.productList,
});

export default connect(mapStateToProps, { listProducts })(ProductList);