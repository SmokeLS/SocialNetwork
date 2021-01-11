import React from 'react';
import { followToggleAC, setUsersAC, setTotalCountAC, setSelectedPageAC,isLoadingAC} from "../../redux/users-reducer";
import Users from "./Users.jsx";
import * as axios from "axios";
import { connect } from 'react-redux';
import Preloader from "../common/Preloader/Preloader.js";

 class UsersContainer extends React.Component{

    componentDidMount() {
        this.props.isLoadingNow(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.selectedPage}&count=${this.props.pageSize}`)
             .then((response) => {
                this.props.setUsers(response.data.items);
                this.props.isLoadingNow(false);
                this.props.setTotalCount(response.data.totalCount);
             });
    }

    selectPage = (pageNumber) => {
        this.props.setSelectedPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
             .then((response) => {
                this.props.setUsers(response.data.items);
             });
    }

    render() {

        const totalPages = Math.ceil(this.props.totalCount/this.props.pageSize);

        return (<>
            {this.props.isLoading ? <Preloader /> : null}
            <Users users={this.props.users}
                        followToggle={this.props.followToggle}
                        totalCount={this.props.totalCount}
                        selectPage={this.selectPage}
            />
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
            isLoading: state.usersPage.isLoading
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return ({
        followToggle: (id) => {
            dispatch(followToggleAC(id));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setSelectedPage: (selectedPage) => {
            dispatch(setSelectedPageAC(selectedPage));
        },
        setTotalCount: (totalCount) => {
            dispatch(setTotalCountAC(totalCount));
        },
        isLoadingNow: (isLoading) => {
            dispatch(isLoadingAC(isLoading));
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
