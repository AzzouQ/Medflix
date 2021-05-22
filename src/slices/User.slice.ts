import { createSlice, createSelector } from '@reduxjs/toolkit';

export type UserState = {
  name: string;
  email: string;
  createDate: string;
  updateDate: string;
  subscribersCount: number;
  subscriptionsCount: number;
};

const initialState: UserState = {
  name: '',
  email: '',
  createDate: '',
  updateDate: '',
  subscribersCount: 0,
  subscriptionsCount: 0,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (_state, action) => action.payload.user,
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
