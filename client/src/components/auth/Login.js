import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Loader from '../layouts/Loader';
import Alert from '../layouts/Alert';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        login(email, password);
    }

    const Login = useSelector(state => state.auth);
    const { loading, error } = Login;


    // Redirect If Authenticated

    if (isAuthenticated) {
        return <Redirect to='/products' />;
    }

    return (
        <div className="form">
            <form onSubmit={(e) => submitHandler(e)} >
                <ul className="form-container">
                    <Alert />
                    <li><h2>Sign In</h2></li>
                    {loading && <Loader />}
                    {error && <div>{error}</div>}
                    <li>
                        <label htmlFor="email">
                            Email
                    </label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => onChange(e)} required />
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                    </label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => onChange(e)} minLength="6" required />
                    </li>
                    <li>
                        <button type="submit" className="button primary"> Sign In </button>
                    </li>
                    <li>
                        New To ShoppingCart ?
                </li>
                    <li>
                        <Link to="/register" className="button secondary text-center">Create New ShoppingCart Accout</Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);