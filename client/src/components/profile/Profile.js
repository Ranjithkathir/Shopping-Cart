import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Loader from '../layouts/Loader';

const Profile = ({ getProfile, auth, profile: { loading, profile } }) => {

    useEffect(() => {
        getProfile();
    }, []);

    return loading && profile === null ? <Loader /> : <Fragment>
        <h3 className="text-center"><i className="fas fa-user"></i> Welcome {profile && profile.name} !</h3>
    </Fragment>;
}

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile })(Profile);
