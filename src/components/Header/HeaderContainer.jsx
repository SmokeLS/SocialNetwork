import React from 'react';
import s from './Header.module.css';
import Header from './Header.jsx';
import {setAuthUsersData} from '../../redux/auth-reducer.js';
import {connect} from 'react-redux';
import * as axios from 'axios';

class HeaderContainer extends React.Component{

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
             .then((response) => {
                if (response.data.resultCode === 0) {
                    const {id, login, email} = response.data.data;
                    this.props.setAuthUsersData(id, login, email);
                }
             });
    }

    render() {

        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        email: state.auth.email
    }
}

export default connect(mapStateToProps, {setAuthUsersData})(HeaderContainer);
