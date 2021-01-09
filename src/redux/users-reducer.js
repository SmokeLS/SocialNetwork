const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
    ]
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW_TOGGLE: {
            const newState = {users: state.users.map( (user) => {
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
            const newState = {...state, users: [...action.users]}
            return newState;
        }
        default:
            return state;
    }
}

export const followToggleAC = (id) => ({type: FOLLOW_TOGGLE, id})
export const setUsersAC = (users) =>
    ({ type: SET_USERS, users})

export default usersReducer;