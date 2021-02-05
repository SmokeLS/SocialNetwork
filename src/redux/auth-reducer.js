import { authAPI, securityAPI } from '../api/api';

const SET_USERS_DATA = 'auth/SET_USERS_DATA';
const DISPLAY_ERROR = 'auth/DISPLAY_ERROR';
const DISPLAY_CAPTCHA = 'auth/DISPLAY_CAPTCHA';

const initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  error: null,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
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

const displayError = (error) => ({
  type: DISPLAY_ERROR,
  error,
});

const setAuthUsersData = (id, login, email, isAuth, error) => ({
  type: SET_USERS_DATA,
  data: {
    id,
    login,
    email,
    isAuth,
    error,
  },
});

const displayCaptcha = (captchaUrl) => ({
  type: DISPLAY_CAPTCHA,
  data: { captchaUrl },
});

export const getMyProfile = () => async (dispatch) => {
  const response = await authAPI.getMyProfile();

  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data;
    dispatch(setAuthUsersData(id, login, email, true, ''));
  }
};

export const signIn = (login, password, rememberMe, captchaUrl) => async (dispatch) => {
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

export const onExit = () => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUsersData(null, null, null, false, ''));
  }
};

export const onDisplayCaptcha = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha();

  if (response.data.url) {
    dispatch(displayCaptcha(response.data.url));
  }
};

export default authReducer;
