import profileReducer, { actions} from './profile-reducer';

const state = {
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
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  userId: null as number | null,
  editProfileMode: false,
  status: '',
  newPostText: '',
};

it('post is added', () => {
  const action = actions.addPost('Something');
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});

it('post is deleted', () => {
  const action = actions.deletePost(2);
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
});

it('post is not deleted', () => {
  const action = actions.deletePost(1000);
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
});
