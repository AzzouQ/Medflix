import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useHistory, useLocation, useParams } from 'react-router';
import firebase, { auth, database } from 'service/firebase';
import { userActions, userSelectors, UserState } from 'slices/user.slice';
import type { UserType, VideoType } from 'types';
import Profile from './Profile';

export declare namespace ProfileType {
  type Props = {
    user: UserState | undefined;
    videos: VideoType[] | undefined;
    userData: UserType | undefined;
  };
}

const ProfileContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [userData, setUserData] = useState(undefined);
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const [videos, setVideos] = useState<VideoType[]>();
  const { pathname } = useLocation();
  const isFocus = pathname.startsWith('/profile/');

  const { push, replace } = useHistory();

  const goToEditProfile = () => {
    push('/editProfile');
  };

  useEffect(() => {
    const getVideos = async (id: string | undefined) => {
      if (id) {
        const videosIDsSnap = await database.ref(`/users/${id}/videos`).get();
        if (videosIDsSnap.val()) {
          const videosIDs: string[] = Object.values(videosIDsSnap.val());
          const videosSnap = await database.ref(`/videos`).get();
          const videos: { [key: string]: VideoType } = videosSnap.val();
          const myVideos = videosIDs.map((id) => {
            return videos[id as string];
          });
          setVideos(myVideos);
        }
      }
    };
    if (isFocus && id) {
      // Get someone else video
      getVideos(id);
    }
  }, [user, isFocus, id]);
  useEffect(() => {
    const getUserData = async (urlId: string) => {
      try {
        const user = await database.ref(`/users/${urlId}`).get();
        if (!user.val()) {
          setUserData(undefined);
        } else {
          setUserData({ ...user.val(), uid: user.key });
        }
      } catch (err) {
        setUserData(undefined);
        console.log(err);
        //TODO Handle invalid urlId
      }
    };

    if (isFocus && id) {
      getUserData(id);
    }
  }, [isFocus, id]);

  useEffect(() => {
    const initUser = async (currentUser: firebase.User) => {
      const user = await database.ref(`/users/${currentUser!.uid}`).get();
      dispatch(
        userActions.initUser({ user: { ...user.val(), uid: currentUser!.uid } })
      );
      if (id === 'undefined') {
        replace({
          pathname: generatePath('/profile/:id', { id: currentUser!.uid }),
        });
      }
    };

    !user &&
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          initUser(currentUser);
        }
      });
  }, [dispatch, user, id, replace]);

  return <Profile {...{ user, videos, goToEditProfile, userData }} />;
};

export default ProfileContainer;
