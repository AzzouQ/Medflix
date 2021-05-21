import React from 'react';
import { useHistory } from 'react-router';

import { user, UserType, videos, VideosType } from 'service/fakeData';

import Profile from './Profile';

export declare namespace ProfileType {
  type Props = {
    user: UserType;
    videos: VideosType;
    goToUpload: () => void;
    goToEditProfile: () => void;
  };
}

const ProfileContainer: React.FC = () => {
  const { push } = useHistory();

  const goToUpload = () => {
    push('/create');
  };

  const goToEditProfile = () => {
    push('/editProfile');
  };

  return <Profile {...{ user, videos, goToUpload, goToEditProfile }} />;
};

export default ProfileContainer;
