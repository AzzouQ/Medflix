import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebase, { auth, database } from 'service/firebase';

import { userActions, userSelectors } from 'slices';

import Home from './Home';

import type { VideoType } from 'types';

export declare namespace HomeType {
  type Props = {
    videos: VideoType[] | undefined;
  };
}

const HomeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const [videos, setVideos] = useState<VideoType[]>();

  useEffect(() => {
    const getAllVideos = async () => {
      const videosSnap = await database.ref(`/videos`).get();
      setVideos(Object.values(videosSnap.val()));
    };
    getAllVideos();
  }, []);

  useEffect(() => {
    const initUser = async (currentUser: firebase.User) => {
      const user = await database.ref(`/users/${currentUser!.uid}`).get();
      dispatch(
        userActions.initUser({ user: { ...user.val(), uid: currentUser!.uid } })
      );
    };
    !user &&
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          initUser(currentUser);
        }
      });
  }, [dispatch, user]);

  return <Home {...{ videos }} />;
};

export default HomeContainer;
