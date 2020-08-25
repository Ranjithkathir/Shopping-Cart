import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { loadUser } from '../actions/auth';
import CheckoutSteps from './layouts/CheckoutSteps';

function Placeorder(props) {

    useEffect(() => {
        loadUser();
    }, []);

    const cart = useSelector(state => state.cartReducer);

    const { cartItems, shipping, payment } = cart;

    if (!shipping.address) {
        props.history.push('/shipping')
    } else if (!payment.paymentMethod) {
        props.history.push('/payment')
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 1000 ? 0 : 100;
    const taxPrice = itemsPrice * (18 / 100);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeorderHandler = () => {
        // create an order
    }

    useEffect(() => {

    }, []);

    const checkoutHandler = () => {
        // props.history.push('/signin?redirect=shipping');
        props.history.push('/shipping');
    }

    return <div>
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Shipping</h3>
                    {cart.shipping.address}, {cart.shipping.city},
                    {cart.shipping.postalcode}, {cart.shipping.country}
                </div>

                <div>
                    <h3>Payment</h3>
                    Payment Method: {cart.payment.paymentMethod}
                </div>

                <div>
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
                                                {cartItem.name}
                                            </div>
                                            <div>
                                                Qty: {cartItem.qty}
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

            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button onClick={placeorderHandler} className="button primary full-width">Place Order</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>Rs. {itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>Rs. {shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>Rs. {taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>Rs. {totalPrice}</div>
                    </li>
                </ul>

            </div>
        </div>
    </div>
}

Placeorder.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, { addToCart, removeFromCart })(Placeorder));