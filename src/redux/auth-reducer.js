import {authAPI} from '../api/api';

const SET_USERS_DATA = 'SET_USERS_DATA';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA: {
            const newState = {
                ...state,
                ...action.data,
                isAuth: true
            }
            return newState;
        }
        default:
            return state;
    }
}

const setAuthUsersData = (id, login, email) => ({
    type: SET_USERS_DATA,
    data: {
        id,
        login,
        email
    }
})

export const getMyProfile = () => (dispatch) => {
    authAPI.getMyProfile()
        .then((response) => {
            if (response.data.resultCode === 0) {
                const {
                    id,
                    login,
                    email
                } = response.data.data;
                dispatch(setAuthUsersData(id, login, email));
            }
        });
}

export default authReducer;