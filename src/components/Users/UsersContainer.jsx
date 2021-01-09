import React from 'react';
import {followToggleAC, setUsersAC} from "../../redux/users-reducer";
import Users from "./Users";
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
 
    return (
        {
            usersPage: state.usersPage
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return ({
        followToggle : (id) => {
            dispatch(followToggleAC(id));
        },
        setUsers : (users) => {
            dispatch(setUsersAC(users));
        }
    })
}



const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;