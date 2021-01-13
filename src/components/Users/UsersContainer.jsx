import React from 'react';
import { followToggle, setUsers, setTotalCount, setSelectedPage,isLoadingNow, followingInProcess} from "../../redux/users-reducer";
import Users from "./Users.jsx";
import * as axios from "axios";
import { connect } from 'react-redux';
import Preloader from "../common/Preloader/Preloader.js";
import {userAPI} from "../../api/api.js";

 class UsersContainer extends React.Component{

    componentDidMount() {
        this.props.isLoadingNow(true);
        userAPI.getUsers(this.props.selectedPage, this.props.pageSize)
             .then((data) => {
                this.props.setUsers(data.items);
                this.props.isLoadingNow(false);
                this.props.setTotalCount(data.totalCount);
             });
    }

    selectPage = (pageNumber) => {
        this.props.setSelectedPage(pageNumber);
        userAPI.getUsers(pageNumber, this.props.pageSize)
             .then((data) => {
                this.props.setUsers(data.items);
             });
    }

    render() {

        const totalPages = Math.ceil(this.props.totalCount/this.props.pageSize);

        return (<>
            {this.props.isLoading ? <Preloader /> : null}
            <Users {...this.props}/>

            </>
        )
        
    }
}

const mapStateToProps = (state) => {
    return (
        {
            users: state.usersPage.users,
            totalCount: state.usersPage.totalCount,
            selectedPage: state.usersPage.selectedPage,
            pageSize: state.usersPage.pageSize,
            isLoading: state.usersPage.isLoading,
            followingQuery: state.usersPage.followingQuery
        }
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return ({
//         followToggle: (id) => {
//             dispatch(followToggle(id));
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users));
//         },
//         setSelectedPage: (selectedPage) => {
//             dispatch(setSelectedPage(selectedPage));
//         },
//         setTotalCount: (totalCount) => {
//             dispatch(setTotalCount(totalCount));
//         },
//         isLoadingNow: (isLoading) => {
//             dispatch(isLoading(isLoading));
//         }
//     });
// }

export default connect(mapStateToProps, {
    followToggle,
    setUsers,
    setSelectedPage,
    setTotalCount,
    isLoadingNow,
    followingInProcess
})(UsersContainer);
