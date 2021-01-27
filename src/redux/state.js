const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const UPDATE_BODY_MESSAGE = 'UPDATE_BODY_MESSAGE';
const SEND_MESSAGE = 'SEND_MESSAGE';

const store = {
  _state: {
    profilePage: {
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
      ],
      newPostText: 'it-kamasutra.com',
    },
    dialogsPage: {
      dialogs: [
        {
          id: 1,
          name: 'Dimych',
        },
        {
          id: 2,
          name: 'Andrew',
        },
        {
          id: 3,
          name: 'Sveta',
        },
        {
          id: 4,
          name: 'Sasha',
        },
        {
          id: 5,
          name: 'Viktor',
        },
        {
          id: 6,
          name: 'Valera',
        },
      ],
      messages: [
        {
          id: 1,
          message: 'Hi',
        },
        {
          id: 2,
          message: 'How is your it-kamasutra?',
        },
        {
          id: 3,
          message: 'Yo',
        },
        {
          id: 4,
          message: 'Yo',
        },
        {
          id: 5,
          message: 'Yo',
        },
      ],
      messageBody: '',
    },
    sidebar: {},
  },
  _rerenderEntireTree() {
    console.log('state is changed');
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._rerenderEntireTree = observer;
  },
  dispatch(action) {
    if (action.type === 'ADD-POST') {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._rerenderEntireTree(this._state);
    }

    if (action.type === 'UPDATE-NEW-POST-TEXT') {
      this._state.profilePage.newPostText = action.newText;
      this._rerenderEntireTree(this._state);
    }

    if (action.type === 'UPDATE_BODY_MESSAGE') {
      this._state.dialogsPage.messageBody = action.textMessage;
      this._rerenderEntireTree(this._state);
    }

    if (action.type === 'SEND_MESSAGE') {
      const body = this._state.dialogsPage.messageBody;
      this._state.dialogsPage.messageBody = '';
      this._state.dialogsPage.messages.push({
        id: 6,
        message: body,
      });
      this._rerenderEntireTree(this._state);
    }
  },
};

export const addPostActionCreator = () => ({
  type: ADD_POST,
});
export const onPostChangeActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export const sendMessageCreator = () => ({
  type: SEND_MESSAGE,
});
export const updateBodyMessageCreator = (text) => ({
  type: UPDATE_BODY_MESSAGE,
  textMessage: text,
});

export default store;
