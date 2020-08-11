import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { logout } from './actions/auth';

import { useSelector } from 'react-redux';

function App() {

    const auth = useSelector(state => state.auth);
    const { userInfo } = auth;
    console.log(userInfo)
    const openSidebar = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeSidebar = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }
    return (

        <Router>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openSidebar}>
                            &#9776;
                        </button>
                        <Link to="/products">Shopping Cart</Link>
                    </div>
                    <div className="header-links">
                        {
                            userInfo ? <div>
                                <Link to="/cart">Cart</Link>
                                <Link to='/profile'>{userInfo.name}</Link>
                                {/* <button onClick={logout}>Sign Out</button> */}
                            </div> :
                                <div>
                                    <Link to="/login">Sign In</Link>
                                    <Link to="/register">Sign Up</Link>
                                </div>
                        }
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Categories</h3>
                    <button className="sidebar-close-button" onClick={closeSidebar}>x</button>
                    <ul>
                        <li><Link to="">Mobile</Link></li>
                        <li><Link to="">Laptops</Link></li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Route path="/login" exact={true} component={Login} />
                        <Route path="/register" exact={true} component={Register} />
                        <Route path="/" exact={true} component={Login} />
                        <Route path="/products" exact={true} component={ProductList} />
                        <Route path="/products/:id" exact={true} component={ProductDetail} />
                        <Route path="/cart/:id?" component={Cart} />
                    </div>
                </main>
                <footer className="footer">
                    All rights reserved
                </footer>
            </div>
        </Router>

    );
}

export default App;
