import { getMyProfile } from './auth-reducer';

const SET_INITIALIZED_SETTINGS = 'app/SET_INITIALIZED_SETTINGS';

type InitialStateType = typeof initialState;

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SETTINGS: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

type InitializedSettingActionType = {
  type: typeof SET_INITIALIZED_SETTINGS;
};

const initializedSettings = (): InitializedSettingActionType => ({
  type: SET_INITIALIZED_SETTINGS,
});

export const setInitializedSettings = () => (dispatch: any) => {
  const promise = dispatch(getMyProfile());
  promise.then(() => {
    dispatch(initializedSettings());
  });
};

export default appReducer;
