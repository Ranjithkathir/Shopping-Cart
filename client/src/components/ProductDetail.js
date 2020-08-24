import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { productDetails } from '../actions/productDetail';
import Loader from '../components/layouts/Loader';

function ProductDetail(props) {

    const [qty, setQty] = useState(1);
    const productDetail = useSelector(state => state.productDetail);
    const { product, loading, error } = productDetail;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productDetails(props.match.params.id));
        return () => {
            // nothing
        };
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return <div>
        <div className="back-to-product">
            <Link to='/products'>{'<<'} Back to Products</Link>
        </div>
        {loading ? <Loader /> :
            error ? <div>{error}</div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="details-info">
                            <ul>
                                <li><h4><Link to={"/products/" + product._id}>{product.name}</Link></h4></li>
                                <li>{product.rating} stars ({product.numReviews} Reviews)</li>
                                <li>Price : <b>&#8377;{product.price}</b></li>
                                <li>
                                    Description:
                                    <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>Price : {product.price}  </li>
                                <li>Status : {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}  </li>
                                {product.countInStock > 0 && <li>Qty :
                                    <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </li>}
                                <li>
                                    {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add To Cart</button>}
                                </li>
                            </ul>
                        </div>
                    </div>
                )
        }
    </div>
}

ProductDetail.propTypes = {
    // auth: PropTypes.object.isRequired,
    productDetails: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { productDetails })(ProductDetail);