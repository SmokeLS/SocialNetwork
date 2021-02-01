import { userAPI, profileAPI } from '../api/api';
import { FORM_ERROR } from 'final-form';

const ADD_POST = 'profile/ADD-POST';
const SET_USERS_PROFILE = 'profile/SET_USERS_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const PHOTO_IS_SETTED = 'user/PHOTO_IS_SETTED';
const CHANGE_PROFILE_MODE = 'profile/CHANGE_PROFILE_MODE';
const DISPLAY_ERROR = 'profile/DISPLAY_ERROR';

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
  editProfileMode: false,
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
    case PHOTO_IS_SETTED: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    case CHANGE_PROFILE_MODE: {
      return {
        ...state,
        editProfileMode: !state.editProfileMode,
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

export const setUserAvatar = (photos) => ({
  type: PHOTO_IS_SETTED,
  photos,
});

const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const changeMode = () => ({
  type: CHANGE_PROFILE_MODE,
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

export const setAvatar = (photo) => async (dispatch) => {
  const response = await profileAPI.setUserAvatar(photo);

  if (response.data.resultCode === 0) {
    dispatch(setUserAvatar(response.data.data.photos));
  }
};

export const setUserProfileInformation = (information, userId) => async (dispatch) => {
  const response = await profileAPI.setUserProfileInformation(information);

  if (response.data.resultCode === 0) {
    dispatch(getUsersProfile(userId));
  } else {
    return { [FORM_ERROR]: response.data.messages };
  }
};

export default profileReducer;
