export const getUsers = (state) => {
  return state.usersPage.users;
};

export const getTotalCount = (state) => {
  return state.usersPage.totalCount;
};

export const getSelectedPage = (state) => {
  return state.usersPage.selectedPage;
};

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getIsLoading = (state) => {
  return state.usersPage.isLoading;
};

export const getFollowingQuery = (state) => {
  return state.usersPage.followingQuery;
};
