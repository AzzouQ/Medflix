import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { IonButtons, IonToolbar, IonIcon } from '@ionic/react';
import {
  closeCircleOutline,
  playCircleOutline,
  pauseCircleOutline,
} from 'ionicons/icons';
import { Progress } from 'antd';

import { uploadActions, uploadSelectors } from '../redux';

const ProgressBar: React.FC = () => {
  const dispatch = useDispatch();
  const uploadTask = useSelector(uploadSelectors.getUploadTask)!;
  const unsubscribe = useRef<Function>();
  const [progress, setProgress] = useState(0);
  const [isUploadRunning, setUploadRunning] = useState(false);

  const uploadPauseResume = useCallback(() => {
    if (isUploadRunning) uploadTask.pause();
    else uploadTask.resume();
  }, [isUploadRunning, uploadTask]);

  const uploadCancel = useCallback(() => {
    uploadTask.resume();
    uploadTask.cancel();
    unsubscribe.current!();
    dispatch(uploadActions.finish());
  }, [dispatch, uploadTask]);

  const uploadNext = useCallback(
    (snapshot: firebase.storage.UploadTaskSnapshot) => {
      setProgress(
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      );
      setUploadRunning(snapshot.state === firebase.storage.TaskState.RUNNING);
    },
    []
  );

  const uploadError = useCallback(
    (error: firebase.storage.FirebaseStorageError) => {
      console.log(error);
      unsubscribe.current!();
      dispatch(uploadActions.finish());
    },
    [dispatch]
  );

  const uploadComplete = useCallback(() => {
    uploadTask.snapshot.ref
      .getDownloadURL()
      .then(async (downloadURL) => {
        console.log(downloadURL);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        unsubscribe.current!();
        dispatch(uploadActions.finish());
      });
  }, [dispatch, uploadTask]);

  useEffect(() => {
    unsubscribe.current = uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      uploadNext,
      uploadError,
      uploadComplete
    );
  }, [uploadTask, uploadNext, uploadError, uploadComplete]);

  return (
    <IonToolbar>
      <IonButtons slot={'start'} style={{ marginLeft: 15, marginRight: 15 }}>
        <IonIcon
          icon={isUploadRunning ? pauseCircleOutline : playCircleOutline}
          size={'large'}
          color={'primary'}
          onClick={uploadPauseResume}
        />
        <IonIcon
          icon={closeCircleOutline}
          size={'large'}
          color={'primary'}
          onClick={uploadCancel}
        />
      </IonButtons>
      <Progress
        strokeColor={{
          '0%': '#3880ff',
          '100%': '#3dc2ff',
        }}
        percent={progress}
        showInfo={false}
      />
      <IonButtons slot={'end'} style={{ marginRight: 25 }} />
    </IonToolbar>
  );
};

export default ProgressBar;
