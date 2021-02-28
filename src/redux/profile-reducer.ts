import { profileAPI, ResponseCodeType } from '../api/api';
import { FORM_ERROR } from 'final-form';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { ActionsType, AppStateType, ThunkActionType } from './redux-store';
import { ThunkAction } from 'redux-thunk';

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
  newPostText: '',
};

const profileReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: PostType = {
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

export const actions = {
  deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
  addPost: (newMessageBody: string) => ({ type: ADD_POST, newMessageBody } as const),
  setUsersProfile: (profile: ProfileType) => ({ type: SET_USERS_PROFILE, profile } as const),
  setUserAvatar: (photos: PhotosType) => ({ type: PHOTO_IS_SETTED, photos } as const),
  setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
  changeMode: () => ({ type: CHANGE_PROFILE_MODE } as const),
};

type ThunkType = ThunkActionType<ActionsType<typeof actions>>;

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUsersProfile(data));
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const setUserStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.setStatus(status);
  if (data.resultCode === ResponseCodeType.Success) {
    dispatch(actions.setStatus(status));
  }
};

export const setAvatar = (photo: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.setUserAvatar(photo);

  if (data.resultCode === ResponseCodeType.Success) {
    dispatch(actions.setUserAvatar(data.data));
  }
};

export const setUserProfileInformation = (
  information: ProfileType,
): ThunkAction<
  Promise<{ [FORM_ERROR]: Array<string> } | undefined>,
  AppStateType,
  unknown,
  ActionsType<typeof actions>
> => async (dispatch, getState) => {
  const userId = getState().auth.id;
  const data = await profileAPI.setUserProfileInformation(information);

  if (data.resultCode === ResponseCodeType.Success) {
    if (userId !== null) {
      dispatch(getUsersProfile(userId));
    } else {
      throw new Error('userId should not to be number!');
    }
  } else {
    return { [FORM_ERROR]: data.messages };
  }
};

export default profileReducer;
