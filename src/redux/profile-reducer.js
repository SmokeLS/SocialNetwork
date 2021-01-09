const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    newPostText: 'it-kamasutra.com'
};

const profileReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            newState = {
                ...state,
                posts: [...state.posts, newPost]
            }
            newState.newPostText = '';
            return newState;
        }
        case UPDATE_NEW_POST_TEXT:{
            newState = {...state, newPostText: action.newText}
            return newState;
        }
        default:{
            return state;
        }
    }
}


export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text })

export default profileReducer;