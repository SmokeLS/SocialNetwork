import {
    userAPI
} from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';

let initialState = {
    posts: [{
            id: 1,
            message: 'Hi, how are you?',
            likesCount: 12
        },
        {
            id: 2,
            message: 'It\'s my first post',
            likesCount: 11
        },
        {
            id: 3,
            message: 'Blabla',
            likesCount: 11
        },
        {
            id: 4,
            message: 'Dada',
            likesCount: 11
        }
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
};

const profileReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            newState = {
                ...state,
                posts: [...state.posts, newPost]
            }
            newState.newPostText = '';
            return newState;
        }
        case UPDATE_NEW_POST_TEXT: {
            newState = {
                ...state,
                newPostText: action.newText
            }
            return newState;
        }
        case SET_USERS_PROFILE: {
            newState = {
                ...state,
                profile: action.profile
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}


export const addPostActionCreator = () => ({
    type: ADD_POST
})
export const updateNewPostTextActionCreator = (text) =>
    ({
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    })
export const setUsersProfile = (profile) => ({
    type: SET_USERS_PROFILE,
    profile
})

export const getUsersProfile = (userId) => (dispatch) => {
    userAPI.getProfile(userId)
        .then((response) => {
            dispatch(setUsersProfile(response.data));
        })
        .catch((e) => alert(e));
}

export default profileReducer;