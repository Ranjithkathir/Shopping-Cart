import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { register } from '../../actions/auth';
import Loader from '../layouts/Loader';
import Alert from '../layouts/Alert';
import { setAlert } from '../../actions/alert';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const { name, email, password, confirmpassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setAlert('Passwords do not match!', 'danger', 3000)
        } else {
            register({ name, email, password });
        }

    }

    const Register = useSelector(state => state.auth);
    const { loading, error } = Register;

    if (isAuthenticated) {
        return <Redirect to='/products' />;
    }

    return <Fragment>
        <div className="form">
            <form onSubmit={e => submitHandler(e)} >
                <ul className="form-container">
                    <Alert />
                    <li><h2>Create An Account</h2></li>
                    {loading && <Loader />}
                    {error && <div>{error}</div>}
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => onChange(e)} required />
                    </li>
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
                        <label htmlFor="confirmpassword">
                            Confirm Password
                        </label>
                        <input type="password" name="confirmpassword" id="confirmpassword" value={confirmpassword} onChange={(e) => onChange(e)} minLength="6" required />
                    </li>
                    <li>
                        <button type="submit" className="button primary"> Sign Up </button>
                    </li>
                    <li>
                        Already have an account ? <Link to="/login">Sign In</Link>
                    </li>
                </ul>
            </form>
        </div>
    </Fragment>
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, setAlert })(Register);