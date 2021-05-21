import { createSlice, createSelector } from '@reduxjs/toolkit';
import firebase from 'service/firebase';

export type UploadState = {
  uploadTask: firebase.storage.UploadTask | undefined;
  onPlay: (() => void) | undefined;
  onCancel: (() => Promise<void>) | undefined;
  onNext: {
    progress: number;
    isRunning: boolean;
  };
  onError:
    | {
        error: firebase.storage.FirebaseStorageError;
      }
    | undefined;
  onComplete:
    | {
        metaData: firebase.storage.FullMetadata;
        downloadUrl: any;
      }
    | undefined;
};

const initialState: UploadState = {
  uploadTask: undefined,
  onPlay: undefined,
  onCancel: undefined,
  onNext: {
    progress: 0,
    isRunning: false,
  },
  onError: undefined,
  onComplete: undefined,
};

const uploadSlice = createSlice({
  name: 'Upload',
  initialState,
  reducers: {
    setUploadTask: (state, action) => {
      state.uploadTask = action.payload.uploadTask;
    },
    setPlay: (state, action) => {
      state.onPlay = action.payload.onPlay;
    },
    setCancel: (state, action) => {
      state.onCancel = action.payload.onCancel;
    },
    setNext: (state, action) => {
      state.onNext = action.payload.uploadNext;
    },
    setError: (state, action) => {
      state.onError = action.payload.uploadError;
    },
    setComplete: (state, action) => {
      state.onComplete = action.payload.uploadComplete;
    },
    resetUploadTask: () => initialState,
  },
});

const stateSelector = createSelector(
  ({ upload }: { upload: UploadState }) => upload,
  (state) => state
);

export const uploadSelectors = {
  isRunning: createSelector(stateSelector, (state) => {
    return !!state.uploadTask;
  }),
  getPlay: createSelector(stateSelector, (state) => {
    return state.onPlay;
  }),
  getCancel: createSelector(stateSelector, (state) => {
    return state.onCancel;
  }),
  getNext: createSelector(stateSelector, (state) => {
    return state.onNext;
  }),
  getError: createSelector(stateSelector, (state) => {
    return state.onError?.error;
  }),
  getComplete: createSelector(stateSelector, (state) => {
    return state.onComplete;
  }),
};

export const { actions: uploadActions, reducer: uploadReducer } =
  uploadSlice;
