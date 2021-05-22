import { createSlice, createSelector } from '@reduxjs/toolkit';
import firebase from 'service/firebase';

import type { TaskManager } from 'service/firebase';

export type UploadState = {
  progress: number;
  state: firebase.storage.TaskState | undefined;
  downloadURL: string | undefined;
  metadata: firebase.storage.FullMetadata | undefined;
  taskManager: TaskManager | undefined;
};

const initialState: UploadState = {
  progress: 0,
  state: undefined,
  downloadURL: undefined,
  metadata: undefined,
  taskManager: undefined,
};

const uploadSlice = createSlice({
  name: 'Upload',
  initialState,
  reducers: {
    initUpload: (_state, action) => action.payload.upload,
    setTaskManager: (state, action) => {
      state.taskManager = action.payload.taskManager;
    },
    setNext: (state, action) => {
      state.progress = action.payload.progress;
      state.state = action.payload.state;
    },
    setComplete: (state, action) => {
      state.downloadURL = action.payload.downloadURL;
      state.metadata = action.payload.metadata;
      state.state = action.payload.state;
    },
    resetUpload: () => initialState,
  },
});

const stateSelector = createSelector(
  ({ upload }: { upload: UploadState }) => upload,
  (state) => state
);

export const uploadSelectors = {
  isRunning: createSelector(stateSelector, (state) => {
    return (
      state.state === firebase.storage.TaskState.RUNNING ||
      state.state === firebase.storage.TaskState.PAUSED
    );
  }),
  isPaused: createSelector(stateSelector, (state) => {
    return state.state === firebase.storage.TaskState.PAUSED;
  }),
  getProgress: createSelector(stateSelector, (state) => {
    return state.progress;
  }),
  getComplete: createSelector(stateSelector, (state) => {
    return { downloadURL: state.downloadURL, metadata: state.metadata };
  }),
  getProgressBar: createSelector(stateSelector, (state) => {
    return {
      isPaused: state.state === firebase.storage.TaskState.PAUSED,
      progress: state.progress,
      taskManager: state.taskManager,
    };
  }),
};

export const { actions: uploadActions, reducer: uploadReducer } = uploadSlice;
