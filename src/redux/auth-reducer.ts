import { ThunkAction } from 'redux-thunk';
import { authAPI, ResponseCodeType, ResponseCodeWithCaptchaType, securityAPI } from '../api/api';
import { ActionsType, AppStateType, ThunkActionType } from './redux-store';

const SET_USERS_DATA = 'auth/SET_USERS_DATA';
const DISPLAY_ERROR = 'auth/DISPLAY_ERROR';
const DISPLAY_CAPTCHA = 'auth/DISPLAY_CAPTCHA';

const initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  error: null as any,
  captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_USERS_DATA:
    case DISPLAY_CAPTCHA: {
      return {
        ...state,
        ...action.data,
      };
    }
    case DISPLAY_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

const actions = {
  displayError: (error: any) =>
    ({
      type: DISPLAY_ERROR,
      error,
    } as const),
  setAuthUsersData: (
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    error: any | null,
  ): SetAuthUsersDataActionType =>
    ({
      type: SET_USERS_DATA,
      data: {
        id,
        login,
        email,
        isAuth,
        error,
      },
    } as const),
  displayCaptcha: (captchaUrl: string) =>
    ({
      type: DISPLAY_CAPTCHA,
      data: { captchaUrl },
    } as const),
};

type DataType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
  error: any | null;
};

type SetAuthUsersDataActionType = {
  type: typeof SET_USERS_DATA;
  data: DataType;
};

export type ThunkType = ThunkActionType<ActionsType<typeof actions>>;

export const getMyProfile = (): ThunkAction<any, AppStateType, unknown, ActionsType<typeof actions>> => async (
  dispatch,
) => {
  const data = await authAPI.getMyProfile();

  if (data.resultCode === ResponseCodeType.Success) {
    const { id, login, email } = data.data;
    dispatch(actions.setAuthUsersData(id, login, email, true, ''));
  }
};

export const signIn = (
  login: string,
  password: string,
  rememberMe: boolean,
  captchaUrl: string | null,
): ThunkType => async (dispatch) => {
  const data = await authAPI.login(login, password, rememberMe, captchaUrl);

  if (data.resultCode === ResponseCodeType.Success) {
    dispatch(getMyProfile());
  } else {
    if (data.resultCode === ResponseCodeWithCaptchaType.CaptchaIsRequired) {
      dispatch(onDisplayCaptcha());
    }
    dispatch(actions.displayError('Login or password is incorrect'));
  }
};

export const onExit = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();

  if (data.resultCode === ResponseCodeType.Success) {
    dispatch(actions.setAuthUsersData(null, null, null, false, ''));
  }
};

export const onDisplayCaptcha = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptcha();

  if (data.url) {
    dispatch(actions.displayCaptcha(data.url));
  }
};

export default authReducer;
