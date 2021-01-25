import {
    userAPI
} from "../api/api.js";

const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
const IS_LOADING_NOW = 'IS_LOADING_NOW';
const IS_FOLLOWING_NOW = 'IS_FOLLOWING_NOW';

let initialState = {
    users: [],
    selectedPage: 1,
    pageSize: 5,
    totalCount: 0,
    isLoading: false,
    followingQuery: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_TOGGLE: {
            const newState = {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.id) {
                        return {
                            ...user,
                            followed: !user.followed
                        }
                    }
                    return user;
                })
            };
            return newState;
        }
        case SET_USERS: {
            const newState = {
                ...state,
                users: action.users
            }
            return newState;
        }
        case SET_TOTAL_COUNT: {
            const newState = {
                ...state,
                totalCount: action.totalCount
            };
            return newState;
        }
        case SET_SELECTED_PAGE: {
            const newState = {
                ...state,
                selectedPage: action.selectedPage
            };
            return newState;
        }
        case IS_LOADING_NOW: {
            const newState = {
                ...state,
                isLoading: action.isLoading
            };
            return newState;
        }
        case IS_FOLLOWING_NOW: {
            if (action.isLoading) {
                return {
                    ...state,
                    followingQuery: [...state.followingQuery, action.userId]
                };
            } else {
                return {
                    ...state,
                    followingQuery: state.followingQuery.filter(userId => userId !== action.userId)
                };
            }
        }
        default: {
            return state;
        }
    }
}

export const followToggle = (id) => ({
    type: FOLLOW_TOGGLE,
    id
})
export const setUsers = (users) =>
    ({
        type: SET_USERS,
        users
    })
export const setTotalCount = (totalCount) => ({
    type: SET_TOTAL_COUNT,
    totalCount
});
export const setSelectedPage = (selectedPage) => ({
    type: SET_SELECTED_PAGE,
    selectedPage
});
export const isLoadingNow = (isLoading) => ({
    type: IS_LOADING_NOW,
    isLoading
})
export const followingInProcess = (isLoading, userId) => ({
    type: IS_FOLLOWING_NOW,
    isLoading,
    userId
})

export const requestUsers = (selectedPage, pageSize) => (dispatch) => {
    dispatch(isLoadingNow(true));

    userAPI.getUsers(selectedPage, pageSize)
        .then((data) => {
            dispatch(setUsers(data.items));
            dispatch(isLoadingNow(false));
            dispatch(setTotalCount(data.totalCount));
        });
}

export const follow = (userId) => (dispatch) => {
    dispatch(followingInProcess(true, userId));
    userAPI.follow(userId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(followToggle(userId));
            }
            dispatch(followingInProcess(false, userId));
        })
}

export const unfollow = (userId) => (dispatch) => {
    dispatch(followingInProcess(true, userId));
    userAPI.unfollow(userId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(followToggle(userId));
            }
            dispatch(followingInProcess(false, userId));
        })
}


export default usersReducer;