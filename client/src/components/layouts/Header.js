import React, { Fragment, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, logout } from '../../actions/auth';

const Header = ({ loadUser, auth: { isAuthenticated, userInfo, loading }, logout }) => {

    useEffect(() => {
        loadUser();
    }, []);

    const openSidebar = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const guestLinks = (
        <div>
            <NavLink to="/login" activeClassName="linkactive">Sign In</NavLink>
            <NavLink to="/register" activeClassName="linkactive">Sign Up</NavLink>
        </div>
    );

    return (
        <header className="header">
            <div className="brand">
                {isAuthenticated &&
                    <button onClick={openSidebar}>
                        &#9776;
                    </button>
                }
                <Link to="/">Shopping Cart</Link>
            </div>
            <div className="header-links">
                {!loading && (<Fragment>{isAuthenticated ? <div>
                    <NavLink to="/products" activeClassName="linkactive">Products</NavLink>
                    <NavLink to="/cart" activeClassName="linkactive">Cart</NavLink>
                    <NavLink to="/profile" activeClassName="linkactive">{userInfo && userInfo.name}</NavLink>
                    {userInfo && userInfo.isAdmin ? <NavLink to="/productmanage" activeClassName="linkactive">Products Manage</NavLink> : ''}
                    <button className="button primary"><span className='signoutbtn'><i className='fa fa-power-off' onClick={logout}></i></span></button>
                </div> : guestLinks}</Fragment>)}
            </div>
        </header>
    )
}

Header.propTypes = {
    loadUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(mapStateToProps, { loadUser, logout })(Header);
