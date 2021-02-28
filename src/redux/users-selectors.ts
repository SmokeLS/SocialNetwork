import { AppStateType } from './redux-store';

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getTotalCount = (state: AppStateType) => {
  return state.usersPage.totalCount;
};

export const getSelectedPage = (state: AppStateType) => {
  return state.usersPage.selectedPage;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getIsLoading = (state: AppStateType) => {
  return state.usersPage.isLoading;
};

export const getFollowingQuery = (state: AppStateType) => {
  return state.usersPage.followingQuery;
};
