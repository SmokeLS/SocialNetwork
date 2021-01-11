import React from 'react';
import { followToggle, setUsers, setTotalCount, setSelectedPage,isLoadingNow} from "../../redux/users-reducer";
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
                    selectedPage={this.props.selectedPage}
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
    isLoadingNow
})(UsersContainer);
