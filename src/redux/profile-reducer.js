import {
    userAPI,
    profileAPI
} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

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
    profile: null,
    userId: null
};

const profileReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newMessageBody,
                likesCount: 0
            };
            newState = {
                ...state,
                posts: [...state.posts, newPost]
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
        case DELETE_POST: {
            newState = {
                ...state,
                posts: state.posts.filter(post => action.postId !== post.id)
            }
            return newState;
        }
        case SET_STATUS: {
            newState ={
                ...state,
                status: action.status
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}


export const deletePost = (postId) => ({
    type: DELETE_POST, postId
})

export const addPostActionCreator = (newMessageBody) => ({
    type: ADD_POST, newMessageBody
})

const setUsersProfile = (profile) => ({
    type: SET_USERS_PROFILE,
    profile
})


const setStatus = (status) => ({
    type: SET_STATUS,
    status
})

export const getUsersProfile = (userId) => (dispatch) => {

    userAPI.getProfile(userId)
        .then((response) => {
            dispatch(setUsersProfile(response.data));
        })
        .catch((e) => alert(e));
}

export const getUserStatus = (userId) => (dispatch) => {

    profileAPI.getStatus(userId)
        .then((response) => {
            dispatch(setStatus(response.data));
        });
}


export const setUserStatus = (status) => (dispatch) => {
    profileAPI.setStatus(status)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
}

export default profileReducer;