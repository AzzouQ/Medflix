import { createSlice, createSelector } from '@reduxjs/toolkit';

export type LocalState = {
  local: 'fr-FR' | 'en-US';
};

const localSlice = createSlice({
  name: 'Local',
  initialState: {
    local: 'fr-FR',
  } as LocalState,
  reducers: {
    setLocal: (state, action) => {
      state.local = action.payload.local;
    },
  },
});

const stateSelector = createSelector(
  ({ local }: { local: LocalState }) => local,
  (state) => state
);

export const localSelectors = {
  getLocal: createSelector(stateSelector, (state) => {
    return state.local;
  }),
};

export const { actions: localActions, reducer: localReducer } = localSlice;
