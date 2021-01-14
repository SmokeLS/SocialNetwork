import React from 'react';
import s from './Header.module.css';
import Header from './Header.jsx';
import { getMyProfile } from '../../redux/auth-reducer.js';
import { connect } from 'react-redux';
class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getMyProfile();
    }

    render() {

        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        email: state.auth.email
    }
}

export default connect(mapStateToProps, { getMyProfile })(HeaderContainer);
