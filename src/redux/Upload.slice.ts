import { createSlice, createSelector } from '@reduxjs/toolkit';


const uploadSlice = createSlice({
  name: 'Upload',
  initialState: {
    uploadTask: undefined,
    blob: undefined,
  } as any,
  reducers: {
    setUpload: (state, action) => {
      state.uploadTask = action.payload.uploadTask;
      state.blob = action.payload.blob;
    },
    finish: (state) => {
      state.blob = undefined;
      state.uploadTask = undefined;
    }
  },
});

const stateSelector = createSelector(
  ({ upload }: { upload: any }) => upload,
  (state) => state
);

export const uploadSelectors = {
  getUploadTask: createSelector(stateSelector, (state) => {
    return state.uploadTask;
  }),
  isUploading: createSelector(stateSelector, (state) => {
    return !!state.uploadTask;
  }),
};

export const { actions: uploadActions, reducer: uploadReducer } = uploadSlice;
