import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { videos, VideosType } from 'service/fakeData';
import firebase, { auth, database } from 'service/firebase';
import { userActions, userSelectors, UserState } from 'slices/user.slice';

import Profile from './Profile';

export declare namespace ProfileType {
  type Props = {
    user: UserState | undefined;
    videos: VideosType;
    goToEditProfile: () => void;
  };
}

const ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const { push } = useHistory();

  const goToEditProfile = () => {
    push('/editProfile');
  };

  useEffect(() => {
    const initUser = async (currentUser: firebase.User) => {
      const user = await database.ref(`/user/${currentUser!.uid}`).get();
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

  return <Profile {...{ user, videos, goToEditProfile }} />;
};

export default ProfileContainer;
