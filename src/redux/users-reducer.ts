import { userAPI } from '../api/api';
import { UserType } from '../types/types';

const FOLLOW_TOGGLE = 'user/FOLLOW_TOGGLE';
const SET_USERS = 'user/SET_USERS';
const SET_TOTAL_COUNT = 'user/SET_TOTAL_COUNT';
const SET_SELECTED_PAGE = 'user/SET_SELECTED_PAGE';
const IS_LOADING_NOW = 'user/IS_LOADING_NOW';
const IS_FOLLOWING_NOW = 'user/IS_FOLLOWING_NOW';

const initialState = {
  users: [] as Array<UserType>,
  selectedPage: 1,
  pageSize: 20,
  totalCount: 0,
  isLoading: false,
  followingQuery: [] as Array<number>, // users' ID
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW_TOGGLE: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.id) {
            return {
              ...user,
              followed: !user.followed,
            };
          }
          return user;
        }),
      };
    }
    case SET_USERS: {
      const newState = {
        ...state,
        users: action.users,
      };
      return newState;
    }
    case SET_TOTAL_COUNT: {
      const newState = {
        ...state,
        totalCount: action.totalCount,
      };
      return newState;
    }
    case SET_SELECTED_PAGE: {
      const newState = {
        ...state,
        selectedPage: action.selectedPage,
      };
      return newState;
    }
    case IS_LOADING_NOW: {
      const newState = {
        ...state,
        isLoading: action.isLoading,
      };
      return newState;
    }
    case IS_FOLLOWING_NOW: {
      if (action.isLoading) {
        return {
          ...state,
          followingQuery: [...state.followingQuery, action.userId],
        };
      } else {
        return {
          ...state,
          followingQuery: state.followingQuery.filter((userId) => userId !== action.userId),
        };
      }
    }
    default: {
      return state;
    }
  }
};

type FollowToggleType = {
  type: typeof FOLLOW_TOGGLE;
  id: number;
};

export const followToggle = (id: number): FollowToggleType => ({
  type: FOLLOW_TOGGLE,
  id,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetTotalCountType = {
  type: typeof SET_TOTAL_COUNT;
  totalCount: number;
};

export const setTotalCount = (totalCount: number): SetTotalCountType => ({
  type: SET_TOTAL_COUNT,
  totalCount,
});

type setSelectedPageType = {
  type: typeof SET_SELECTED_PAGE;
  selectedPage: number;
};

export const setSelectedPage = (selectedPage: number): setSelectedPageType => ({
  type: SET_SELECTED_PAGE,
  selectedPage,
});

type isLoadingNowType = {
  type: typeof IS_LOADING_NOW;
  isLoading: boolean;
};

export const isLoadingNow = (isLoading: boolean): isLoadingNowType => ({
  type: IS_LOADING_NOW,
  isLoading,
});

type followingInProcessType = {
  type: typeof IS_FOLLOWING_NOW;
  isLoading: boolean;
  userId: number;
};

export const followingInProcess = (isLoading: boolean, userId: number): followingInProcessType => ({
  type: IS_FOLLOWING_NOW,
  isLoading,
  userId,
});

export const requestUsers = (selectedPage: number, pageSize: number) => async (dispatch: any) => {
  dispatch(isLoadingNow(true));

  const data = await userAPI.getUsers(selectedPage, pageSize);
  dispatch(setUsers(data.items));
  dispatch(isLoadingNow(false));
  dispatch(setTotalCount(data.totalCount));
};

export const follow = (userId: number) => async (dispatch: any) => {
  dispatch(followingInProcess(true, userId));

  const response = await userAPI.follow(userId);
  if (response.data.resultCode === 0) {
    dispatch(followToggle(userId));
  }

  dispatch(followingInProcess(false, userId));
};

export const unfollow = (userId: number) => async (dispatch: any) => {
  dispatch(followingInProcess(true, userId));

  const response = await userAPI.unfollow(userId);
  if (response.data.resultCode === 0) {
    dispatch(followToggle(userId));
  }

  dispatch(followingInProcess(false, userId));
};

export default usersReducer;
