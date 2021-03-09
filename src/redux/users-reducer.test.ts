import usersReducer, { InitialStateType, actions } from './users-reducer';

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        followed: false,
        name: 'Andrey',
        photos: { small: null, large: null },
        status: 'status0',
      },
      {
        id: 1,
        followed: false,
        name: 'Andrey',
        photos: { small: null, large: null },
        status: 'status0',
      },
      {
        id: 2,
        followed: true,
        name: 'Andrey',
        photos: { small: null, large: null },
        status: 'status0',
      },
      {
        id: 3,
        followed: true,
        name: 'Andrey',
        photos: { small: null, large: null },
        status: 'status0',
      },
    ],
    selectedPage: 1,
    pageSize: 20,
    totalCount: 0,
    isLoading: false,
    followingQuery: [] as Array<number>, // users' ID
  };
});
test('follow success', () => {
  const newState = usersReducer(state, actions.followToggle(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});
