import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { loadUser } from '../actions/auth';

function Cart(props) {

    useEffect(() => {
        loadUser();
    }, []);

    const cart = useSelector(state => state.cartReducer);

    const { cartItems } = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);

    const checkoutHandler = () => {
        // props.history.push('/signin?redirect=shipping');
        props.history.push('/shipping');
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div>Price</div>
                </li>
                {
                    cartItems.length === 0 ?
                        <div>
                            Cart Is Empty
                    </div>
                        :
                        cartItems.map(cartItem =>
                            <li key={cartItem.product}>
                                <div className="cart-image">
                                    <img src={cartItem.image} alt={cartItem.name} />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + cartItem.product}>{cartItem.name}</Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={cartItem.qty} onChange={(e) => dispatch(addToCart(cartItem.product, e.target.value))}>
                                            {[...Array(cartItem.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCartHandler(cartItem.product)}>Delete</button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    &#8377; {cartItem.price}
                                </div>
                            </li>
                        )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                :
                &#8377; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                Proceed To Checkout
            </button>
        </div>
    </div>
}

Cart.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, { addToCart, removeFromCart })(Cart));