import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, RcFile } from 'antd';
import { t } from 'i18n';

import firebase, { auth, database, storage } from './firebase';
import { uploadActions, userSelectors } from 'slices';

export type TaskManager = {
  onPause: () => boolean;
  onResume: () => boolean;
  onCancel: () => boolean;
};

type VideoType = {
  title: string;
  description: string;
};

export type UploadType =
  | {
      type: VideoType;
      file: RcFile;
    }
  | undefined;

export const useFirebaseUpload = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const unsubscribe = useRef<Function>();
  const [uploadData, startUpload] = useState<UploadType>(undefined);

  useEffect(() => {
    if (uploadData?.file && uploadData?.type) {
      console.log('Data: ', uploadData);
      const uploadTask = storage
        .ref(`/videos/${auth.currentUser!.uid}/${uploadData.file.uid}`)
        .put(uploadData.file);
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
            const videoID = await database.ref(`/videos/`).push({
              owner: user!.uid,
              title: uploadData.type.title,
              description: uploadData.type.description,
              url: downloadUrl,
              createDate: +new Date(),
            });
            const videosSnap = await database
              .ref(`/users/${user!.uid}/videos`)
              .get();
            const videos = videosSnap.val();
            await database.ref(`/users/${user!.uid}`).update({
              videos: videos
                ? [...Object.values(videos), videoID.key]
                : [videoID.key],
            });
            message.success(t`-Votre video a été publier.`);
          } catch (error) {
            console.log(error);
          } finally {
            unsubscribe.current!();
            dispatch(uploadActions.resetUpload());
          }
        }
      );
    }
  }, [dispatch, uploadData, user]);

  return { startUpload };
};
