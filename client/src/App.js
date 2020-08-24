import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './assets/css/fontawesome-all.min.css';

import Header from './components/layouts/Header';
import Sidebar from './components/layouts/Sidebar';
import Footer from './components/layouts/Footer';
import Privateroute from './routes/Privateroute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductList from './components/ProductList';
import Profile from './components/profile/Profile';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ProductManage from './components/productmanage/ProductManage';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <div className="grid-container">
                        <Header />
                        <Sidebar />
                        <main className="main">
                            <div className="content">
                                <Switch>
                                    <Route path="/" exact={true} component={Login} />
                                    <Route path="/login" exact={true} component={Login} />
                                    <Route path="/register" exact={true} component={Register} />
                                    <Privateroute path="/products" exact={true} component={ProductList} />
                                    <Privateroute path="/profile" exact={true} component={Profile} />
                                    <Privateroute path="/products/:id" exact={true} component={ProductDetail} />
                                    <Privateroute path="/cart/:id?" component={Cart} />
                                    <Privateroute path="/productmanage" component={ProductManage} />
                                </Switch>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </Fragment>
            </Router>
        </Provider>
    )
};


export default App;
