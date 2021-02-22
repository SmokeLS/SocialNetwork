import { profileAPI } from '../api/api';
import { FORM_ERROR } from 'final-form';
import { PhotosType, PostType, ProfileType } from '../types/types';

const ADD_POST = 'profile/ADD-POST';
const SET_USERS_PROFILE = 'profile/SET_USERS_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const PHOTO_IS_SETTED = 'user/PHOTO_IS_SETTED';
const CHANGE_PROFILE_MODE = 'profile/CHANGE_PROFILE_MODE';

type InitialStateType = typeof initialState;

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
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  userId: null as number | null,
  editProfileMode: false,
  status: '',
};

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: state.posts.length + 1,
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
        profile: { ...state.profile, photos: action.photos } as ProfileType,
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

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});

type AddPostType = {
  type: typeof ADD_POST;
  newMessageBody: string;
};

export const addPost = (newMessageBody: string): AddPostType => ({
  type: ADD_POST,
  newMessageBody,
});

type SetUsersProfileType = {
  type: typeof SET_USERS_PROFILE;
  profile: ProfileType;
};

const setUsersProfile = (profile: ProfileType): SetUsersProfileType => ({
  type: SET_USERS_PROFILE,
  profile,
});

type SetUserAvatarType = {
  type: typeof PHOTO_IS_SETTED;
  photos: PhotosType;
};

export const setUserAvatar = (photos: PhotosType): SetUserAvatarType => ({
  type: PHOTO_IS_SETTED,
  photos,
});

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};

const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});

type ChangeModeType = {
  type: typeof CHANGE_PROFILE_MODE;
};

export const changeMode = (): ChangeModeType => ({
  type: CHANGE_PROFILE_MODE,
});

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(setUsersProfile(response.data));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const setUserStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.setStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const setAvatar = (photo: any) => async (dispatch: any) => {
  const response = await profileAPI.setUserAvatar(photo);

  if (response.data.resultCode === 0) {
    dispatch(setUserAvatar(response.data.data.photos));
  }
};

export const setUserProfileInformation = (information: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.setUserProfileInformation(information);

  if (response.data.resultCode === 0) {
    dispatch(getUsersProfile(userId));
  } else {
    return { [FORM_ERROR]: response.data.messages };
  }
};

export default profileReducer;
