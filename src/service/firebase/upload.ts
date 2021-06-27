import { message, RcFile } from 'antd';
import { t } from 'i18n';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadActions, userSelectors } from 'slices';
import firebase, { auth, database, storage } from './firebase';

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
      image: RcFile;
    }
  | undefined;

export const useFirebaseUpload = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const unsubscribe = useRef<Function>();
  const unsubscribeImage = useRef<Function>();
  const [uploadData, startUpload] = useState<UploadType>(undefined);
  useEffect(() => {
    let thumbnailDownloadUrl: string | undefined = undefined;
    if (uploadData?.file && uploadData?.type && uploadData.image) {
      const uploadTask = storage
        .ref(`/videos/${auth.currentUser!.uid}/${uploadData.file.uid}`)
        .put(uploadData.file);

      const thumbnailTask = storage
        .ref(`/videos/${auth.currentUser!.uid}/${uploadData.image.uid}`)
        .put(uploadData.image);

      dispatch(
        uploadActions.setTaskManager({
          taskManager: {
            onPause: uploadTask.pause,
            onResume: uploadTask.resume,
            onCancel: uploadTask.cancel,
          },
        })
      );

      unsubscribeImage.current = thumbnailTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        null,
        null,
        async () => {
          thumbnailDownloadUrl =
            await thumbnailTask.snapshot.ref.getDownloadURL();
        }
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
          message.error(t`message.uploadError`);
        },
        // onComplete
        async () => {
          try {
            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
            const videoID = await database.ref(`/videos/`).push({
              thumbnail: thumbnailDownloadUrl,
              flagged: false,
              owner: user!.uid,
              title: uploadData.type.title,
              description: uploadData.type.description,
              url: downloadUrl,
              createDate: +new Date(),
              like: 0,
              view: 0,
              report: 0,
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

            dispatch(uploadActions.setComplete({ downloadURL: downloadUrl }));

            message.success(t`message.upload`);
          } catch (error) {
            console.log(error);
          } finally {
            dispatch(uploadActions.resetUpload());

            unsubscribe.current!();
            unsubscribeImage.current!();
          }
        }
      );
    }
  }, [dispatch, uploadData, user]);

  return { startUpload };
};
