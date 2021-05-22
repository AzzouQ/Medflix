import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { message, RcFile } from 'antd';
import { t } from 'i18n';

import firebase, { auth, storage } from './firebase';
import { uploadActions } from 'slices';

export type TaskManager = {
  onPause: () => boolean;
  onResume: () => boolean;
  onCancel: () => boolean;
};

export const useFirebaseUpload = () => {
  const dispatch = useDispatch();
  const unsubscribe = useRef<Function>();
  const [file, setFile] = useState<RcFile>();

  useEffect(() => {
    if (file) {
      const uploadTask = storage
        .ref(`/video/${auth.currentUser!.uid}/${file.uid}`)
        .put(file);
      dispatch(
        uploadActions.setTaskManager({
          taskManager: {
            onPause: uploadTask.pause,
            onResume: uploadTask.resume,
            onCancel: uploadTask.cancel,
          },
        })
      );
      unsubscribe.current = uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // onNext
        (snapshot) => {
          dispatch(
            uploadActions.setNext({
              progress: Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              ),
              state: snapshot.state,
            })
          );
        },
        // onError
        (_error) => {
          message.error(t`-Une erreur s'est produite.`);
          
        },
        // onComplete
        async () => {
          try {
            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
            dispatch(
              uploadActions.setComplete({
                downloadUrl: downloadUrl,
                metaData: uploadTask.snapshot.metadata,
                state: firebase.storage.TaskState.SUCCESS
              })
            );
          } catch (error) {
            console.log(error);
          } finally {
            // TODO
            console.log('Done.');
          }
        }
      );
    }
  }, [dispatch, file]);

  return { setFile };
};
