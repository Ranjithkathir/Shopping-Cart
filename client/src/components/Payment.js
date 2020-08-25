import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { savePayment } from '../actions/cartAction';
import Loader from './layouts/Loader';
import Alert from './layouts/Alert';
import { setAlert } from '../actions/alert';
import CheckoutSteps from './layouts/CheckoutSteps';

const Payment = ({ isAuthenticated, savePayment, history }) => {

    const [formData, setFormData] = useState({
        paymentMethod: '',
    });

    const { paymentMethod } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        savePayment({ paymentMethod });
        history.push('/placeorder')
    }

    return <Fragment>
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="form">
                <form onSubmit={e => submitHandler(e)} >
                    <ul className="form-container">
                        <Alert />
                        <li><h2>Payment</h2></li>

                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={(e) => onChange(e)} required />
                                <label htmlFor="paymentMethod">
                                    Paypal
                            </label>
                            </div>
                        </li>

                        <li>
                            <button type="submit" className="button primary"> Continue </button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
    </Fragment>
}

Payment.propTypes = {
    // setAlert: PropTypes.func.isRequired,
    savePayment: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, { savePayment })(Payment));