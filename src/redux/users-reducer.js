const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
const IS_LOADING_NOW = 'IS_LOADING_NOW';

let initialState = {
    users: [ ],
    selectedPage: 1,
    pageSize: 5,
    totalCount: 0,
    isLoading: false
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW_TOGGLE: {
            const newState = {...state, users: state.users.map( (user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        followed: !user.followed
                    }
                }
                return user;
            })};
            return newState;
        }
        case SET_USERS: {
            const newState = {...state, users: action.users}
            return newState;
        }
        case SET_TOTAL_COUNT: {
            const newState = {...state, totalCount: action.totalCount};
            return newState;
        }
        case SET_SELECTED_PAGE: {
            const newState = {...state, selectedPage: action.selectedPage};
            return newState;
        }
        case IS_LOADING_NOW: {
            const newState = {...state, isLoading: action.isLoading};
            return newState;
        }
        default:
            return state;
    }
}

export const followToggleAC = (id) => ({type: FOLLOW_TOGGLE, id})
export const setUsersAC = (users) =>
    ({ type: SET_USERS, users})
export const setTotalCountAC = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});
export const setSelectedPageAC = (selectedPage) => ({type: SET_SELECTED_PAGE, selectedPage});
export const isLoadingAC = (isLoading) => ({type: IS_LOADING_NOW, isLoading})

export default usersReducer;