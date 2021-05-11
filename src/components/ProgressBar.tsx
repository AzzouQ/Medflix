import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { uploadActions, uploadSelectors } from '../redux';
import { IonFooter, IonToolbar } from '@ionic/react';
import firebase from 'firebase';

const ProgressBar: React.FC = () => {
  const uploadTask = useSelector(uploadSelectors.getUploadTask);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  let unsubscribe: any;

  const handlePlayPause = () => {
    if (isRunning) {
      uploadTask.pause();
      //   toast.show(t('toast.up.pause'));
    } else {
      uploadTask.resume();
      //   toast.show(t('toast.up.resume'));
    }
  };

  const handleCancel = async () => {
    try {
      if (!isRunning) await uploadTask.resume();
      await uploadTask.cancel();
    } catch (error) {
      console.log(error);
    } finally {
      if (unsubscribe) unsubscribe();

      //   toast.show(t('toast.up.cancel'));
    }
  };

  const handleSnapshot = (snapshot: any) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        setIsRunning(false);
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        setIsRunning(true);
        break;
      default:
        break;
    }
  };

  const handleError = () => {
    dispatch(uploadActions.finish());
    // Handle unsuccessful uploads
  };

  const handleFinally = () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref
      .getDownloadURL()
      .then(async (downloadURL: string) => {
        console.log(downloadURL);
      })
      .catch((err: any) => console.log(err))
      .finally(() => {
        dispatch(uploadActions.finish());
        if (unsubscribe) unsubscribe();
      });
  };

  useEffect(() => {
    if (!uploadTask) return;
    unsubscribe = uploadTask.on(
      'state_changed',
      handleSnapshot,
      handleError,
      handleFinally
    );
  }, [uploadTask]);

  if (!uploadTask) return null;

  return (
    <Progress
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={progress}
    />
  );
};

export default ProgressBar;
