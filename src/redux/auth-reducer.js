const SET_USERS_DATA = 'SET_USERS_DATA';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS_DATA: {
            const newState = {...state, ...action.data, isAuth: true}
            return newState;
        }
        default:
            return state;
    }
}

export const setAuthUsersData = (id, login, email) => ({type: SET_USERS_DATA, data: {id, login, email}})

export default authReducer;