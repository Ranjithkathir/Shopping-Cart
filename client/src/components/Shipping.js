import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartAction';
import Loader from './layouts/Loader';
import Alert from './layouts/Alert';
import { setAlert } from '../actions/alert';
import CheckoutSteps from './layouts/CheckoutSteps';

const Shipping = ({ isAuthenticated, saveShipping, history }) => {

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalcode: '',
        country: ''
    });

    const { address, city, postalcode, country } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        saveShipping({ address, city, postalcode, country });
        history.push('/payment')
    }

    return <Fragment>
        <div>
            <CheckoutSteps step1></CheckoutSteps>
            <div className="form">
                <form onSubmit={e => submitHandler(e)} >
                    <ul className="form-container">
                        <Alert />
                        <li><h2>Shipping</h2></li>

                        <li>
                            <label htmlFor="address">
                                Address
                        </label>
                            <input type="text" name="address" id="address" value={address} onChange={(e) => onChange(e)} required />
                        </li>
                        <li>
                            <label htmlFor="city">
                                City
                        </label>
                            <input type="text" name="city" id="city" value={city} onChange={(e) => onChange(e)} required />
                        </li>
                        <li>
                            <label htmlFor="postalcode">
                                Postal Code
                        </label>
                            <input type="text" name="postalcode" id="postalcode" value={postalcode} onChange={(e) => onChange(e)} required />
                        </li>
                        <li>
                            <label htmlFor="country">
                                Country
                        </label>
                            <input type="text" name="country" id="country" value={country} onChange={(e) => onChange(e)} required />
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

Shipping.propTypes = {
    // setAlert: PropTypes.func.isRequired,
    saveShipping: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, { saveShipping })(Shipping));