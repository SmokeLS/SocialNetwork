import React from 'react';
import { followToggle, setUsers, setTotalCount, setSelectedPage, isLoadingNow, followingInProcess, getUsers, follow, unfollow } from "../../redux/users-reducer";
import Users from "./Users.jsx";
import { connect } from 'react-redux';
import Preloader from "../common/Preloader/Preloader.js";
import { userAPI } from "../../api/api.js";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.selectedPage, this.props.pageSize);
    }

    selectPage = (pageNumber) => {
        this.props.setSelectedPage(pageNumber);
        userAPI.getUsers(pageNumber, this.props.pageSize)
            .then((data) => {
                this.props.setUsers(data.items);
            });
    }

    render() {

        const totalPages = Math.ceil(this.props.totalCount / this.props.pageSize);

        return (<>
            {this.props.isLoading ? <Preloader /> : null}
            <Users {...this.props} selectPage={this.selectPage} />
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

export default connect(mapStateToProps, {
    followToggle,
    setUsers,
    setSelectedPage,
    setTotalCount,
    isLoadingNow,
    getUsers,
    follow,
    unfollow
})(UsersContainer);
