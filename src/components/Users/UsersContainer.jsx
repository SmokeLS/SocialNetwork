import React from 'react';
import { followToggle, setUsers, setTotalCount, setSelectedPage, isLoadingNow, followingInProcess, requestUsers, follow, unfollow } from "../../redux/users-reducer";
import Users from "./Users.jsx";
import { connect } from 'react-redux';
import Preloader from "../common/Preloader/Preloader.js";
import { userAPI } from "../../api/api.js";
import withAuthRedirect from '../hoc/withAuthRedirect.js';
import { compose } from 'redux';
import { getUsers, getTotalCount, getSelectedPage, getPageSize, getIsLoading, getFollowingQuery } from './../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.selectedPage, this.props.pageSize);
    }

    selectPage = (pageNumber) => {
        this.props.setSelectedPage(pageNumber);
        userAPI.requestUsers(pageNumber, this.props.pageSize)
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
            users: getUsers(state),
            totalCount: getTotalCount(state),
            selectedPage: getSelectedPage(state),
            pageSize: getPageSize(state),
            isLoading: getIsLoading(state),
            followingQuery: getFollowingQuery(state)
        }
    )
}

export default compose(

    connect(mapStateToProps, {followToggle, setUsers, setSelectedPage, setTotalCount, isLoadingNow, requestUsers, follow, unfollow })
)(UsersContainer)
