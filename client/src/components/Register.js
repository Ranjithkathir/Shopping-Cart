import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/auth';

function Register(props) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const { name, email, password, confirmpassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const Register = useSelector(state => state.auth);
    const { loading, error, userInfo } = Register;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push("/products");
        }
        return () => {
            // nothing
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));

    }

    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li><h2>Create An Account</h2></li>
                {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => onChange(e)} />
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => onChange(e)} />
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => onChange(e)} />
                </li>
                <li>
                    <label htmlFor="confirmpassword">
                        Confirm Password
                    </label>
                    <input type="password" name="confirmpassword" id="confirmpassword" value={confirmpassword} onChange={(e) => onChange(e)} />
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
}

export default Register;