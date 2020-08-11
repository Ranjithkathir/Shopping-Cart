import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/auth';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Login = useSelector(state => state.auth);
    const { loading, error, userInfo } = Login;
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
        dispatch(login(email, password));

    }

    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li><h2>Sign In</h2></li>
                {loading && <div>Authenticating....</div>}
                {error && <div>{error}</div>}
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
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
}

// Login.propTypes = {
//     login: PropTypes.func.isRequired
// }

// const mapStateToProps = (state) => ({
//     // isAuthenticated: state.auth.isAuthenticated,
// });

//export default connect(mapStateToProps, { login })(Login);
export default Login;