import { getMyProfile } from './auth-reducer';

const SET_INITIALIZED_SETTINGS = 'app/SET_INITIALIZED_SETTINGS';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
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

const initializedSettings = () => ({
  type: SET_INITIALIZED_SETTINGS,
});

export const setInitializedSettings = () => (dispatch) => {
  const promise = dispatch(getMyProfile());
  promise.then((response) => {
    dispatch(initializedSettings());
  });
};

export default appReducer;
