import { createSlice, createSelector } from '@reduxjs/toolkit';
import firebase from 'firebase/app';

export type UploadState = {
  uploadTask: firebase.storage.UploadTask | undefined;
  blob: Blob | undefined;
};

const uploadSlice = createSlice({
  name: 'Upload',
  initialState: {
    uploadTask: undefined,
    blob: undefined,
  } as UploadState,
  reducers: {
    setUpload: (state, action) => {
      state.uploadTask = action.payload.uploadTask;
      state.blob = action.payload.blob;
    },
    finish: (state) => {
      state.blob = undefined;
      state.uploadTask = undefined;
    },
  },
});

const stateSelector = createSelector(
  ({ upload }: { upload: UploadState }) => upload,
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
