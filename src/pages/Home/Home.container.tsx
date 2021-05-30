import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import firebase, { auth, database } from 'service/firebase';
import { userActions, userSelectors } from 'slices';
import type { VideoType } from 'types';
import Home from './Home';

export declare namespace HomeType {
  type Props = {
    videos: VideoType[] | undefined;
  };
}

const HomeContainer: React.FC = () => {
  const { pathname } = useLocation();
  const isFocus = pathname === '/home';
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const [videos, setVideos] = useState<VideoType[]>();

  useEffect(() => {
    const getAllVideos = async () => {
      const videosSnap = await database.ref(`/videos`).get();
      if (videosSnap.val()) {
        setVideos(Object.values(videosSnap.val()));
      }
    };
    if (isFocus) {
      getAllVideos();
    }
  }, [isFocus]);

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
