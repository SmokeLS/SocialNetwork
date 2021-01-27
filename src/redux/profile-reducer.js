import { userAPI, profileAPI } from '../api/api';

const ADD_POST = 'profile/ADD-POST';
const SET_USERS_PROFILE = 'profile/SET_USERS_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';

const initialState = {
  posts: [
    {
      id: 1,
      message: 'Hi, how are you?',
      likesCount: 12,
    },
    {
      id: 2,
      message: "It's my first post",
      likesCount: 11,
    },
    {
      id: 3,
      message: 'Blabla',
      likesCount: 11,
    },
    {
      id: 4,
      message: 'Dada',
      likesCount: 11,
    },
  ],
  profile: null,
  userId: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: 5,
        message: action.newMessageBody,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case SET_USERS_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => action.postId !== post.id),
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default: {
      return state;
    }
  }
};

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const addPost = (newMessageBody) => ({
  type: ADD_POST,
  newMessageBody,
});

const setUsersProfile = (profile) => ({
  type: SET_USERS_PROFILE,
  profile,
});

const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const getUsersProfile = (userId) => async (dispatch) => {
  const response = await userAPI.getProfile(userId);
  dispatch(setUsersProfile(response.data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const setUserStatus = (status) => async (dispatch) => {
  const response = await profileAPI.setStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
