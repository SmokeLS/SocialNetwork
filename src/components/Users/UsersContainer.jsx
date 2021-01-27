import React from 'react';
import {
  followToggle,
  setUsers,
  setTotalCount,
  setSelectedPage,
  isLoadingNow,
  requestUsers,
  follow,
  unfollow,
} from '../../redux/users-reducer';
import Users from './Users.jsx';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader.js';
import { userAPI } from '../../api/api.js';
import { compose } from 'redux';
import {
  getUsers,
  getTotalCount,
  getSelectedPage,
  getPageSize,
  getIsLoading,
  getFollowingQuery,
} from './../../redux/users-selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { requestUsers, selectedPage, pageSize } = this.props;
    requestUsers(selectedPage, pageSize);
  }

  selectPage = (pageNumber) => {
    const { setSelectedPage, pageSize, setUsers } = this.props;
    setSelectedPage(pageNumber);
    userAPI.getUsers(pageNumber, pageSize).then((data) => {
      setUsers(data.items);
    });
  };

  render() {
    const { isLoading } = this.props;
    // const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <>
        {isLoading ? <Preloader /> : null}
        <Users {...this.props} selectPage={this.selectPage} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    totalCount: getTotalCount(state),
    selectedPage: getSelectedPage(state),
    pageSize: getPageSize(state),
    isLoading: getIsLoading(state),
    followingQuery: getFollowingQuery(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    followToggle,
    setUsers,
    setSelectedPage,
    setTotalCount,
    isLoadingNow,
    requestUsers,
    follow,
    unfollow,
  }),
)(UsersContainer);
