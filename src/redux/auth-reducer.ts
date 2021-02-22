import { authAPI, securityAPI } from '../api/api';

const SET_USERS_DATA = 'auth/SET_USERS_DATA';
const DISPLAY_ERROR = 'auth/DISPLAY_ERROR';
const DISPLAY_CAPTCHA = 'auth/DISPLAY_CAPTCHA';

const initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  error: null,
  captchaUrl: null as number | null,
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type DisplayErrorType = {
  type: typeof DISPLAY_ERROR;
  error: any;
};

const displayError = (error: any): DisplayErrorType => ({
  type: DISPLAY_ERROR,
  error,
});

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

const setAuthUsersData = (
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
  error: any | null,
): SetAuthUsersDataActionType => ({
  type: SET_USERS_DATA,
  data: {
    id,
    login,
    email,
    isAuth,
    error,
  },
});

type DisplayCaptchaType = {
  type: typeof DISPLAY_CAPTCHA;
  data: { captchaUrl: string };
};

const displayCaptcha = (captchaUrl: string): DisplayCaptchaType => ({
  type: DISPLAY_CAPTCHA,
  data: { captchaUrl },
});

export const getMyProfile = () => async (dispatch: any) => {
  const response = await authAPI.getMyProfile();

  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data;
    dispatch(setAuthUsersData(id, login, email, true, ''));
  }
};

export const signIn = (login: string, password: string, rememberMe: boolean, captchaUrl: string) => async (
  dispatch: any,
) => {
  const response = await authAPI.login(login, password, rememberMe, captchaUrl);

  if (response.data.resultCode === 0) {
    dispatch(getMyProfile());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(onDisplayCaptcha());
    }
    dispatch(displayError('Login or password is incorrect'));
  }
};

export const onExit = () => async (dispatch: any) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUsersData(null, null, null, false, ''));
  }
};

export const onDisplayCaptcha = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptcha();

  if (response.data.url) {
    dispatch(displayCaptcha(response.data.url));
  }
};

export default authReducer;
