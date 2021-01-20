import {authAPI} from '../api/api';
const SET_USERS_DATA = 'SET_USERS_DATA';
const DISPLAY_ERROR = 'DISPLAY_ERROR';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    error: ""
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA: {
            const newState = {
                ...state,
                ...action.data,
            }
            return newState;
        }
        case DISPLAY_ERROR: {
            const newState = {
                ...state,
                error: action.error
            }
            return newState;
        }
        default:
            return state;
    }
}

const displayError = (error) => ({
    type: DISPLAY_ERROR,
    error
})

const setAuthUsersData = (id, login, email, isAuth, error) => ({
    type: SET_USERS_DATA,
    data: {
        id,
        login,
        email,
        isAuth,
        error
    }
})

export const getMyProfile = () => (dispatch) => {
    return authAPI.getMyProfile()
        .then((response) => {
            if (response.data.resultCode === 0) {
                const {
                    id,
                    login,
                    email
                } = response.data.data;
                dispatch(setAuthUsersData(id, login, email, true, ""));
            }
        });
}

export const signIn = (login, password, rememberMe) => (dispatch) => {

    authAPI.login(login, password, rememberMe)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(getMyProfile());
            }else {
                dispatch(displayError("Login or password is incorrect"));
            }
        });
}

export const onExit = () => (dispatch) => {
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUsersData(null, null, null, false, ""));
            }
        });
}

export default authReducer;