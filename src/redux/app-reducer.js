import {authAPI} from '../api/api';
import { getMyProfile } from './auth-reducer';
const SET_INITIALIZED_SETTINGS = 'SET_INITIALIZED_SETTINGS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SETTINGS: {
            const newState = {
                ...state,
                initialized: true
            }
            return newState;
        }
        default:
            return state;
    }
}

const initializedSettings = () => ({
    type: SET_INITIALIZED_SETTINGS
})


export const setInitializedSettings = () => (dispatch) => {
    const promise = dispatch(getMyProfile());
    promise.then((response) => {
        dispatch(initializedSettings())
    });
}

export default appReducer;