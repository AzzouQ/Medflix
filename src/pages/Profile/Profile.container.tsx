import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import firebase, { auth, database } from 'service/firebase';
import { userActions, userSelectors, UserState } from 'slices/user.slice';
import type { VideoType } from 'types';
import Profile from './Profile';

export declare namespace ProfileType {
  type Props = {
    user: UserState | undefined;
    videos: VideoType[] | undefined;
    goToEditProfile: () => void;
  };
}

const ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const [videos, setVideos] = useState<VideoType[]>();

  const { push } = useHistory();

  const goToEditProfile = () => {
    push('/editProfile');
  };

  useEffect(() => {
    const getMyVideos = async () => {
      const videosIDsSnap = await database
        .ref(`/users/${user?.uid}/videos`)
        .get();
      const videosIDs: string[] = Object.values(videosIDsSnap.val());
      const videosSnap = await database.ref(`/videos`).get();
      const videos: { [key: string]: VideoType } = videosSnap.val();
      const myVideos = videosIDs.map((id) => {
        return videos[id as string];
      });
      setVideos(myVideos);
    };
    if (user) {
      getMyVideos();
    }
  }, [user]);

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

  return <Profile {...{ user, videos, goToEditProfile }} />;
};

export default ProfileContainer;
