import firebase, { auth, storage } from './index';
import { UploadRequestOption } from 'rc-upload/es/interface';
import { Dispatch } from 'react';
import { uploadActions } from '../../redux';
import getBlob from '../getBlob';

export const videoUpload = async (
  { filename, file, onSuccess, onError, onProgress }: UploadRequestOption<any>,
  dispatch: Dispatch<any>
) => {
  const { currentUser } = auth;
  const uid = currentUser?.uid;
  const name = filename ?? `${new Date().getTime()}-medflix`;

  if (file) console.log();

  try {
    const blob: any = await getBlob(file);

    const storageRef = storage.ref(`/video/${uid}/todofixit`);

    const uploadTask = storageRef.put(file as Blob);

    // dispatch
    dispatch(uploadActions.setUpload({ blob: blob, uploadTask }));

    uploadTask.on(
      'state_changed',
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress: any =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        if (onProgress)
          // CONNECT ON PROGRESS
          onProgress(progress);

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads

        // CONNECT ON ERROR
        if (onError) onError(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL: any) {
            console.log('File available at', downloadURL);

            // CONNECT ON SUCCESS
            if (onSuccess) onSuccess(downloadURL, blob);
            // Pass any parameter you would like
          });
      }
    );
  } catch (e) {
    console.log(e);
  }
};
