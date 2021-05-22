import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebase, { auth, database } from 'service/firebase';
import { videos, VideosType } from 'service/fakeData';

import { userActions, userSelectors } from 'slices';

import Home from './Home';

export declare namespace HomeType {
  type Props = {
    videos: VideosType;
  };
}

const HomeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  useEffect(() => {
    const getAllVideos = async () => {
      const videos = await database.ref(`/videos`).get();
      console.log('Les videos: ', videos.val());
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
