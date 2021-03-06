import { ActionsType } from '../redux/redux-store';
const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type InitialStateType = typeof initialState;

const initialState = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrew' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Sasha' },
    { id: 5, name: 'Viktor' },
    { id: 6, name: 'Valera' },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is your it-kamasutra?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' },
  ] as Array<MessageType>,
};

const dialogsReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            message: action.newMessageBody,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  sendMessage: (newMessageBody: string) => ({ type: SEND_MESSAGE, newMessageBody }),
};

export default dialogsReducer;
