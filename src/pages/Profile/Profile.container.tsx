import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { videos, VideosType } from 'service/fakeData';
import { auth, database } from 'service/firebase';
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
  const currentUser = auth.currentUser;
  const user = useSelector(userSelectors.getUser);
  console.log('User: ', user);
  const { push } = useHistory();

  const goToEditProfile = () => {
    push('/editProfile');
  };

  useEffect(() => {
    async function getUser() {
      const user = await database.ref(`/user/${currentUser?.uid}`).get();
      dispatch(userActions.setUser({ user: user.val() }));
    }
    getUser();
  }, [dispatch, currentUser]);

  return <Profile {...{ user, videos, goToEditProfile }} />;
};

export default ProfileContainer;
