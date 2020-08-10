import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

import { Provider } from 'react-redux';
import store from './store';

function App() {
    const openSidebar = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeSidebar = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="grid-container">
                    <header className="header">
                        <div className="brand">
                            <button onClick={openSidebar}>
                                &#9776;
                        </button>
                            <Link to="/products">Shopping Cart</Link>
                        </div>
                        <div className="header-links">
                            <Link to="">Cart</Link>
                            <Link to="">Sign In</Link>
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
                            <Route path="/products" exact={true} component={ProductList} />
                            <Route path="/products/:id" exact={true} component={ProductDetail} />
                            <Route path="/cart/:id?" component={Cart} />
                        </div>
                    </main>
                    <footer className="footer">
                        All rights reserved
                </footer>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
