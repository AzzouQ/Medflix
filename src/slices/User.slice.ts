import { createSlice, createSelector } from '@reduxjs/toolkit';
import GravatarAPI from 'gravatar-api';

export type UserState = {
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
  };
};

const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: { id: null, email: null, name: null },
  } as UserState,
  reducers: {
    setUser: (state, action) => {
      state.user.id = action.payload.user._id;
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
    },
    setName: (state, action) => {
      state.user.name = action.payload.name;
    },
    setEmail: (state, action) => {
      state.user.email = action.payload.email;
    },
  },
});

const stateSelector = createSelector(
  ({ user }: { user: UserState }) => user,
  (state) => state
);

export const userSelectors = {
  isLogged: createSelector(stateSelector, (state) => {
    return !!state.user.id;
  }),
  getId: createSelector(stateSelector, (state) => {
    return state.user.id ?? undefined;
  }),
  getEmail: createSelector(stateSelector, (state) => {
    return state.user.email ?? undefined;
  }),
  getName: createSelector(stateSelector, (state) => {
    return state.user.name ?? undefined;
  }),
  getAvatar: createSelector(stateSelector, (state) => {
    return GravatarAPI.imageUrl({
      email: state.user.email,
      parameters: {
        size: 500,
        default: 'identicon',
      },
    });
  }),
};

export const { actions: userActions, reducer: userReducer } = userSlice;
