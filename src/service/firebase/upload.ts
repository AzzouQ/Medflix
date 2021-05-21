import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIonModal } from '@ionic/react';
import { RcFile } from 'antd';

import firebase, { auth, storage } from './firebase';
import { uploadActions } from 'slices';
import VideoForm from 'components/VideoForm';

type OnNext = (snapshot: firebase.storage.UploadTaskSnapshot) => void;
type OnError = (error: firebase.storage.FirebaseStorageError) => void;

export const useFirebaseUpload = () => {
  const dispatch = useDispatch();
  const uploadTask = useRef<firebase.storage.UploadTask>();
  const unsubscribe = useRef<Function>();
  const [file, setFile] = useState<RcFile>();

  const onReset = useCallback(() => {
    unsubscribe.current!();
    dispatch(uploadActions.resetUploadTask());
    setFile(undefined);
  }, [dispatch]);

  const [present, dismiss] = useIonModal(VideoForm, {
    onReset,
    onDismiss: () => {
      dismiss();
    },
  });

  const onPlay = useCallback(() => {
    if (
      uploadTask.current!.snapshot.state === firebase.storage.TaskState.RUNNING
    ) {
      uploadTask.current!.pause();
    } else {
      uploadTask.current!.resume();
    }
  }, []);

  const onCancel = useCallback(() => {
    uploadTask.current!.resume();
    uploadTask.current!.cancel();
    onReset();
  }, [onReset]);

  const onNext = useCallback<OnNext>(
    (snapshot) => {
      dispatch(
        uploadActions.setNext({
          uploadNext: {
            progress: Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ),
            isRunning: snapshot.state === firebase.storage.TaskState.RUNNING,
          },
        })
      );
    },
    [dispatch]
  );

  const onError = useCallback<OnError>(
    (error) => {
      dispatch(uploadActions.setError({ error }));
      onReset();
    },
    [dispatch, onReset]
  );

  const onComplete = useCallback(async () => {
    try {
      const downloadUrl =
        await uploadTask.current!.snapshot.ref.getDownloadURL();
      dispatch(
        uploadActions.setComplete({
          uploadComplete: {
            metaData: uploadTask.current!.snapshot.metadata,
            downloadUrl: downloadUrl,
          },
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      present();
    }
  }, [dispatch, present]);

  useEffect(() => {
    if (file && !unsubscribe.current) {
      uploadTask.current = storage
        .ref(`/video/${auth.currentUser!.uid}/${file.uid}`)
        .put(file);
      dispatch(uploadActions.setUploadTask({ uploadTask: uploadTask.current }));
      dispatch(uploadActions.setPlay({ onPlay }));
      dispatch(uploadActions.setCancel({ onCancel }));
      unsubscribe.current = uploadTask.current!.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        onNext,
        onError,
        onComplete
      );
    }
  }, [
    dispatch,
    file,
    uploadTask,
    onPlay,
    onCancel,
    onNext,
    onError,
    onComplete,
  ]);

  return { setFile };
};
