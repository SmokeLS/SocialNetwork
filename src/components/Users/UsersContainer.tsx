import React from 'react';
import { actions, requestUsers, follow, unfollow } from '../../redux/users-reducer';
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
import { FilterType, UserType } from '../../types/types';
import { getUsers, getFilteredUsers } from './../../redux/users-selectors';
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'querystring';

type MapStatePropsType = {
  pageSize: number;
  selectedPage: number;
  isLoading: boolean;
  totalCount: number;
  followingQuery: Array<number>;
  users: Array<UserType>;
  filter: FilterType;
};
type MapDispatchPropsType = {
  setSelectedPage: (pageNumber: number) => void;
  setUsers: (items: Array<UserType>) => void;
  requestUsers: (selectedPage: number, pageSize: number, filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & WithRouterType;

type queryParamsType = {
  term?: string;
  friend?: string;
  page?: string;
};

type WithRouterType = RouteComponentProps<queryParamsType> & {
  term?: string;
  friend?: string;
  page?: string;
};

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { requestUsers, selectedPage, pageSize, filter, history } = this.props;

    const parsed = queryString.parse(history.location.search.substr(1));

    let actualPage = selectedPage;
    let actualFilter = filter;

    if (parsed.page) actualPage = Number(parsed.page);
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case 'null': {
        actualFilter = { ...actualFilter, friend: null };
        break;
      }
      case 'true': {
        actualFilter = { ...actualFilter, friend: true };
        break;
      }
      case 'false': {
        actualFilter = { ...actualFilter, friend: false };
        break;
      }
    }

    requestUsers(actualPage, pageSize, actualFilter);
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.filter !== this.props.filter || prevProps.selectedPage !== this.props.selectedPage) {
      const { selectedPage, filter } = this.props;
      const query: queryParamsType = {};
      const { history } = this.props;

      if (filter.friend !== null) query.friend = String(filter.friend);
      if (filter.term) query.term = String(filter.term);
      if (selectedPage !== 1) query.page = String(selectedPage);

      history.push({
        pathname: '/users',
        search: queryString.stringify(query),
      });
    }
  }

  onChangeFilter = (filter: FilterType) => {
    const { pageSize, requestUsers } = this.props;
    requestUsers(1, pageSize, filter);
  };

  selectPage = (pageNumber: number) => {
    const { pageSize, requestUsers, filter } = this.props;
    requestUsers(pageNumber, pageSize, filter);
  };

  render() {
    const { isLoading, totalCount, pageSize } = this.props;
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <>
        {isLoading ? <Preloader /> : null}
        <Users
          {...this.props}
          onChangeFilter={this.onChangeFilter}
          selectPage={this.selectPage}
          totalPages={totalPages}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    totalCount: getTotalCount(state),
    selectedPage: getSelectedPage(state),
    pageSize: getPageSize(state),
    isLoading: getIsLoading(state),
    followingQuery: getFollowingQuery(state),
    filter: getFilteredUsers(state),
  };
};

const setUsers = actions.setUsers;
const setSelectedPage = actions.setSelectedPage;

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {
    setUsers,
    setSelectedPage,
    requestUsers,
    follow,
    unfollow,
  }),
  withRouter,
)(UsersContainer) as React.ComponentType;
