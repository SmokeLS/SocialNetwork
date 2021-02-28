import React from 'react';
import {
  actions,
  requestUsers,
  follow,
  unfollow,
} from '../../redux/users-reducer';
import Users from './Users';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {
  getTotalCount,
  getSelectedPage,
  getPageSize,
  getIsLoading,
  getFollowingQuery,
} from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { getUsers } from './../../redux/users-selectors';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  pageSize :number;
  selectedPage: number;
  isLoading: boolean;
  totalCount: number;
  followingQuery: Array<number>;
  users: Array<UserType>;
}
type MapDispatchPropsType = {
  setSelectedPage: (pageNumber: number) => void;
  setUsers: (items: Array<UserType>) => void;
  requestUsers: (selectedPage: number, pageSize: number) => void;
  follow:(userId: number) => void;
  unfollow: (userId: number) => void; 
}

type OwnPropsType = {
 // pageTitle: "users";
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { requestUsers, selectedPage, pageSize } = this.props;
    requestUsers(selectedPage, pageSize);
  }

  selectPage = (pageNumber : number) => {
    const { setSelectedPage, pageSize, requestUsers} = this.props;
    setSelectedPage(pageNumber);
    requestUsers(pageNumber, pageSize);
  };

  render() {
    const { isLoading, totalCount, pageSize } = this.props;
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <>
        {isLoading ? <Preloader /> : null}
        <Users {...this.props} selectPage={this.selectPage} totalPages={totalPages} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => {
  return {
    users: getUsers(state),
    totalCount: getTotalCount(state),
    selectedPage: getSelectedPage(state),
    pageSize: getPageSize(state),
    isLoading: getIsLoading(state),
    followingQuery: getFollowingQuery(state),
  };
};

const setUsers = actions.setUsers;
const setSelectedPage = actions.setSelectedPage;

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps, {
    setUsers,
    setSelectedPage,
    requestUsers,
    follow,
    unfollow,
    }),
)(UsersContainer);
