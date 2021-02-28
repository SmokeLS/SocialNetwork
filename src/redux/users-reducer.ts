import { Dispatch } from 'redux';
import { ResponseCodeType, userAPI } from '../api/api';
import { UserType } from '../types/types';
import { ActionsType, ThunkActionType } from './redux-store';

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

const usersReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
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

export const actions = {
  followToggle: (id: number) =>
    ({
      type: FOLLOW_TOGGLE,
      id,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: SET_USERS,
      users,
    } as const),
  setTotalCount: (totalCount: number) =>
    ({
      type: SET_TOTAL_COUNT,
      totalCount,
    } as const),
  setSelectedPage: (selectedPage: number) =>
    ({
      type: SET_SELECTED_PAGE,
      selectedPage,
    } as const),
  isLoadingNow: (isLoading: boolean) =>
    ({
      type: IS_LOADING_NOW,
      isLoading,
    } as const),
  followingInProcess: (isLoading: boolean, userId: number) =>
    ({
      type: IS_FOLLOWING_NOW,
      isLoading,
      userId,
    } as const),
};

type DispatchType = Dispatch<ActionsType<typeof actions>>;
type ThunkType = ThunkActionType<ActionsType<typeof actions>>;

export const requestUsers = (selectedPage: number, pageSize: number): ThunkType => async (dispatch) => {
  dispatch(actions.isLoadingNow(true));

  const data = await userAPI.getUsers(selectedPage, pageSize);
  dispatch(actions.setUsers(data.items));
  dispatch(actions.isLoadingNow(false));
  dispatch(actions.setTotalCount(data.totalCount));
};

const _followUnfollowFlow = async (userId: number, dispatch: DispatchType, userAPI: any) => {
  dispatch(actions.followingInProcess(true, userId));

  const data = await userAPI(userId);
  if (data.resultCode === ResponseCodeType.Success) {
    dispatch(actions.followToggle(userId));
  }

  dispatch(actions.followingInProcess(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(userId, dispatch, userAPI.follow.bind(userAPI));
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(userId, dispatch, userAPI.unfollow.bind(userAPI));
};

export default usersReducer;
