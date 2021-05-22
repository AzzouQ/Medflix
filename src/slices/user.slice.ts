import { createSlice, createSelector } from '@reduxjs/toolkit';

import type { UserType } from 'types';

export type UserState = UserType | null;

const initialState: UserState = null;

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    initUser: (_state, action) => action.payload.user,
    resetUser: () => initialState,
  },
});

const stateSelector = createSelector(
  ({ user }: { user: UserState }) => user,
  (state) => state
);

export const userSelectors = {
  getUser: createSelector(stateSelector, (state) => {
    return state;
  }),
};

export const { actions: userActions, reducer: userReducer } = userSlice;
