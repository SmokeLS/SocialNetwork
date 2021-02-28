import { ThunkAction } from 'redux-thunk';
import { getMyProfile } from './auth-reducer';
import { ActionsType, AppStateType } from './redux-store';

const SET_INITIALIZED_SETTINGS = 'app/SET_INITIALIZED_SETTINGS';

type InitialStateType = typeof initialState;

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
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

const actions = {
  initializedSettings: () => ({ type: SET_INITIALIZED_SETTINGS } as const),
};

export const setInitializedSettings = (): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> => (
  dispatch,
) => {
  const promise = dispatch(getMyProfile());
  promise.then(() => {
    dispatch(actions.initializedSettings());
  });
};

export default appReducer;
